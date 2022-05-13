import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsJSONPath = join(dataFolderPath, "authors.json");
const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json");

const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors");

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (authorsArray) =>
  writeJSON(authorsJSONPath, authorsArray);
export const getBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = (blogPostsArray) =>
  writeJSON(blogPostsJSONPath, blogPostsArray);

export const saveAuthorsAvatars = (fileName, contentAsBuffer) => {
  const filePath = join(authorsPublicFolderPath, fileName);
  const savingPath = `/img/authors/${fileName}`;
  console.log("Saving Path :", savingPath);
  writeFile(filePath, contentAsBuffer);
  const url = `http://localhost:3001${savingPath}`;
  return url;
};
