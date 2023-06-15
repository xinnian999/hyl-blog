import React from "react";
import { Alert, Button } from "antd";
import { removeDom } from "hyl-utils";
import "./style.scss";

const ErrorBlock = ({ errorInfo }) => {
  const handleReload = () => {
    localStorage.clear();

    window.location.reload();
  };
  return (
    <Alert
      showIcon
      message={"页面发生错误"}
      description={errorInfo.toString()}
      type="error"
      action={
        <Button type="primary" onClick={handleReload}>
          尝试解决错误
        </Button>
      }
    />
  );
};

const ErrorBoundary = (Comp) => {
  return class ErrorBoundaryComp extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        errorInfo: "",
      };
    }

    static getDerivedStateFromError(error) {
      removeDom("#loading-box");
      return { hasError: true, errorInfo: error };
    }

    render() {
      const { hasError, errorInfo } = this.state;
      if (hasError) {
        return (
          <div className="error">
            <ErrorBlock errorInfo={errorInfo} />
          </div>
        );
      }

      return <Comp {...this.props}></Comp>;
    }
  };
};

export default ErrorBoundary;
