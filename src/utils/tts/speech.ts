export type TSpeechRequest = {
  text: string;
  lang: string;
  chatGPTApiKey?: string;
};

export type TSpeech = {
  type: string;
  data: ArrayBuffer;
};

// Only audio counts: the services answer a word they can't say with an error page or JSON
export async function readSpeech(response: Response, service: string, text: string): Promise<TSpeech> {
  const type = response.headers.get("content-type")?.split(";")[0].trim() ?? "";
  const isAudio = type.startsWith("audio/") || type === "application/ogg";
  const data = response.ok && isAudio ? await response.arrayBuffer() : undefined;
  if (!data?.byteLength) {
    throw new Error(`${service} has no pronunciation of "${text}"`);
  }
  return { type, data };
}

// "en" of "en-US", "zh" of "zh-CN"
export const baseLanguage = (lang: string) => lang.split("-")[0].toLowerCase();
