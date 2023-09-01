import { Captions } from "@src/models/types";

interface Service {
  // Getting subtitles from a service
  getSubs: (language: string) => Promise<Captions>;

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
