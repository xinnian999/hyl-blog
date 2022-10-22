import { PureComponent } from "react";
import { Button } from "antd";
import { Select } from "@arco-design/web-react";
import { SearchOutlined } from "@ant-design/icons";
import { request, debounce } from "@/utils";
import "./style.scss";

class SearchInput extends PureComponent<any> {
  state = {
    data: [],
    value: "",
  };

  componentWillUnmount() {
    // 销毁防抖函数产生的闭包
    this.fetch = null;
  }

  fetch: any = debounce(() => {
    request
      .get("/article/query", {
        params: { filters: { title: this.state.value } },
      })
      .then((res: response) => {
        if (res.status === 0) {
          this.setState({ data: res.data });
        }
      });
  }, 500);

  handleSearch = (value: string) => {
    if (value) {
      this.setState({ value }, this.fetch);
    } else {
      this.setState({ data: [] });
    }
  };

  onSearch = () => {
    const { value } = this.state;
    const { giveData } = this.props;
    request
      .get("/article/query", {
        params: { filters: { title: value } },
      })
      .then((res: response) => {
        giveData(res.data);
      });
  };

  render() {
    const { value, data } = this.state;
    const options = data.map((d: any) => {
      return {
        label: (
          <div onClick={() => this.setState({ value: d.title }, this.onSearch)}>
            {d.title}
          </div>
        ),
        value: d.title,
      };
    });

    return (
      <div className="searchBar">
        <Select
          showSearch
          value={value}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={this.handleSearch}
          notFoundContent={null}
          options={options}
          arrowIcon={null}
          placeholder="搜索文章"
        ></Select>
        <div className="searchBtn" onClick={this.onSearch}>
          <SearchOutlined />
        </div>
      </div>
    );
  }
}

export default SearchInput;
