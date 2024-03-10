import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { getAuth } from "firebase-admin/auth";

import {
  randomizeContentStart,
  cropStrAtSpace,
  makeDocContent
} from "./utils.js";

const app = initializeApp();
const auth = getAuth(app);

const makeResonse = ({data, code, errorMessage}) => {
  const response = {};
  response.code = code ? code : 200;
  response.errorMessage = errorMessage ? errorMessage : undefined;
  response.isErrored = response.code >= 300 || !!errorMessage;
  response.data = data ? data : undefined;

  return response;
};

const options = {
  cors: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://cut-ups.web.app",
    "https://cutups.io/"
  ]
};

const getSourceContent = async source => {
  if (source.selectionType === "text" || !source.selectionType) {
    return [source.userText, true];
  }

  const docRef = getFirestore().collection("TEXT_TITLES").doc(source.id);
  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();
  const textSnapshot = await docData.textRef.get();
  const content = randomizeContentStart(textSnapshot.data().content);
  return [content, false];
}

const getDocRef = docId => getFirestore().collection("DOCUMENTS").doc(docId);

const getDocumentEntry = async docId => {
  const docRef = getDocRef(docId);
  const docSnapshot = await docRef.get();
  if (docSnapshot.empty) {
    return;
  }
  return docSnapshot.data();
}

const getDocumentEntries = async userId => {
  const results = [];
  const docRef = getFirestore().collection("DOCUMENTS").where("userId", '==', userId);
  const docSnapshot = await docRef.get();

  if (docSnapshot.empty) {
    return results;
  } 

  docSnapshot.forEach(doc => {
    const { dateCreated, dateUpdated, title, userId } = doc.data();
    results.push({docId: doc.id, dateCreated, dateUpdated, title, userId})
  });

  return results;
}

export const health = onRequest(options, (req, res) => {
  const response = makeResonse({
    data: { isAlive: true }
  });
  res.status(200).json(response);
});

export const sources = onRequest(options, async (req, res) => {
  try {
    const sourcesCollection = getFirestore().collection("TEXT_TITLES");
    const snapshot = await sourcesCollection.get();
    const sourcesFromDB = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const response = makeResonse({
      data: { sources: sourcesFromDB }
    });
    res.status(200).json(response);
  } catch (error) {
    logger.error("Error fetching sources:", error);

    const response = makeResonse({
      code: 500,
      errorMessage: "could not fetch sources",
      data: { sources: [] }
    });
    res.status(500).json(response);
  }
});

export const signUp = onRequest(options, async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const { email, password } = body;
    const user = await auth.createUser({email, password});

    const response = makeResonse({
      code: 201,
      data: { user }
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error("Error signing up user:", error);

    const response = makeResonse({
      code: 500,
      errorMessage: "could not sign up user",
      data: { user: {} }
    });
    res.status(500).json(response);
  }
});

export const doesUserExist = onRequest(options, async (req, res) => {

  try {
    const email = req.query.email;
    const userRecord = await auth.getUserByEmail(email);
    const isAvailable = !userRecord.uid;

    const response = makeResonse({
      data: { isAvailable }
    });
    res.status(200).json(response);
  } catch (error) {
    const response = makeResonse({
      data: { isAvailable: true }
    });
    res.status(200).json(response);
  }
});

