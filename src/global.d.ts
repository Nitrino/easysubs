import Chrome from "chrome";

declare namespace chrome {
  export default Chrome;
}

declare module "virtual:reload-on-update-in-background-script" {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module "virtual:reload-on-update-in-view" {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    playerInstance: any;
    isLoaded: boolean;
    subtitlesEnabled: boolean;
  }
}

declare module "m3u8-parser" {
  export class Parser {
    push: (string: string) => void;
    end: () => void;
    manifest: {
      allowCache: boolean;
      endList: boolean;
      mediaSequence: number;
      discontinuitySequence: number;
      playlistType: string;
      custom: Record<string, unknown>;
      playlists: [
        {
          attributes: Record<string, unknown>;
        }
      ];
      mediaGroups: {
        AUDIO: {
          "GROUP-ID": {
            NAME: {
              default: boolean;
              autoselect: boolean;
              language: string;
              uri: string;
              instreamId: string;
              characteristics: string;
              forced: boolean;
            };
          };
        };
        VIDEO: Record<string, unknown>;
        "CLOSED-CAPTIONS": Record<string, unknown>;
        SUBTITLES: {
          sub: Record<
            string,
            {
              uri: string;
            }
          >;
        };
      };
      dateTimeString: string;
      dateTimeObject: Date;
      targetDuration: number;
      totalDuration: number;
      discontinuityStarts: [number];
      segments: [
        {
          byterange: {
            length: number;
            offset: number;
          };
          duration: number;
          attributes: Record<string, unknown>;
          discontinuity: number;
          uri: string;
          timeline: number;
          key: {
            method: string;
            uri: string;
            iv: string;
          };
          map: {
            uri: string;
            byterange: {
              length: number;
              offset: number;
            };
          };
          "cue-out": string;
          "cue-out-cont": string;
          "cue-in": string;
          custom: Record<string, unknown>;
        }
      ];
    };
  }
}
