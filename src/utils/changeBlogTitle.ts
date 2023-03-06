import { router } from "@/config";

const changeBlogTitle = (path?: string, title?: string) => {
  if (path === "/home") return (document.title = `${globalConfig.title}`);
  if (path === "/404") return (document.title = `404 · ${globalConfig.title}`);
  if (title) return (document.title = `${title} · ${globalConfig.title}`);

  router.forEach((item) => {
    if (item.path === path) {
      document.title = `${item.title} · ${globalConfig.title}`;
    }
    if (item.children) {
      item.children.forEach((v) => {
        if (`${item.path}/${v.path}` === path) {
          document.title = `${v.title} · ${globalConfig.title}`;
        }
      });
    }
  });
};

export default changeBlogTitle;
