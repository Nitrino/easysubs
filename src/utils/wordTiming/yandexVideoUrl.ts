// The address Yandex knows the video by: YouTube's short link, the page otherwise
export function yandexVideoUrl(service: string | undefined, href: string): string {
  const url = new URL(href);
  if (service === "youtube") {
    const id = url.searchParams.get("v") ?? url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/)?.[1];
    if (id) return `https://youtu.be/${id}`;
  }
  url.hash = "";
  return url.href;
}
