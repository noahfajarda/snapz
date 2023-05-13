import React, { useEffect, useState } from "react";

function Post({ singlePost }) {
  // display 'singlePost' data with 'Post' component
  console.log(singlePost);
  return (
    <div className="card home-card">
      <h5>{singlePost.postedBy.name}</h5>
      <div className="card-image">
        <img src={singlePost.photo} alt="background" />
        {/* video */}
        <video width="500px" height="500px" controls="controls">
          <source src={singlePost.photo} type="video/mp4" />
        </video>
        <div className="card-content">
          {/* icon from materialize */}
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>{singlePost.title}</h6>
          <p>{singlePost.body}</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // initialize 'posts data' variable
  const [postsdata, setPostsData] = useState([]);

  // retrieve 'posts' data from DB
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // check if user data is valid
        if (!("error" in result) && result.length !== 0) {
          // latest go on top
          result.posts.reverse();
        }
        setPostsData(result.posts);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="home">
        {/* iterate through posts data to display */}
        {postsdata.map((singlePost) => (
          <div key={singlePost._id}>
            <Post singlePost={singlePost} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
