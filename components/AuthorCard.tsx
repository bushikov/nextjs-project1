export interface AuthorCardProps {
  name: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ name }) => (
  <div className="card">
    <div className="card-content">
      <div className="content">{name}</div>
    </div>
  </div>
);
