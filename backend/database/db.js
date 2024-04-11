import mongoose from 'mongoose';

export const Connection = async () => {
    const mongoUri = "mongodb+srv://VikasYadav:WritopiaGoogleDocsClone@docsclonecluster.3hujt2h.mongodb.net/WRITOPIA-GOOGLE-DOCS-CLONE?retryWrites=true&w=majority&appName=DocsCloneCluster";

    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Error while connecting to the database:", error);
    }
};
