import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "in",
  pageSize = 6,
  category = "general",
  apiKey,
  setProgress,}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title =
      "NewsWave - " +
      category.charAt(0).toUpperCase() +
      category.slice(1);
    fetchArticles();
    // eslint-disable-next-line
  }, []);

  const fetchArticles = async () => {
    setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    const data = await fetch(url);
    setProgress(30);
    const parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <>
        <h2 className="container my-4">
          NewsWave | Top Headlines -{" "}
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loadingMore && <Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {articles.map((element, index) => (
                <div className="col-md-4 my-3" key={element.url + index}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 60) : "No Title"
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
    </>
  );
};

export default News;
