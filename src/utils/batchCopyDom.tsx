const batchCopyDom = (Item: any, count: number) =>
  Array.from({ length: count }, (key, index) => <Item key={index} />);

export default batchCopyDom;
