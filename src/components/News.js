import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      loadingMore: false,
      totalResults: 0,
    };
    document.title =
      "NewsWave - " +
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1);
  }

  fetchArticles = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchMoreData = async () => {
    this.setState({ loadingMore: true });
    let nextPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage,
      loadingMore: false
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="my-3">
            NewsWave | Top Headlines -{" "}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}
          </h2>
          {this.state.loading && <Spinner />}

          <InfiniteScroll
            dataLength={this.state.articles.length} // Ensure length is always defined
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={this.state.loadingMore && <Spinner />}
          >
            <div className="container">
              <div className="row my-3">
                {this.state.articles.map((element, index) => (
                  <div className="col-md-4 my-3" key={element.url + index}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 60)
                          : "No Title"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "No Description"
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://via.placeholder.com/150"
                      }
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
