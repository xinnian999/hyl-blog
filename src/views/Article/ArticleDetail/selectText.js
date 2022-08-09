const selectText = (id) => {
  if (!id) return;
  let name = id.split("");
  name.shift();

  name = name.join("");
  const newRange = document.createRange();
  const el = document.getElementById(name);
  newRange.setStart(el?.firstChild, 0);
  newRange.setEnd(el?.firstChild, el?.firstChild.length);
  window.getSelection()?.addRange(newRange);
};

export default selectText;
