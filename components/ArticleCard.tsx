import Link from "next/link";

export interface ArticleCardProps {
  title: string;
  content?: string;
  author?: string;
  date?: Date;
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
          {author ? (
            <p className="card-header-title">{`Author: ${author}`}</p>
          ) : null}
        </div>
        {content || date ? (
          <div className="card-content">
            {content ? <div className="content">{content}</div> : null}
            {date ? (
              <p className="subtitle has-text-right">
                {date.toLocaleDateString("ja")}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </a>
  </Link>
);
