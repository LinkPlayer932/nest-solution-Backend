"use strict";
import mongoose from "mongoose";
import Article from "../models/articles.js";

// CREATE ARTICLE
export const createArticle = async (req, res) => {
  try {
    const data = req.body;

    // Cloudinary image URL (req.file.path)
    if (req.file) {
      data.image = req.file.path;
    }

    const article = await Article.create(data);

    return res.status(201).json(article);
  } catch (error) {
    console.error("Create Error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

// GET ALL
export const getArticles = async (req, res) => {
  try {
    const data = await Article.find();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET SINGLE
export const getArticle = async (req, res) => {
  try {
    const data = await Article.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateArticle = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.json(updated);
  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    return res.json({ message: "Article deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
