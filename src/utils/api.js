const urlBase = "https://cut-ups.firebaseapp.com/api";

export const makeNewDoc = async({userId, title, source1, source2}) => {
  const url = `${urlBase}/make-document`;
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
  let response = await fetch(`${urlBase}/does-user-exist?email=${email}`);
  response = await response.json();
  return response;
}

export const getSources = async () => {
  let response = await fetch(`${urlBase}/sources`);
  response = await response.json();
  return response;
}

export const getDocument = async (docId, userId) => {
  let response = await fetch(`${urlBase}/get-document?docId=${docId}&userId=${userId}`);
  response = await response.json();
  return response;
}

export const getDocuments = async userId => {
  let response = await fetch(`${urlBase}/get-documents?userId=${userId}`);
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

  const url = `${urlBase}/update-document`;
  let response = await fetch(url, options);
  response = await response.json();
  return response;
}

export const deleteDocuments = async ({userId, docIds, doesReturnDocs}) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ userId, docIds, doesReturnDocs }),
  }

  const url = `${urlBase}/delete-documents`;
  let response = await fetch(url, options);
  response = await response.json();
  return response;
}

export const deleteDocument = async (docId, userId) => {
  const response = await deleteDocuments({userId, docIds: [docId], doesReturnDocs: true});
  return response;
}