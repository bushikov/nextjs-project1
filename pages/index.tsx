import { useState, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/client";
import { Header } from "../components/Header";
import { Tab } from "../components/Tab";
import { SearchBox } from "../components/SearchBox";
import { ArticleCard } from "../components/ArticleCard";
import { UserCard } from "../components/UserCard";
import { CheckBox } from "../components/CheckBox";
import { TabIndexContext } from "../contexts/tab_index";

const fetchData = async ({ queryKey }) => {
  const [url, { page, keyword, onlyFollowing }] = queryKey;
  const params = { page, keyword, onlyFollowing };
  const response = await axios.get(url, { params });
  return response.data;
};

const fetchArticleData = async ({ queryKey }) => {
  const [url, { page, keyword, onlyFollowing }] = queryKey;
  const conditions = onlyFollowing ? ["following"] : [];
  const params = {
    page,
    keyword,
    conditions,
  };
  const response = await axios.get(url, { params });
  return response.data;
};

interface ArticlesProps {
  keyword?: string;
  onlyFollowing?: boolean;
}

const Articles: React.FC<ArticlesProps> = ({ keyword, onlyFollowing }) => {
  const { data: articles, isFetching } = useQuery(
    // TODO: Pagination
    // ["/api/articles", { page, keyword }],
    ["/api/articles", { keyword, onlyFollowing }],
    fetchArticleData
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
            href={`/articles/${article.id}`}
          />
        </div>
      ))}
    </>
  );
};

interface UsersProps {
  keyword?: string;
  onlyFollowing?: boolean;
}

const Users: React.FC<UsersProps> = ({ keyword, onlyFollowing }) => {
  const { data: users, isFetching } = useQuery(
    ["/api/users", { keyword, onlyFollowing }],
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
      {users.map((user) => (
        <div className="column" key={user.name}>
          <UserCard name={user.name} id={user.id} />
        </div>
      ))}
    </>
  );
};

export default function Home() {
  const [session] = useSession();
  const [tabIndex, setTabIndex] = useContext(TabIndexContext);
  // TODO: Pagination
  // const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [onlyFollowing, setOnlyFollowing] = useState(false);

  return (
    <>
      <div className="container">
        <Header />
        <Tab
          defaultValue={tabIndex}
          labels={["Articles", "Users"]}
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
        {session ? (
          <div className="block">
            <CheckBox
              label="Only following"
              onChange={(on) => {
                setOnlyFollowing(on);
              }}
            />
          </div>
        ) : null}
        <div className="box">
          {tabIndex === 0 ? (
            <Articles keyword={keyword} onlyFollowing={onlyFollowing} />
          ) : (
            <Users keyword={keyword} onlyFollowing={onlyFollowing} />
          )}
        </div>
      </div>
    </>
  );
}
