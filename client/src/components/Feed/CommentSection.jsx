import React, { useContext, useState } from "react";
import {
  commentOnPost,
  deleteComment,
} from "../../utils/APICalls/HomeAPICalls";
import { UserContext } from "../../App";

export default function CommentSection({ singlePost }) {
  const [comments, setComments] = useState(singlePost.comments);
  const { state } = useContext(UserContext);

  return (
    <>
      {/* iterate through comments to display */}
      {comments.map((comment) => (
        <h6 key={comment._id}>
          <span style={{ fontWeight: "500" }}>{comment.postedBy.name}</span>{" "}
          {comment.text}
          {comment.postedBy._id === state._id && (
            <p
              onClick={() =>
                deleteComment(singlePost._id, comment._id, setComments)
              }
            >
              DELETE
            </p>
          )}
        </h6>
      ))}
      {/* form to submit individual comment */}
      <form
        className="flex space-x-10"
        onSubmit={(e) => {
          e.preventDefault();
          // call function to submit comment
          commentOnPost(e.target[0].value, singlePost._id, setComments);
        }}
      >
        <input
          type="text"
          placeholder="add a comment"
          id={`${singlePost._id}-comment-box`}
        />
        <button className="p-2 bg-sky-300 rounded" type="submit">
          Comment
        </button>
      </form>
    </>
  );
}
