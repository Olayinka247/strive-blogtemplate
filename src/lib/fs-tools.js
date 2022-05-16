import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

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

// export const saveAuthorsAvatars = (fileName, contentAsBuffer) => {
//   const filePath = join(authorsPublicFolderPath, fileName);
//   const savedPath = `/img/authors/${fileName}`;
//   console.log(savedPath);
//   writeFile(filePath, contentAsBuffer);
//   const url = `http://localhost:3000${savedPath}`;
//   return url;
// };

export const saveAuthorsAvatars = (fileName, contentAsBuffer) => {
  // const savedPath = `/img/authors/${fileName}`;
  writeFile(join(authorsPublicFolderPath, fileName), contentAsBuffer);
  // const url = `http://localhost:3001${savedPath}`;
  // return url;
};
