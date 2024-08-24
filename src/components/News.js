import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    articles = [
    ]  
 
  constructor(){
    super();
    this.state = ({
      articles :[],
      page : 1,
      loading : false
    })
  }
async componentDidMount(){
   let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=1&pageSize=${this.props.pageSize}`;
   this.setState({loading:true})
   let data = await fetch(url);
   let parsedData = await data.json()
   this.setState({articles : parsedData.articles,
                  totalResults : parsedData.totalResults,
                  loading : false
   })
}

handleNextClick= async()=>{
console.log("next");
let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
this.setState({loading:true})
let data = await fetch(url);
let parsedData = await data.json()
this.setState({articles : parsedData.articles,
               page : this.state.page+1,
               loading : false});
};

handlePrevClick= async()=>{
  console.log("prev");
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({articles : parsedData.articles,
                 page : this.state.page-1,
                 loading : false})
  }

  render() { 
    return (
      <>
      <div className='container my-3'>
        <h2 className='my-3'>Top headlines today</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
        {this.state.articles.map((element)=>{
        return <div className="col-md-4 my-3" key={element.publishedAt} >
          <NewsItem 
          title={element.title?element.title.slice(0,44):"No Title"}
          description={element.description?element.description.slice(0,90): ""}
          imgUrl={element.urlToImage?element.urlToImage : "https://halove-centrum.cz/wp-content/uploads/2017/06/news-image.jpg"}
          url={element.url}/>
         </div>
        })}
        </div> 
      </div>
      <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
      </div>
      </>
    )
  }
}

export default News
