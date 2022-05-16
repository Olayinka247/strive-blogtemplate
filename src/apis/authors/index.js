import express from "express";
import uniqid from "uniqid";
import multer from "multer";
import createError from "http-errors";

import {
  getAuthors,
  writeAuthors,
  saveAuthorsAvatars,
} from "../../lib/fs-tools.js";

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = { ...req.body, id: uniqid(), createdAt: new Date() };
    const authors = await getAuthors();
    authors.push(newAuthor);
    await writeAuthors(authors);
    res.send(201).send({ id: newAuthor.id });
  } catch (error) {
    next("error");
  }
});

authorsRouter.get("/", async (req, res) => {
  try {
    const authors = await getAuthors();
    res.send(authors);
  } catch (error) {
    console.log("error");
  }
});

authorsRouter.get("/:authorId", async (req, res) => {
  try {
    const authors = await getAuthors();
    const foundAuthor = authors.find(
      (author) => author.id === req.params.authorId
    );
    if (foundAuthor) {
      res.send(foundAuthor);
    } else {
    }
  } catch (error) {
    console.log("error");
  }
});

authorsRouter.put("/:authorId", async (req, res) => {
  try {
    const authors = await getAuthors();
    const index = authors.findIndex(
      (author) => author.id === req.params.authorId
    );
    const oldAuthor = authors[index];
    const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };
    authors[index] = updatedAuthor;
    await writeAuthors(authors);
    res.send(updatedAuthor);
  } catch (error) {
    console.log("error");
  }
});

authorsRouter.delete("/:authorId", async (req, res) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter(
      (author) => author.id !== req.params.authorId
    );
    await writeAuthors(remainingAuthors);
    res.status(204).send();
  } catch (error) {
    console.log("error");
  }
});

//***********POST IMAGE AVATAR ************* */
authorsRouter.post(
  "/:authorId/avatar",
  multer({
    fileFilter: (req, file, multerNext) => {
      if (file.mimetype !== "image/jpeg") {
        multerNext(createError(400, "Only jpeg allowed!"));
      } else {
        multerNext(null, true);
      }
    },
  }).single("avatar"),
  async (req, res, next) => {
    try {
      const url = await saveAuthorsAvatars(
        req.file.originalname,
        req.file.buffer
      );
      const authors = await getAuthors();
      const authorIndex = authors.findIndex(
        (author) => author.id === req.params.authorId
      );
      if (authorIndex !== -1) {
        const oldAuthor = authors[authorIndex];
        const newAuthor = { ...oldAuthor, avatar: url, updatedAt: new Date() };
        authors[authorIndex] = newAuthor;
        await writeAuthors(authors);
        res.send(newAuthor);
      } else {
        next(createError(404, "No Author Found !"));
      }
    } catch (error) {
      next("error");
    }
  }
);

export default authorsRouter;
