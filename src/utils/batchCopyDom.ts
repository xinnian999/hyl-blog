const batchCopyDom = (render: (key:number)=>any, count: number) => {
  const doms: any[] = [];

  for (let i = 0; i < count; i++) {
    doms.push(render(i));
  }

  return doms;
};

export default batchCopyDom;
