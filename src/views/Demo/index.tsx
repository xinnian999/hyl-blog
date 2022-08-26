import { useEffect, useState, Component } from "react";
import { useSetState } from "@/hooks";

class Demo extends Component {
  state = {
    num: 0,
  };

  componentDidMount() {
    this.setState({ num: 1 });

    setTimeout(() => {
      console.log(this.state.num);
    });
  }

  render() {
    return null;
  }
}

const HookDemo = () => {
  const [{ num }, set] = useSetState({ num: 0 });

  useEffect(() => {
    set((prev) => {
      return { num: prev.num + 1 };
    });
    set((prev) => {
      return { num: prev.num + 1 };
    });
    set((prev) => {
      return { num: prev.num + 1 };
    });
  }, []);
  return (
    <>
      <Demo />
      <h1 style={{ color: "#fff" }}>{num}</h1>
    </>
  );
};

export default HookDemo;
