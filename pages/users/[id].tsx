import { PrismaClient } from "@prisma/client";
import { Header } from "../../components/Header";
import { ArticleCard } from "../../components/ArticleCard";

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({ select: { id: true } });

  return {
    paths: users.map((u) => ({ params: { id: u.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();

  const intId = parseInt(params.id);
  const user = await prisma.user.findUnique({
    where: { id: intId },
    select: {
      id: true,
      name: true,
      Articles: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return {
    props: { user },
  };
}

export default function User({ user }) {
  return (
    <div className="container">
      <Header />
      <section className="section">
        <div className="tile box">
          <p>{user.name}</p>
        </div>
        {user.Articles.map((a) => (
          <ArticleCard key={a.id} title={a.title} href={`/articles/${a.id}`} />
        ))}
      </section>
    </div>
  );
}
