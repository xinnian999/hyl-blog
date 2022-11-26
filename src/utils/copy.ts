const copy = (str: string) => {
  var input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = str;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};

export default copy;
