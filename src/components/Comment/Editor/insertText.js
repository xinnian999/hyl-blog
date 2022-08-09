export function insertText(inputRef, str, setState) {
  const element = inputRef.current.resizableTextArea.textArea;

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
