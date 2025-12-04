import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    author: { type: String },
    content: { type: String, required: true },
    image: { type: String },

    // SEO FIELDS
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Article", articleSchema);
