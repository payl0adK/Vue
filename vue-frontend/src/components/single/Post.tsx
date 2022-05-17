import React from 'react'


import "../../styles/post.css"

const Post = () => {
  return (
    <div className='post'>
        <div className="post__header">
            <b className='post__header-theme'>Theme</b>
            <b className='post__header-author'>Author</b>
            <p className='post__date'>17.05.2022</p>
        </div>

        <div className="post__body">
            <p className='post__body-header'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            </p>
            <p className='post__short-description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Tempora quis adipisci, impedit deserunt dolorum similique aut dolor nobis, 
                eius repudiandae praesentium vero culpa. Harum earum reiciendis ea, corporis eos pariatur?
            </p>
        </div>

        <div className="post__image">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
        </div>

        <div className="post__bottom">
            <div className="post__bottom-actions">
                <i className="fa-regular fa-comment"></i>
                <i className="fa-regular fa-bookmark"></i>
                <i className="fa-regular fa-share-from-square"></i>
            </div>
            
            <div className="post__bottom-buttons">
                <span className='reputation'>100</span>
                <i className="fa-solid fa-plus"></i>
                <i className="fa-solid fa-minus"></i>
            </div>
        </div>
        
    </div>
  )
}

export default Post