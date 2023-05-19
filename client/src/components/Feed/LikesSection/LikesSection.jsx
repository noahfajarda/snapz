import React, { useState, useEffect } from "react";
import { likePost, unlikePost } from "../../../utils/APICalls/HomeAPICalls";
import "./LikesSection.css";

export default function LikesSection({ singlePost, state }) {
  const [likeCount, setLikeCount] = useState(singlePost.likes.length);
  const [userLiked, setUserLiked] = useState(false);

  // set the post to 'liked' if user already liked the post
  useEffect(() => {
    // set user liked external function
    if (singlePost.likes.includes(state._id)) setUserLiked(true);
  }, [singlePost.likes, state._id]);

  return (
    <>
      {/* display different icons based on if user liked post */}
      {userLiked ? (
        <div
          className="btn-floating halfway-fab waves-effect waves-light red"
          onClick={() => unlikePost(singlePost._id, setLikeCount, setUserLiked)}
        >
          <i className="material-icons" id="like">
            favorite
          </i>
          <div className="like-count text-black">{likeCount}</div>
        </div>
      ) : (
        <div
          className="btn-floating halfway-fab waves-effect waves-light white"
          onClick={() => likePost(singlePost._id, setLikeCount, setUserLiked)}
        >
          <i className="material-icons red-text text-darken-4" id="like">
            favorite
          </i>
          <div className="like-count text-white">{likeCount}</div>
        </div>
      )}
    </>
  );
}
