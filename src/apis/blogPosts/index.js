import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { checkblogPostsSchema, checkValidationResult } from "./validation.js";
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools.js";

const blogPostsRouter = express.Router();

//********* POST BLOG POST */
blogPostsRouter.post(
  "/",
  checkblogPostsSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const newBlogPost = { ...req.body, id: uniqid(), createdAt: new Date() };
      const blogPosts = await getBlogPosts();
      blogPosts.push(newBlogPost);
      await writeBlogPosts(blogPosts);
      res.status(201).send({ id: newBlogPost.id });
    } catch (error) {
      next(error);
    }
  }
);

//********* GET WITH SEARCH QUERY BY TITLE BLOG POST */
blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    if (req.query && req.query.title) {
      const filteredBlogPosts = blogPosts.filter((blogPost) =>
        blogPost.title.toLowerCase().includes(req.query.title.toLowerCase())
      );
      res.send(filteredBlogPosts);
    } else {
      res.send(blogPosts);
    }
  } catch (error) {
    next(error);
  }
});

//********* GET BLOG POST BY ID */
blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    const foundBlogPost = blogPosts.find(
      (blogPost) => blogPost.id === req.params.blogPostId
    );
    if (foundBlogPost) {
      res.send(foundBlogPost);
    } else {
      next(createError(404, `Post with id ${req.params.blogPostId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

//********* MODIFY BLOG POST  BY ID */

blogPostsRouter.put("/:blogPostId", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();

    const indexPost = blogPosts.findIndex(
      (blogPost) => blogPost.id === req.params.blogPostId
    );
    if (indexPost !== -1) {
      const oldBlogPost = blogPosts[indexPost];
      const updatedBlogPost = {
        ...oldBlogPost,
        ...req.body,
        updatedAt: new Date(),
      };
      blogPosts[indexPost] = updatedBlogPost;
      await writeBlogPosts(blogPosts);
    } else {
      next(createError(404, `Post with id ${req.params.blogPostId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

//********* DELETE BLOG POST BY ID */
blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    const remainingBlogPosts = blogPosts.filter(
      (blogPost) => blogPost.id !== req.params.blogPostId
    );
    await writeBlogPosts(remainingBlogPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
