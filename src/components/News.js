import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: "jp",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  articles = [
    {
      source: {
        id: null,
        name: "Tom's Hardware UK",
      },
      author: "Dallin Grimm",
      title:
        "Qualcomm responds to benchmark cheating allegations — Snapdragon X Elite/Plus benchmarks claimed to be fraudulent (Updated) - Tom's Hardware",
      description: "Seriously concerning news for Qualcomm's latest",
      url: "https://www.tomshardware.com/tech-industry/qualcomm-faces-benchmark-cheating-allegations-snapdragon-x-eliteplus-benchmarks-claimed-to-be-fraudulent",
      urlToImage:
        "https://cdn.mos.cms.futurecdn.net/hMCDAGkWvfbzxrGdc4ahBZ-1200-80.jpeg",
      publishedAt: "2024-04-25T10:29:28Z",
      content:
        "Accusations have emerged that Qualcomm is cheating on the benchmarks of its new Snapdragon X Elite and Plus laptop processors. The Snapdragon X Plus, announced earlier today, joins the previously ann… [+4115 chars]",
    },
    {
      source: {
        id: null,
        name: "BBC News",
      },
      author: null,
      title: "Meta AI spending plans cause share price slump - BBC.com",
      description:
        "Investors react badly to the Facebook and WhatsApp owner spending more than anticipated on AI.",
      url: "https://www.bbc.com/news/articles/cl40v5x483yo",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/a0b9/live/3a45b540-0279-11ef-a922-7b933c00b69a.jpg",
      publishedAt: "2024-04-25T09:10:59Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "SciTechDaily",
      },
      author: null,
      title:
        "Hubble Celebrates 34th Anniversary With a Spectacular View of the Little Dumbbell Nebula - SciTechDaily",
      description:
        "Glowing Bipolar Bubble From Dying Star Expands Into Space In celebration of the 34th anniversary of the launch of NASA's legendary Hubble Space Telescope on April 24, 1990, astronomers took a snapshot of the Little Dumbbell Nebula. Also known as Messier 76, M…",
      url: "https://scitechdaily.com/hubble-celebrates-34th-anniversary-with-a-spectacular-view-of-the-little-dumbbell-nebula/",
      urlToImage:
        "https://scitechdaily.com/images/Little-Dumbbell-Nebula-M76-scaled.jpg",
      publishedAt: "2024-04-25T08:25:48Z",
      content:
        "Astronomers celebrated the 34th anniversary of the Hubble Space Telescope by capturing an image of the Little Dumbbell Nebula, 3400 light-years away. Hubble has conducted 1.6 million observations and… [+8868 chars]",
    },
    {
      source: {
        id: null,
        name: "Tom's Hardware UK",
      },
      author: "Dallin Grimm",
      title:
        "Qualcomm responds to benchmark cheating allegations — Snapdragon X Elite/Plus benchmarks claimed to be fraudulent (Updated) - Tom's Hardware",
      description: "Seriously concerning news for Qualcomm's latest",
      url: "https://www.tomshardware.com/tech-industry/qualcomm-faces-benchmark-cheating-allegations-snapdragon-x-eliteplus-benchmarks-claimed-to-be-fraudulent",
      urlToImage:
        "https://cdn.mos.cms.futurecdn.net/hMCDAGkWvfbzxrGdc4ahBZ-1200-80.jpeg",
      publishedAt: "2024-04-25T10:29:28Z",
      content:
        "Accusations have emerged that Qualcomm is cheating on the benchmarks of its new Snapdragon X Elite and Plus laptop processors. The Snapdragon X Plus, announced earlier today, joins the previously ann… [+4115 chars]",
    },
  ];

  constructor() {
    super();

    this.state = {
      articles: this.articles,
      page: 1,
      nextBtnDisabled: false,
      loading: false,
    };

    console.log(this.state.articles.length)
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=49b46aaf6b3145b596554176b485a77a&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=49b46aaf6b3145b596554176b485a77a&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="mb-3 text-center">News Monkey - Top Headlines</h2>
        {this.state.loading && <Loading />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
          // scrollableTarget="scrollableDiv"
        >
          <div className="news-item-row">
            {this.state.articles.map((element, index) => {
              return (
                <div className="column-md-3" key={index}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 45) + "..." : ""
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88) + "..."
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-info my-3 mx-6"
            onClick={this.handlePreviousClick}
          >
            Previous Page
          </button>
          <button
            disabled={this.state.nextBtnDisabled}
            type="button"
            className="btn btn-success my-3 mx-6"
            onClick={this.handleNextClick}
          >
            Next Page
          </button>
        </div> */}
      </div>
    );
  }
}
