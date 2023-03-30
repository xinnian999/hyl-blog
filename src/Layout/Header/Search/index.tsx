import { Drawer } from "@/components";
import { Input, Select } from "antd";
import { SearchWrapper, SearchFlag, SearchMain } from "./styled";

const hotTag = [
  "react",
  "javascript",
  "性能优化",
  "mysql",
  "node",
  "前端",
  "chatgpt",
  "vue",
  "html",
  "css",
  "js",
  "nginx",
];

const historyTag = ["useContext", "javascript", "性能优化"];

function Search() {
  const selectBefore = (
    <Select defaultValue="article">
      <Select.Option value="article">文章</Select.Option>
      <Select.Option value="resource">作品</Select.Option>
    </Select>
  );
  const onSearch = (value: string) => console.log(value);
  return (
    <SearchWrapper>
      <Drawer
        placement="top"
        title="全站搜索"
        Flag={(props) => <SearchFlag type="icon-Magnifier" {...props} />}
        height="60%"
      >
        <SearchMain>
          <div className="block">
            <Input.Search
              addonBefore={selectBefore}
              placeholder="请输入搜索字段，支持模糊查询"
              allowClear
              onSearch={onSearch}
            />
          </div>
          <div className="block">
            <p>热门搜索</p>
            <div className="hot">
              {hotTag.map((item) => {
                return (
                  <span key={item} className="hotItem">
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="block">
            <p>历史搜索</p>
            <div className="hot">
              {historyTag.map((item) => {
                return (
                  <span key={item} className="hotItem">
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </SearchMain>
      </Drawer>
    </SearchWrapper>
  );
}

export default Search;
