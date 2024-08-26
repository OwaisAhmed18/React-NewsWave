import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  handlePrevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=10a95195ffd14a8e8f734ed5e1d9d209&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="my-3">Top headlines today</h2>
          {this.state.loading && <Spinner />}
          <div className="row my-3">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 44) : "No Title"
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
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark mb-3"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark mb-3"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
