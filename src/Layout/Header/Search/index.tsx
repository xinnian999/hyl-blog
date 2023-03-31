import { Drawer } from "@/components";
import { useGetData } from "@/hooks";
import { request } from "@/utils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input, Select, Table, List } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const categoryInfo = [{ key: "article", filterKey: "title", column: [] }];

function Search() {
  const [key, setKey] = useState("article");
  const [value, setValue] = useState("");
  const [result, run] = useGetData(`/${key}/query`, { manual: true });

  const navigate = useNavigate();

  const selectBefore = (
    <Select defaultValue="article" onChange={(key) => setKey(key)}>
      <Select.Option value="article">文章</Select.Option>
      <Select.Option value="resource">作品</Select.Option>
    </Select>
  );
  const onSearch = (value: string) => {
    // request
    //   .get(`/${key}/query`, { filters: { title: value } })
    //   .then((res: responseType) => {
    //     console.log(res);
    //   });
    run({ data: { filters: { title: value } } });
  };

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
              value={value}
              onChange={(val) => setValue(val.target.value)}
            />
          </div>
          {result.length ? (
            <div className="block">
              <List
                dataSource={result}
                style={{ height: "250px", overflow: "auto" }}
                renderItem={(item) => (
                  <List.Item
                    actions={[<RightOutlined />]}
                    onClick={() =>
                      (window.location.href = `/${key}/${item.id}`)
                    }
                  >
                    {item.title}
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <>
              <div className="block">
                <p>热门搜索</p>
                <div className="hot">
                  {hotTag.map((item) => {
                    return (
                      <span
                        key={item}
                        className="hotItem"
                        onClick={() => {
                          setValue(item);
                          onSearch(item);
                        }}
                      >
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
            </>
          )}
        </SearchMain>
      </Drawer>
    </SearchWrapper>
  );
}

export default Search;
