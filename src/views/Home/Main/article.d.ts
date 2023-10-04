interface articleItem extends Item {
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
}

interface categoryItem extends Item {
  name: string;
}

interface ArticleDetailState {
  info: Pick<
    articleItem,
    'content' | 'title' | 'createTime' | 'updateTime' | 'visits' | 'category'
  >;
  anchorList: any;
  targetOffset: number;
  aboutArticle: articleItem[];
}

interface ArticleCardProps extends articleItem {
  loading?: boolean;
}
