import Link from "next/link";

export interface ArticleCardProps {
  title: string;
  content: string;
  author: string;
  date: Date;
  href: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  author,
  content,
  date,
  href,
}) => (
  <Link href={href}>
    <a>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">{`Title: ${title}`}</p>
          <p className="card-header-title">{`Author: ${author}`}</p>
        </div>
        <div className="card-content">
          <div className="content">{content}</div>
          <p className="subtitle has-text-right">
            {date.toLocaleDateString("ja")}
          </p>
        </div>
      </div>
    </a>
  </Link>
);
