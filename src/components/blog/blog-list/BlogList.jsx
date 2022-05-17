import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useState, useEffect } from "react";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    let response = await fetch("http://localhost:3001/blogPosts");
    if (response.ok) {
      let data = response.json();
      console.log(data);
      setBlogPosts(data);
    }
  };

  return (
    <>
      <Row>
        {blogPosts.map((blogPost) => (
          <Col
            md={4}
            style={{
              marginBottom: 50,
            }}
            key={blogPost.id}
          >
            <BlogItem blogPosts={blogPost} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BlogList;
