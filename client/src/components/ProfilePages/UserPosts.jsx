import React from "react";

export default function UserPosts({ posts }) {
  return (
    <div className="gallery">
      {/* iterate through posts data */}
      {posts.map((item, idx) => {
        if (item.type === "Video") {
          return (
            <img
              key={idx}
              className="video-item"
              alt="might be a video"
              src="https://cdn-icons-png.flaticon.com/512/4503/4503915.png"
            />
          );
        }
        return (
          <img
            key={idx}
            className="photo-item"
            alt="might be a video"
            src={item.asset}
          />
        );
      })}
    </div>
  );
}
