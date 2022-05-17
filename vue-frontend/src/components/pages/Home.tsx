import React from 'react';

// Components
import PostList from "../lists/PostList";

// Styles
import "../../styles/home.css";

export const Home = () => {
  return (
    <div className="home_root">
      <div className="container">
        <div className="update">
          <div className="update__header">
            <h1>Update</h1>
            <p className='update__header-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
               Vero, quos numquam similique quod dolores recusandae vitae hic, ad voluptate labore enim?
               Blanditiis quo vitae possimus sequi qui beatae quis sint.</p>
            <p className='update__header-date'>17.05.2022</p>
            <button className='btn btn-dark'>Read full</button>
          </div>
        </div>

        <div className="feed">
          <PostList/>
        </div>
      </div>
    </div>
  );
}

