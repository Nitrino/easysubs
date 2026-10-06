import { Captions, TSubsTrack } from "@src/models/types";

interface Service {
  name: string;

  // Getting subtitles from a service
  getSubs: (language: string) => Promise<Captions>;

  // The subtitle tracks of the current video that getSubs() can load, for the second subtitle line. Services that
  // read each line off the page have none: their second line is translated.
  getSubsTracks?: () => Promise<TSubsTrack[]>;

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
