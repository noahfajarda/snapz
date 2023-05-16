import React, { useState, useEffect } from "react";
import { likePost, unlikePost } from "../utils/APICalls/HomeAPICalls";

export default function LikesSection({ singlePost, state }) {
  const [likeCount, setLikeCount] = useState(singlePost.likes.length);
  const [userLiked, setUserLiked] = useState(false);

  // set the post to 'liked' if user already liked the post
  useEffect(() => {
    // set user liked external function
    if (singlePost.likes.includes(state._id)) setUserLiked(true);
  }, []);

  return (
    <>
      {/* display different icons based on if user liked post */}
      {userLiked ? (
        <i
          className="material-icons unlike"
          onClick={() => unlikePost(singlePost._id, setLikeCount, setUserLiked)}
        >
          thumb_down
        </i>
      ) : (
        <i
          className="material-icons like"
          onClick={() => likePost(singlePost._id, setLikeCount, setUserLiked)}
        >
          thumb_up
        </i>
      )}
      <h6>{likeCount} likes</h6>
    </>
  );
}
