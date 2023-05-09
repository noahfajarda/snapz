import React from "react";

function HomeCard() {
  return (
    <div className="card home-card">
      <h5>Noah</h5>
      <div className="card-image">
        <img
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="background"
        />
        <div className="card-content">
          {/* icon from materialize */}
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>this is amazing post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <React.Fragment>
      <div className="home">
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </React.Fragment>
  );
}
