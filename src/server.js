import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./apis/authors/index.js";
import { join } from "path";
import blogPostsRouter from "./apis/blogPosts/index.js";
import cors from "cors";
import {
  genericHandleError,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./handleErrors.js";

const server = express();

const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter);

// *****************Error Handlers*****************
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericHandleError);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`server is listening on port ${port} !`);
});

server.on("error", (error) => {
  console.log("ERror", error);
});
