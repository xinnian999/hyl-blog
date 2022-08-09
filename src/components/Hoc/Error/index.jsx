import React from "react";
import { Alert, Button } from "antd";
import "./style.scss";

const ErrorBlock = ({ errorInfo }) => {
  const handleReload = () => {
    window.history.go(-1);
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
          回到上一页面
        </Button>
      }
    />
  );
};

const ErrorBoundary = (Comp) => {
  return class ErrorBoundaryComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        errorInfo: "",
      };
    }

    static getDerivedStateFromError(error) {
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
