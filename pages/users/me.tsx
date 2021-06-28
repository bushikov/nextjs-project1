import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Header } from "../../components/Header";
import { ArticleCard } from "../../components/ArticleCard";
import { ArticleForm } from "../../components/ArticleForm";

const fetchMyArticles = async ({ queryKey }) => {
  const [url, { onlyMine }] = queryKey;
  const params = { conditions: onlyMine ? ["mine"] : [] };
  const response = await axios.get(url, { params });
  return response.data;
};

type ArticlesProps = {
  articles: {
    id: number;
    title: string;
    User: {
      name;
    };
    body: string;
    updatedAt: string;
  }[];
};

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
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
  const {
    isFetching,
    data: articles,
    refetch,
  } = useQuery(["/api/articles", { onlyMine: true }], fetchMyArticles);
  const { mutate, isLoading } = useMutation(
    async (article) => {
      await axios.post("/api/articles", article);
    },
    {
      onSuccess: async () => {
        await refetch();
      },
    }
  );

  // 未ログイン時はルートに移動
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
        <div className="box">
          {isLoading ? <p>Adding...</p> : <ArticleForm onSubmit={mutate} />}
        </div>
        <div className="box">
          {isFetching ? (
            <div className="columns">
              <p className="column">Loading...</p>
            </div>
          ) : (
            <Articles articles={articles} />
          )}
        </div>
      </section>
    </div>
  );
}
