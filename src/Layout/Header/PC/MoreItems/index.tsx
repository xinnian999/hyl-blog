import User from "./User";
import Search from "./Search";
import { MoreItemsWrapper, MoreItemsGrid } from "./styled";

function MoreItems() {
  return (
    <MoreItemsWrapper>
      <Search />
      <MoreItemsGrid />
      <User />
    </MoreItemsWrapper>
  );
}

export default MoreItems;
