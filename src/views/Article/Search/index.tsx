import { PureComponent } from "react";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { request } from "@/utils";
import { debounce } from "hyl-utils";
import "./style.scss";

class SearchInput extends PureComponent<any> {
  state = {
    data: [],
    value: "",
  };

  fetch = debounce(() => {
    request
      .get("/article/query", { filters: { title: this.state.value } })
      .then((res: responseType) => {
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
      .get("/article/query", { filters: { title: value } })
      .then((res: responseType) => {
        giveData(res.data);
      });
  };

  render() {
    const { value, data } = this.state;
    const options = data.map((d: any) => {
      return {
        label: d.title,
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
          placeholder="搜索文章"
          className="searchInput"
          onChange={(val) => this.setState({ value: val }, this.onSearch)}
        ></Select>
        <div className="searchBtn" onClick={this.onSearch}>
          <SearchOutlined />
        </div>
      </div>
    );
  }
}

export default SearchInput;
