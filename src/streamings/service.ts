import { Captions, TSubsTrack, TTitleInfo } from "@src/models/types";

interface Service {
  name: string;

  // Getting subtitles from a service
  getSubs: (language: string) => Promise<Captions>;

  // The subtitle tracks of the current video that getSubs() can load, for the second subtitle line. Services that
  // read each line off the page have none: their second line is translated.
  getSubsTracks?: () => Promise<TSubsTrack[]>;

  // What's playing, to search subtitle libraries for it. Services that can't tell open the search with an empty field.
  getTitle?: () => Promise<TTitleInfo | null>;

  // The video playing, where the page's address doesn't change between videos; null when unknown
  getVideoKey?: () => string | null;

  // Captions moved the way the service moves its own (Netflix's ad breaks), for files found online
  adjustCaptions?: (captions: Captions) => Captions;

  // Player container selector, required to render subtitles
  getSubsContainer: () => HTMLElement;

  // Selector for injecting the application icon in the player
  getSettingsButtonContainer: () => HTMLElement;

  // Selector for rendering extension settings inside the player container
  getSettingsContentContainer: () => HTMLElement;

  // Check if the service is on flight
  isOnFlight: () => boolean;

  // Init the service
  init: () => void;
}

export default Service;
