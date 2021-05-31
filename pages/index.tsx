import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Header } from "../components/Header";
import { Tab } from "../components/Tab";
import { SearchBox } from "../components/SearchBox";
import { ArticleCard } from "../components/ArticleCard";
import { AuthorCard } from "../components/AuthorCard";

const fetchData = async ({ queryKey }) => {
  const [url, { page, keyword }] = queryKey;
  const params = { page, keyword };
  const response = await axios.get(url, { params });
  return response.data;
};

interface ArticlesProps {
  keyword?: string;
}

const Articles: React.FC<ArticlesProps> = ({ keyword }) => {
  const { data: articles, isFetching } = useQuery(
    // TODO: Pagination
    // ["/api/articles", { page, keyword }],
    ["/api/articles", { keyword }],
    fetchData
  );

  if (isFetching) {
    return (
      <div className="columns">
        <p className="column">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {articles.map((article) => (
        <div className="column" key={article.id}>
          <ArticleCard
            title={article.title}
            author={article.User.name}
            content={article.body}
            date={new Date(article.updatedAt)}
          />
        </div>
      ))}
    </>
  );
};

interface AuthorsProps {
  keyword?: string;
}

const Authors: React.FC<AuthorsProps> = ({ keyword }) => {
  const { data: authors, isFetching } = useQuery(
    ["/api/authors", { keyword }],
    fetchData
  );

  if (isFetching) {
    return (
      <div className="columns">
        <p className="column">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {authors.map((author) => (
        <div className="column" key={author.name}>
          <AuthorCard name={author.name} />
        </div>
      ))}
    </>
  );
};

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  // TODO: Pagination
  // const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="container">
        <Header />
        <Tab
          labels={["記事", "作者"]}
          onChange={(index) => {
            setTabIndex(index);
          }}
        />
        <SearchBox
          placeholder={"銀河鉄道の夜"}
          onClick={(text) => {
            setKeyword(text);
          }}
        />
        <div className="box">
          {tabIndex === 0 ? (
            <Articles keyword={keyword} />
          ) : (
            <Authors keyword={keyword} />
          )}
        </div>
      </div>
    </>
  );
}
