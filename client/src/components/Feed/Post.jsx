import React, { useContext } from "react";
// retrieve user with context
import { UserContext } from "../../App";
// API CALLS
import { deletePost } from "../../utils/APICalls/HomeAPICalls";
// COMPONENTS
import CommentSection from "./CommentSection";
import LikesSection from "./LikesSection/LikesSection";
// css
import "./Post.css";

import { Link } from "react-router-dom";

// display 'singlePost' data with 'Post' component
export default function Post({ singlePost, postsData, setPostsData }) {
  // retrieve 'logged-in user' data
  const { state } = useContext(UserContext);

  return (
    <div className="card home-card">
      <div class="card-header">
        <div>
          <Link
            to={
              singlePost.postedBy._id !== state._id
                ? `/profile/${singlePost.postedBy._id}`
                : `/profile`
            }
            class="flex"
          >
            <img
              class="profile-image"
              src={
                singlePost.postedBy.profilePicURL
                  ? singlePost.postedBy.profilePicURL
                  : "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
              }
              alt=""
            />
            <h1 class="profile-name">{singlePost.postedBy.name}</h1>
          </Link>
        </div>

        {singlePost.postedBy._id === state._id && (
          <i
            className="material-icons medium cursor-pointer"
            style={{ float: "right" }}
            onClick={() => deletePost(singlePost._id, postsData, setPostsData)}
          >
            delete
          </i>
        )}
      </div>
      <div className="card-image">
        {/* conditional if post is an image */}
        {singlePost.type === "Image" && (
          <img className="post-image" src={singlePost.asset} alt="background" />
        )}
        {/* conditional if post is a video */}
        {singlePost.type === "Video" && (
          <video
            className="post-image"
            width="500px"
            height="500px"
            controls="controls"
          >
            {/* video */}
            <source src={singlePost.asset} type="video/mp4" />
          </video>
        )}

        <span className="card-title">{singlePost.title}</span>
        {/* LIKE BUTTON */}
        {/* likes section */}
        <LikesSection singlePost={singlePost} state={state} />
      </div>

      {/* POSTED BY AND COMMENT SECTION */}
      <div className="card-content">
        <p className="posted-by-section">
          <strong className="posted-by">{singlePost.postedBy.name}</strong>{" "}
          {singlePost.body}
        </p>

        {/* comment section */}
        <CommentSection singlePost={singlePost} />
      </div>
    </div>
  );
}
