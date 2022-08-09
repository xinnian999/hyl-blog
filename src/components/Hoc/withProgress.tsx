import { Component } from "react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const WidthProgress = (WrappedComponent: any) => {
  return class NewComponent extends Component {
    componentWillMount() {
      Nprogress.start();
    }

    componentDidMount() {
      Nprogress.done();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WidthProgress;
