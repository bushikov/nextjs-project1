import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/client";
import axios from "axios";
import { useQuery } from "react-query";
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

const FollowActionButton: React.FC<{ isFollowing: boolean; targetId: number }> =
  ({ isFollowing: isFollowingArg, targetId }) => {
    const [isFollowing, setIsFollowing] = useState(isFollowingArg);

    return (
      <>
        {isFollowing ? (
          <button
            className="button is-danger"
            onClick={async () => {
              try {
                await axios.delete("/api/users/me/following", {
                  data: { targetId },
                });
                setIsFollowing(false);
              } catch (e) {}
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="button is-primary"
            onClick={async () => {
              try {
                await axios.post("/api/users/me/following", { targetId });
                setIsFollowing(true);
              } catch (e) {}
            }}
          >
            Follow
          </button>
        )}
      </>
    );
  };

export default function User({ user }) {
  const [session] = useSession();
  const { data, isFetching } = useQuery(
    "/api/users/me/following",
    async ({ queryKey }) => {
      const [url] = queryKey;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (e) {
        return {};
      }
    }
  );

  return (
    <div className="container">
      <Header />
      <section className="section">
        <div className="level box">
          <p className="title" style={{ marginBottom: 0 }}>
            {user.name}
          </p>
          {session && !isFetching ? (
            <FollowActionButton
              isFollowing={data.following.map((f) => f.id).includes(user.id)}
              targetId={user.id}
            />
          ) : null}
        </div>
        {user.Articles.map((a) => (
          <ArticleCard key={a.id} title={a.title} href={`/articles/${a.id}`} />
        ))}
      </section>
    </div>
  );
}
