import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import "./Card.css"; // Import the CSS file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <div className="grid-container">
        {currentPosts.map((post) => (
          <div className="grid-item" key={post.id}>
            <Card className="card">
              <CardActionArea
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  className="media"
                  image={post.thumbnailUrl}
                  title={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{ fontFamily: "Monospace" }}>
                      ID: {post.id}
                    </span>{" "}
                    - {post.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(posts.length / postsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="pagination"
      />
    </div>
  );
};

export default App;
