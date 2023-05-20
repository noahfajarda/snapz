import React, { useEffect, useState } from "react";
// API CALLS
import { retrieveAllFollowedPosts } from "../utils/APICalls/FollowedUserPostAPICalls";
// COMPONENTS
import Post from "../components/Feed/Post/Post";

export default function Home() {
  // initialize 'posts data' variable
  const [postsData, setPostsData] = useState([]);

  // retrieve 'allFollowedPosts' data from DB & set 'postsData' variable
  useEffect(() => {
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
