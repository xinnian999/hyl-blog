import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { request } from "@/utils";
import { debounce } from "hyl-utils";
import "./style.scss";
import { useSetState } from "@/hooks";
import { useCallback } from "react";

type State = {
  value: string;
  data: any[];
};

function Search(props) {
  const [{ value, data }, setState] = useSetState<State>({
    value: "",
    data: [],
  });

  const fetch = useCallback(
    debounce(() => {
      request
        .get("/article/query", { filters: { title: value } })
        .then((res: responseType) => {
          if (res.status === 0) {
            setState({ data: res.data });
          }
        });
    }, 700),
    []
  );

  const handleSearch = (value: string) => {
    if (value) {
      setState({ value });
      fetch();
    } else {
      setState({ data: [] });
    }
  };

  const onSearch = () => {
    const { giveData } = props;
    request
      .get("/article/query", { filters: { title: value } })
      .then((res: responseType) => {
        giveData(res.data);
      });
  };

  const options = data.map((d) => {
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
        onSearch={handleSearch}
        notFoundContent={null}
        options={options}
        placeholder="搜索文章"
        className="searchInput"
        onChange={(val) => setState({ value: val }, onSearch)}
      ></Select>
      <div className="searchBtn" onClick={onSearch}>
        <SearchOutlined />
      </div>
    </div>
  );
}

export default Search;
