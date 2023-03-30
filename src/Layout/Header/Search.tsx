import { Icon, Drawer } from "@/components";
import { SearchWrapper } from "./styled";

function Search() {
  return (
    <SearchWrapper>
      <Icon type="icon-Magnifier" className="icon" />
      {/* <Drawer
        placement="top"
        title="全站搜索"
        Flag={<Icon type="icon-Magnifier" className="icon" />}
      >
        111
      </Drawer> */}
    </SearchWrapper>
  );
}

export default Search;
