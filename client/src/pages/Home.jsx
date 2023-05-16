import React, { useEffect, useState, useContext } from "react";

// retrieve user with context
import { UserContext } from "../App";

// API CALLS
import { retrieveAllPosts } from "../utils/APICalls/HomeAPICalls";
import {
  likePost,
  unlikePost,
  commentOnPost,
} from "../utils/APICalls/HomeAPICalls";

function Post({ singlePost, postsData, setPostsData }) {
  // state variables
  const [likeCount, setLikeCount] = useState(singlePost.likes.length);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState(singlePost.comments);

  // retrieve 'logged-in user' data
  const { state, dispatch } = useContext(UserContext);

  const deletePost = (postId) => {
    console.log(postId);
    fetch(`/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = postsData.filter((item) => item._id !== result._id);
        setPostsData(newData);
      });
  };

  // set the post to 'liked' if user already liked the post
  useEffect(() => {
    // set user liked external function
    if (singlePost.likes.includes(state._id)) setUserLiked(true);
  }, []);

  // display 'singlePost' data with 'Post' component
  return (
    <div className="card home-card">
      <h5>
        {singlePost.postedBy.name}
        {singlePost.postedBy._id === state._id && (
          <i
            className="material-icons"
            style={{ float: "right" }}
            onClick={() => deletePost(singlePost._id)}
          >
            delete
          </i>
        )}
      </h5>
      <div className="card-image">
        {/* conditional if post is an image */}
        {singlePost.type === "Image" && (
          <img src={singlePost.asset} alt="background" />
        )}
        {/* conditional if post is a video */}
        {singlePost.type === "Video" && (
          <video width="500px" height="500px" controls="controls">
            {/* video */}
            <source src={singlePost.asset} type="video/mp4" />
          </video>
        )}
        <div className="card-content">
          {/* icon from materialize */}
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          {/* display different icons based on if user liked post */}
          {userLiked ? (
            <i
              className="material-icons unlike"
              onClick={() =>
                unlikePost(singlePost._id, setLikeCount, setUserLiked)
              }
            >
              thumb_down
            </i>
          ) : (
            <i
              className="material-icons like"
              onClick={() =>
                likePost(singlePost._id, setLikeCount, setUserLiked)
              }
            >
              thumb_up
            </i>
          )}
          <h6>{likeCount} likes</h6>
          <h6>{singlePost.title}</h6>
          <p>{singlePost.body}</p>

          {/* iterate through comments to display */}
          {comments.map((comment) => (
            <h6 key={comment._id}>
              <span style={{ fontWeight: "500" }}>{comment.postedBy.name}</span>{" "}
              {comment.text}
            </h6>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              commentOnPost(e.target[0].value, singlePost._id, setComments);
            }}
          >
            <input
              type="text"
              placeholder="add a comment"
              id={`${singlePost._id}-comment-box`}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // initialize 'posts data' variable
  const [postsData, setPostsData] = useState([]);

  // retrieve 'posts' data from DB
  useEffect(() => {
    // set 'postsdata' to all posts
    retrieveAllPosts(setPostsData);
  }, []);

  return (
    <React.Fragment>
      <div className="home">
        {/* iterate through posts data to display */}
        {postsData.map((singlePost) => (
          <div key={singlePost._id}>
            <Post
              singlePost={singlePost}
              postsData={postsData}
              setPostsData={setPostsData}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
