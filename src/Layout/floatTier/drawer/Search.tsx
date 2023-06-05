import { Icon } from "@/components";
import { useBoolean, useMount } from "@/hooks";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Input, List, Drawer } from "antd";
import { request } from "@/utils";
import { useState } from "react";

const SearchMain = styled.div`
  width: 650px;
  margin: 0 auto;
  .block {
    padding: 10px;
  }
  .hot {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    .hotItem {
      padding: 5px;
      background-color: var(--highlight-background-color);
      border-radius: 5px;
      margin: 0 10px 10px 0;
      &:last-child {
        margin-right: auto;
      }
    }
  }
`;

const ListItem = styled(List.Item)`
  cursor: pointer;
  &:hover {
    background-color: var(--highlight-background-color);
  }
`;

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

const enumResult = (item) => {
  let r = { name: "", link: "" };
  switch (item.tag) {
    case "article":
      r.name = "文章";
      r.link = `/article/${item.id}`;
      break;
    case "note":
      r.name = "笔记";
      r.link = `/journal/note?id=${item.id}`;
      break;
    case "work":
      r.name = "个人作品";
      r.link = item.link;
      break;
    case "link":
      r.name = "友情链接";
      r.link = item.link;
      break;
    default:
      break;
  }

  return r;
};

function Search() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [historyTag, setHistoryTag] = useState<string[]>([]);
  const [isSearch, on, off] = useBoolean(false);

  useMount(() => {
    const historySearch = localStorage.getItem("historyTag");
    if (historySearch) setHistoryTag(JSON.parse(historySearch));
  });

  const onSearch = (val: string) => {
    if (val) {
      const history = [...historyTag, val];
      localStorage.setItem("historyTag", JSON.stringify(history));
      setHistoryTag(history);
      request.get(`/all/search`, { q: val }).then((res) => {
        on();

        setResult(res);
      });
    } else {
      off();
    }
  };

  return (
    <Drawer placement="top" title="全站搜索" height="60%">
      <SearchMain>
        <div className="block">
          <Input.Search
            placeholder="请输入搜索字段，支持模糊查询"
            allowClear
            onSearch={onSearch}
            value={value}
            onChange={(val) => setValue(val.target.value)}
          />
        </div>
        {isSearch ? (
          <div className="block">
            <List
              dataSource={result}
              style={{ height: "300px", overflow: "auto" }}
              locale={{ emptyText: "哦！没有搜索结果" }}
              renderItem={(item) => (
                <ListItem
                  actions={[<RightOutlined />]}
                  onClick={() => window.open(enumResult(item).link, "_self")}
                >
                  【{enumResult(item).name}】 {item.title || item.name}
                </ListItem>
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
  );
}

export default Search;
