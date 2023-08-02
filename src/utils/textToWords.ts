export const textToWords = (text: string): string[] => {
  const tmpDiv = document.createElement("div") as HTMLDivElement;
  tmpDiv.innerHTML = text.replace(/(<\d+:\d+:\d+.\d+>)?<[/]?[c].*?>/g, "").replace(/[\r\n]+/g, "\r\n ");

  const items = Array.from(tmpDiv.childNodes);

  return items.flatMap((item) => (item.textContent || "").match(/[^ ]+/g));
};
