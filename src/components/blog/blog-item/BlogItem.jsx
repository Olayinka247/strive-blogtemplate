import React from "react";
import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, cover, author } = props;
  return (
    <Card className="blog-card">
      <Card.Img variant="top" src={cover} className="blog-cover" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer>${author}</Card.Footer>
    </Card>
  );
};

export default BlogItem;
