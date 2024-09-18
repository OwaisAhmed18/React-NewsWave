import React from 'react'
const NewsItem =(props)=> {
  
    let {title, imgUrl, description, url,author, date} = props ;
    return (
      <> 
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'88%', zIndex:'1'}}>
              {author}</span>
          <img src={imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </>
    )
  }


export default NewsItem
