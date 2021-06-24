import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import axios from "axios";
import { Header } from "../../components/Header";
import { ArticleCard } from "../../components/ArticleCard";

const fetchMyArticles = async ({ queryKey }) => {
  const [url, { onlyMine }] = queryKey;
  const params = { conditions: onlyMine ? ["mine"] : [] };
  const response = await axios.get(url, { params });
  return response.data;
};

const Articles: React.FC<{}> = () => {
  const { data: articles, isFetching } = useQuery(
    ["/api/articles", { onlyMine: true }],
    fetchMyArticles
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

export default function Me() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [loading]);

  if (!session) {
    <p>Loading...</p>;
  }

  return (
    <div className="container">
      <Header />
      <section className="section">
        <div className="level box">
          <p className="title">{session?.user?.name}</p>
        </div>
        <div></div>
        <div className="box">
          <Articles />
        </div>
      </section>
    </div>
  );
}
