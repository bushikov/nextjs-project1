import { PrismaClient } from "@prisma/client";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const articles = await prisma.article.findMany({
    select: { id: true },
  });

  return {
    paths: articles.map((a) => ({ params: { id: a.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();

  const intId = parseInt(params.id);
  const article = await prisma.article.findUnique({
    select: {
      id: true,
      title: true,
      body: true,
      updatedAt: true,
      User: {
        select: { name: true },
      },
    },
    where: { id: intId },
  });

  // Date型は、そのままでのJSONへのシリアライズでエラーとなるので以下のようなことをしている
  //   https://zenn.dev/ryota_koba04/articles/654e602a77bf93
  return {
    props: { article: JSON.parse(JSON.stringify(article)) },
  };
}

export default function Article({ article }) {
  return (
    <div className="container">
      <Header />
      <div className="block">
        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child box">{`Author: ${article.User.name}`}</div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <Content
                title={article.title}
                body={article.body}
                updatedAt={new Date(article.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
