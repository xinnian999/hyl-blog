import { useRedux } from "@/hooks";
import { classnames } from "hyl-utils";
import { ReactNode } from "react";
import "./style.scss";

interface PlateType {
  title: string;
  autograph?: string | ReactNode;
  children?: any;
  bg?: string;
}

function Plate({
  title = "标题",
  autograph = "",
  children,
  bg = "bg1.webp",
}: PlateType) {
  const { store } = useRedux();

  return (
    <>
      <div className="plate-head">
        <div className="plate-head-info">
          <h2>{title}</h2>
          <div className="plate-head-info-autograph">{autograph} </div>
        </div>
        <div
          className="plate-head-bg"
          style={{
            opacity: store.dark ? "0.7" : "1",
            backgroundImage: `url(${require(`@/assets/img/bg/${
              store.dark ? "bg8.jpg" : bg
            }`)})`,
          }}
        ></div>
      </div>

      {children && (
        <div
          className={classnames("plate-main", { "box-shadow": !store.dark })}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Plate;
