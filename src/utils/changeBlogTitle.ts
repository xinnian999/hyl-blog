import menus from "@/router";

const changeBlogTitle = (path: string) => {
  menus.forEach((item) => {
    if (item.path === path) {
      document.title = `心 念 · ${item.title!}`;
    }
    if (item.children) {
      item.children.forEach((v) => {
        if (`${item.path}/${v.path}` === path) {
          document.title = `心 念 · ${v.title!}`;
        }
      });
    }
  });
};

export default changeBlogTitle;
