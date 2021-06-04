const styles: { [key: string]: React.CSSProperties } = {
  date: { textAlign: "right" },
};

export interface ContentProps {
  title: string;
  body: string;
  updatedAt: Date;
}

export const Content: React.FC<ContentProps> = ({ title, body, updatedAt }) => (
  <div className="content">
    <h1>{title}</h1>
    <h4 style={styles.date}>{updatedAt.toLocaleDateString("ja")}</h4>
    <p>{body}</p>
  </div>
);
