import menus from "@/router";

const changeBlogTitle = (path?: string, title?: string) => {
  if (path === "/home") return (document.title = `心念の空间站`);
  if (title) return (document.title = `${title} · 心念の空间站`);

  menus.forEach((item) => {
    if (item.path === path) {
      document.title = `${item.title!} · 心念の空间站`;
    }
    if (item.children) {
      item.children.forEach((v) => {
        if (`${item.path}/${v.path}` === path) {
          document.title = `${v.title!} · 心念の空间站`;
        }
      });
    }
  });
};

export default changeBlogTitle;
