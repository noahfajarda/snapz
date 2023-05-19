import React, { useContext, useState } from "react";
import {
  commentOnPost,
  deleteComment,
} from "../../utils/APICalls/HomeAPICalls";
import { UserContext } from "../../App";
import "./CommentSection.css";

export default function CommentSection({ singlePost }) {
  const [comments, setComments] = useState(singlePost.comments);
  const { state } = useContext(UserContext);

  return (
    <>
      <div className="comments">
        {/* iterate through comments to display */}
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div>
              <strong className="commented-by">{comment.postedBy.name}</strong>{" "}
              {comment.text}
            </div>
            {comment.postedBy._id === state._id && (
              <div>
                <button
                  className="delete-comment p-1 bg-sky-200 rounded"
                  onClick={() =>
                    deleteComment(singlePost._id, comment._id, setComments)
                  }
                >
                  DELETE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
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
