import "./style.scss";

interface isBanner {
  title: string;
  autograph?: string;
}

function Index({ title = "标题", autograph = "" }: isBanner) {
  return (
    <div className="banner-container">
      <div className="content">
        <h2>{title}</h2>
        <p>{autograph} </p>
      </div>
    </div>
  );
}

export default Index;
