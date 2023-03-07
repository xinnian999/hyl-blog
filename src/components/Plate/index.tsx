import { classnames } from "hyl-utils";
import { memo } from "react";
import { useRedux } from "@/hooks";
import "./style.scss";
import Banner from "./Banner";

function Plate({ children, ...props }: PlateProps) {
  const { store } = useRedux();

  return (
    <>
      <Banner {...props} />

      <div className="plate-main">
        {/* {children && (
          <div className={classnames({ "box-shadow": !store.dark })}>
            {children}
          </div>
        )} */}
        {children}
      </div>
    </>
  );
}

export default memo(Plate);
