import Link from "next/link";

export interface AuthorCardProps {
  name: string;
  id: number;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ name, id }) => (
  <Link href={`/users/${id}`}>
    <a>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>{name}</p>
          </div>
        </div>
      </div>
    </a>
  </Link>
);
