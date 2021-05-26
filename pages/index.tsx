import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useQuery } from "react-query";
import axios from "axios";
import { Header } from "../components/Header";
import { Tab } from "../components/Tab";
import { SearchBox } from "../components/SearchBox";
import { ArticleCard } from "../components/ArticleCard";

const getArticles = async ({ queryKey }) => {
  const [url, { page, keyword }] = queryKey;
  const params = { page, keyword };
  const response = await axios.get(url, { params });
  return response.data;
};

export default function Home() {
  const [session] = useSession();
  const [tabIndex, setTabIndex] = useState(0);
  // TODO: Pagination
  // const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data: articles, isFetching } = useQuery(
    // TODO: Pagination
    // ["/api/articles", { page, keyword }],
    ["/api/articles", { keyword }],
    getArticles
  );

  return (
    <>
      {!session && (
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
            {isFetching ? (
              <div className="columns">
                <p className="column">Loading...</p>
              </div>
            ) : (
              articles.map((article) => (
                <div className="column" key={article.id}>
                  <ArticleCard
                    title={article.title}
                    author={article.User.name}
                    content={article.body}
                    date={new Date(article.updatedAt)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {session && (
        <div>
          You are signed in
          <br />
          Your name is {session.user.name}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
}
