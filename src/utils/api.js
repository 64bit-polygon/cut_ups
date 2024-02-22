export const makeNewDoc = async({userId, title, source1, source2}) => {
  const url = "https://cut-ups.firebaseapp.com/api/make-document";
  const options = {
    method: "POST",
    body: JSON.stringify({
      userId,
      title,
      source1,
      source2
    })
  }
  let response = await fetch(url, options);
  response = await response.json();
  return response;
}

export const getIsEmailAvailable = async email => {
  let response = await fetch(`https://cut-ups.firebaseapp.com/api/does-user-exist?email=${email}`);
  response = await response.json();
  return response;
}

export const getSources = async () => {
  let response = await fetch("https://cut-ups.firebaseapp.com/api/sources");
  response = await response.json();
  return response;
}

export const getDocument = async (docId, userId) => {
  let response = await fetch(`https://cut-ups.firebaseapp.com/api/get-document?docId=${docId}&userId=${userId}`);
  response = await response.json();
  return response;
}

export const getDocuments = async userId => {
  let response = await fetch(`https://cut-ups.firebaseapp.com/api/get-documents?userId=${userId}`);
  response = await response.json();
  return response;
}

export const updateDocument = async ({userId, docId, title, content}) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      userId,
      docId,
      title,
      content
    })
  }

  const url = "https://cut-ups.firebaseapp.com/api/update-document";
  let response = await fetch(url, options);
  response = await response.json();
  return response;
}

export const deleteDocuments = async ({userId, docIds, doesReturnDocs}) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ userId, docIds, doesReturnDocs }),

  }

  const url = "https://cut-ups.firebaseapp.com/api/delete-documents";
  let response = await fetch(url, options);
  response = await response.json();
  return response;
}

export const deleteDocument = async ({userId, docId}) => {
  const response = await deleteDocuments({userId, docIds: [docId], doesReturnDocs: true});
  return response;
}