import "./style.scss";

interface PlateType {
  title: string;
  autograph?: string;
  children?: any;
}

function Plate({ title = "标题", autograph = "", children }: PlateType) {
  return (
    <>
      <div className="plate-head">
        <div className="plate-head-info">
          <h2>{title}</h2>
          <p>{autograph} </p>
        </div>
      </div>

      {children && <div className="plate-main box-shadow">{children}</div>}
    </>
  );
}

export default Plate;
