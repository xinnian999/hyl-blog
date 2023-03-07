import { useRedux } from "@/hooks";
import { classnames } from "hyl-utils";

const Main = ({ children, id }) => {
  const { store } = useRedux();
  return (
    <div id={id} className={classnames("main", { "box-shadow": !store.dark })}>
      {children}
    </div>
  );
};

export default Main;
