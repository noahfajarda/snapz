import React, { useEffect, useState, useContext } from "react";
// retrieve user with context
import { UserContext } from "../App";
// API CALLS
import { retrieveAllFollowedPosts } from "../utils/APICalls/FollowedUserPostAPICalls";
import { deletePost } from "../utils/APICalls/HomeAPICalls";
// COMPONENTS
import CommentSection from "../components/CommentSection";
import LikesSection from "../components/LikesSection";

import { Link } from "react-router-dom";

function Post({ singlePost, postsData, setPostsData }) {
  // retrieve 'logged-in user' data
  const { state, dispatch } = useContext(UserContext);

  // display 'singlePost' data with 'Post' component
  return (
    <div className="card home-card">
      <h5>
        <Link
          to={
            singlePost.postedBy._id !== state._id
              ? `/profile/${singlePost.postedBy._id}`
              : `/profile`
          }
        >
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={
              singlePost.postedBy.profilePicURL
                ? singlePost.postedBy.profilePicURL
                : "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
            }
            alt=""
          />
          {singlePost.postedBy.name}
        </Link>
        {singlePost.postedBy._id === state._id && (
          <i
            className="material-icons delete"
            style={{ float: "right" }}
            onClick={() => deletePost(singlePost._id, postsData, setPostsData)}
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
          {/* likes section */}
          <LikesSection singlePost={singlePost} state={state} />
          <h6>{singlePost.title}</h6>
          <p>{singlePost.body}</p>
          {/* comment section */}
          <CommentSection singlePost={singlePost} />
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
    retrieveAllFollowedPosts(setPostsData);
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
