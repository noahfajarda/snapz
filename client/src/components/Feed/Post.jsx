import React, { useContext } from "react";
// retrieve user with context
import { UserContext } from "../../App";
// API CALLS
import { deletePost } from "../../utils/APICalls/HomeAPICalls";
// COMPONENTS
import CommentSection from "./CommentSection";
import LikesSection from "./LikesSection";

import { Link } from "react-router-dom";

// display 'singlePost' data with 'Post' component
export default function Post({ singlePost, postsData, setPostsData }) {
  // retrieve 'logged-in user' data
  const { state } = useContext(UserContext);

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
            className="material-icons cursor-pointer"
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
