const NewsDetailWindow = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => (
    <div style={{ padding: "10px" }}>
      <h4>{title}</h4>
      <hr />
      <p>{content}</p>
    </div>
  );
  
  export default NewsDetailWindow;