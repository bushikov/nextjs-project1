import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [session] = useSession();
  const [burgerOn, setBurgerOn] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link href="/">
            <a>Article Service</a>
          </Link>
        </div>
        <a
          className={`navbar-burger${burgerOn ? " is-active" : ""}`}
          onClick={() => setBurgerOn(!burgerOn)}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      {/* START Burger menu contents */}
      <div
        className={`navbar-menu${burgerOn ? " is-active" : ""}`}
        style={burgerOn ? {} : { display: "none" }}
      >
        <div className="navbar-end" style={burgerOn ? {} : {}}>
          {session ? (
            <div className="navbar-item">
              <Link href="/users/me">
                <a>My page</a>
              </Link>
            </div>
          ) : null}
          <div className="navbar-item">
            {session ? (
              <button
                className="button is-primary"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
            ) : (
              <button className="button is-primary" onClick={() => signIn()}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      {/* END Burger menu contents */}
      <div className="navbar-menu">
        <div className="navbar-end">
          {session ? (
            <div className="navbar-item">
              <Link href="/users/me">
                <a>My page</a>
              </Link>
            </div>
          ) : null}
          <div className="navbar-item">
            {session ? (
              <button className="button is-primary" onClick={() => signOut()}>
                Sign Out
              </button>
            ) : (
              <button className="button is-primary" onClick={() => signIn()}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
