import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
console.log("FOLDER PATH", dataFolderPath);
const authorsJSONPath = join(dataFolderPath, "authors.json");
const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json");

const usersPublicFolderPath = join(process.cwd(), "./public/img/posts");
console.log("USERS Path :", usersPublicFolderPath);

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (authorsArray) =>
  writeJSON(authorsJSONPath, authorsArray);
export const getBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = (blogPostsArray) =>
  writeJSON(blogPostsJSONPath, blogPostsArray);

export const saveUsersAvatars = (fileName, contentAsBuffer) =>
  writeFile(join(usersPublicFolderPath, fileName), contentAsBuffer);