export const makeDocument = onRequest(options, async (req, res) => {
  try {
    const body = JSON.parse(req.body);

    const { userId, title } = body;

    const now = FieldValue.serverTimestamp();

    let [ source1, isSource1UserInput ] = await getSourceContent(body.source1);
    let [ source2, isSource2UserInput ] = await getSourceContent(body.source2);
    const areBothNotUserInput = !isSource1UserInput && !isSource2UserInput;
    if (areBothNotUserInput) {
      const maxLength = 2000;
      source1 = cropStrAtSpace(source1, maxLength);
      source2 = cropStrAtSpace(source2, maxLength);
    }

    const content = makeDocContent(source1, source2);

    const docsCollRef = getFirestore().collection("DOCUMENTS");

    const docRef = await docsCollRef.add({
      title: !title.trim() ? "Untitled": title,
      userId,
      content,
      dateCreated: now,
      dateUpdated: now
    });

    const docId = docRef.id;

    if (!docId) {
      throw new Error("Server error creating new document")
    }

    const documents = await getDocumentEntries(userId);

    const response = makeResonse({
      code: 201,
      data: {
        docId,
        documents
      }
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error("Error creating document:", error, { userId });

    const response = makeResonse({
      code: 500,
      data: { docId: undefined },
      errorMessage: error.message
    });
    res.status(500).json(response);
  }
});

export const getDocument = onRequest(options, async (req, res) => {
  const errorContent = { title: undefined, content: undefined };

  try {
    const { userId, docId } = req.query;
    const docData = await getDocumentEntry(docId);

    if (!docData) {
      const response = makeResonse({
        code: 404,
        data: errorContent,
        errorMessage: "could get document"
      });
      res.status(404).json(response);
    }

    if (userId !== docData.userId) {
      logger.warn({
        userId,
        docId,
        message: "attempt to get a document by a user who doesn't own it"
      });

      const response = makeResonse({
        code: 403,
        data: errorContent,
        errorMessage: "access denied"
      });
      res.status(403).json(response);
    }

    const { title, content } = docData;
    const response = makeResonse({
      code: 201,
      data: { title, content }
    });
    res.status(200).json(response);
  } catch (error) {
    logger.error("Error getting document:", error);

    const response = makeResonse({
      code: 500,
      errorMessage: "could not get document",
      data: errorContent
    });
    res.status(500).json(response);
  }
});

export const getDocuments = onRequest(options, async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await getDocumentEntries(userId);

    const response = makeResonse({
      code: 200,
      data
    });
    res.status(200).json(response);
  } catch (error) {
    logger.error("Error getting documents:", error)

    const response = makeResonse({
      code: 500,
      errorMessage: "error getting documents",
      data: []
    });
    res.status(500).json(response);
  }
});

export const updateDocument = onRequest(options, async (req, res) => {
  let updates = {
    dateUpdated: FieldValue.serverTimestamp()
  };

  try {
    const body = JSON.parse(req.body);
    const { userId, docId, title, content } = body;
    const docData = await getDocumentEntry(docId);

    if (!docData) {
      logger.error("could not get document to update:", {userId, docId});

      const response = makeResonse({
        code: 404,
        errorMessage: "could not get document to update",
        data: { didUpdate: false }
      });
      res.status(404).json(response);
    }

    if (userId !== docData.userId) {
      logger.warn({
        userId,
        docId,
        message: "attempt made to update a document from someone who doesn't own it"
      });

      const response = makeResonse({
        code: 403,
        errorMessage: "denied permission to update document",
        data: { didUpdate: false }
      });
      res.status(403).json(response);
    }

    if (content !== undefined) {
      updates.content = content;
    }

    if (title !== undefined) {
      updates.title = title;
    }

    const docRef = getDocRef(docId);
    await docRef.update(updates);

    const response = makeResonse({
      code: 201,
      data: { didUpdate: true }
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error("Error updating document:", error);

    const response = makeResonse({
      code: 500,
      errorMessage: "could not update document",
      data: { didUpdate: false }
    });
    res.status(500).json(response);
  }
});

export const deleteDocuments = onRequest(options, async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const { userId, docIds, doesReturnDocs } = body;
    const docEntries = await Promise.all(docIds.map(docId => getDocumentEntry(docId)));
    const docIdsToDelete = docIds.filter((docId, index) => {
      const docEntry = docEntries[index];
      return docEntry.userId === userId;
    });

    if (!docIdsToDelete.length) {
      logger.warn({
        userId,
        docIds,
        message: "attempt made to delete documents from someone who doesn't own them"
      });

      const response = {
        errorMessage: "forbidden",
        code: 403,
        data: { didDelete: false }
      }
      res.status(403).json(response);
    }

    await Promise.all(docIdsToDelete.map(docId => getDocRef(docId).delete()));

    const response = {
      code: 201,
      data: { didDelete: true }
    }

    if (!doesReturnDocs) res.status(201).json(response);

    response.data.remainingDocuments = await getDocumentEntries(userId);

    res.status(201).json(response);
  } catch (error) {
    logger.error("Error deleting documents:", error);

    const response = {
      code: 500,
      errorMessage: "could not delete documents",
      data: { didDelete: false }
    }
    res.status(500).json(response);
  }
});