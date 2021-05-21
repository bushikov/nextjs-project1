export interface HeaderProps {
  isSignedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isSignedIn }) => (
  <div className="navbar">
    <div className="navbar-brand">
      <p className="navbar-item">サービス名</p>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          {isSignedIn ? (
            <button className="button is-primary">Sign Out</button>
          ) : (
            <button className="button is-primary">Sign In</button>
          )}
        </div>
      </div>
    </div>
  </div>
);
