const getDocuments = async () => {
    const documents = localStorage.getItem("documents") ? JSON.parse(localStorage.getItem("documents")) : [];
    return documents;
}


const uploadDocument = async (document) => {
    const existingDocuments = localStorage.getItem("documents") ? JSON.parse(localStorage.getItem("documents")) : [];
    existingDocuments.push(document);
    localStorage.setItem("documents", JSON.stringify(existingDocuments));
    return existingDocuments;
}

const deleteDocument = async (documentId) => {
    const existingDocuments = localStorage.getItem("documents") ? JSON.parse(localStorage.getItem("documents")) : [];
    const updatedDocuments = existingDocuments.filter(doc => doc.id !== documentId);
    await localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    return updatedDocuments;
}

export { getDocuments, uploadDocument, deleteDocument };

