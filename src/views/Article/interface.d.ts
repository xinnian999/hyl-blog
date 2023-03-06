interface articleItem {
  title: string;
  category: string;
  introduce: string;
  content: string;
  picture: string;
  type: number;
  visits: number;
  comments: number;
  publish: number;
  topping: number;
  createTime: string;
  updateTime: string;
  id: number;
}

interface categoryItem {
  name: string;
  loading?: boolean;
  id: number;
}
