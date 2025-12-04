import Article from "../models/articles.js";

// CREATE
export const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ ALL
export const getArticles = async (req, res) => {
    try {
        const data = await Article.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ SINGLE
export const getArticle = async (req, res) => {
    try {
        const data = await Article.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
export const updateArticle = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            updateData.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        const data = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE
export const deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Article deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
