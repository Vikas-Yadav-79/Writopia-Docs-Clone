// documentController.js

import Document from "../model/DocumentModel.js";

export const getDocument = async (id) => {
    try {
        if (id === null) {
            return;
        }
        const doc = await Document.findById(id)
        if (doc) return doc;
        return await Document.create({ _id: id, data: "" })
    } catch (error) {
        console.log(error);
    }
}

export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id,{data});

}
