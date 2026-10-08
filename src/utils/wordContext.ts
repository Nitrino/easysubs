import type { TSub, TTitleInfo } from "@src/models/types";

// The subtitle line a word is added to a learning service from, as the card shows it

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttribute = (text: string) => escapeHtml(text).replace(/"/g, "&quot;");

// The line as HTML with the word, or the words of an expression, in bold; punctuation stays outside
export function sentenceHtml(sub: TSub, indexes: number[]): string {
  return sub.items
    .map((item, index) => {
      const text = item.text.replace(/\s+/g, " ").trim();
      if (!indexes.includes(index)) return escapeHtml(text);
      const at = item.cleanedText ? text.indexOf(item.cleanedText) : -1;
      if (at < 0) return `<b>${escapeHtml(text)}</b>`;
      const end = at + item.cleanedText.length;
      return `${escapeHtml(text.slice(0, at))}<b>${escapeHtml(item.cleanedText)}</b>${escapeHtml(text.slice(end))}`;
    })
    .filter(Boolean)
    .join(" ")
    .replace(/<\/b> <b>/g, " ");
}

// "4:05", "1:02:09"
export function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const [hours, minutes, seconds] = [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60];
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

// What's playing: the title the service knows, or the page's
export function titleLabel(title: TTitleInfo | null, documentTitle: string): string {
  if (title?.title) {
    const episode =
      title.type === "episode" && title.season && title.episode ? ` · S${title.season}E${title.episode}` : "";
    return `${title.title}${episode}`;
  }
  // "(3) Some video - YouTube": the count of notifications and the site's name
  return documentTitle
    .replace(/^\(\d+\)\s*/, "")
    .replace(/\s+[-–|]\s+YouTube$/, "")
    .trim();
}

// The page's address at the line, where the service takes a time in it
export function timedUrl(href: string, service: string, ms: number): string {
  if (service !== "youtube") return href;
  try {
    const url = new URL(href);
    url.searchParams.set("t", `${Math.floor(ms / 1000)}s`);
    return url.toString();
  } catch {
    return href;
  }
}

export function sourceHtml({ label, url, time }: { label: string; url: string; time: number }): string {
  const text = escapeHtml([label, formatTime(time)].filter(Boolean).join(" · "));
  return url ? `<a href="${escapeAttribute(url)}">${text}</a>` : text;
}
