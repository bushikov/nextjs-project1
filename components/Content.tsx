export interface ContentProps {
  title: string;
  body: string;
  updatedAt: Date;
}

export const Content: React.FC<ContentProps> = ({ title, body, updatedAt }) => (
  <div className="content">
    <h1>{title}</h1>
    <h4 style={{ textAlign: "right" }}>{updatedAt.toLocaleDateString("ja")}</h4>
    <p>{body}</p>
  </div>
);
