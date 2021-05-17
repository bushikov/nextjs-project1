import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();

  return (
    <>
      {!session && (
        <div>
          You are not signed in
          <br />
          <button onClick={() => signIn()}>Sign in</button>
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
