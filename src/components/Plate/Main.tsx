import { classnames } from "hyl-utils";

const Main = (props: DomProps) => {
  const { children, className = "", id = "" } = props;

  return (
    <div id={id} className={classnames("plate-main", className)}>
      {children}
    </div>
  );
};

export default Main;
