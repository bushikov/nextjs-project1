import Link from "next/link";

export interface UserCardProps {
  name: string;
  id: number;
}

export const UserCard: React.FC<UserCardProps> = ({ name, id }) => (
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
