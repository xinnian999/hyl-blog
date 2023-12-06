export function insertText({ inputEl, str, setState }) {
  const element = inputEl.resizableTextArea.textArea;

  const tmpStr = element.value;

  const start = element.selectionStart;
  const end = element.selectionEnd;
  console.log(start, end);

  setState({
    value: `${tmpStr.substring(0, start)}${str}${tmpStr.substring(
      end,
      tmpStr.length
    )}`,
  });

  setTimeout(() => {
    element.setSelectionRange(start + 2, start + 2);
    element.focus();
  });
}
