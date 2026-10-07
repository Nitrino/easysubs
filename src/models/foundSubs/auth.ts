import type { TSourceAuth } from "@src/subsSources/types";

// The user's own keys of the sources that need one, sent with each search and download. The OpenSubtitles account is
// the background's (src/subsSources/session.ts): pages never get its password or token.
export type TCredentials = {
  subdlApiKey: string;
  subsourceApiKey: string;
  jimakuApiKey: string;
};

export const currentAuth = ({ subdlApiKey, subsourceApiKey, jimakuApiKey }: TCredentials): TSourceAuth => ({
  subdlApiKey: subdlApiKey || undefined,
  subsourceApiKey: subsourceApiKey || undefined,
  jimakuApiKey: jimakuApiKey || undefined,
});

export async function sendMessage<T>(message: Record<string, unknown>): Promise<T> {
  const answer = await chrome.runtime.sendMessage(message);
  if (answer && typeof answer === "object" && "error" in answer) {
    throw Object.assign(new Error(String(answer.error)), answer);
  }
  return answer as T;
}
