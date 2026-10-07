import { FC } from "react";
import { useUnit } from "effector-react";

import { $nextEpisodeOffer, nextEpisodeAccepted, nextEpisodeDismissed } from "@src/models/foundSubs";
import { FOUND_SOURCE_TITLES, foundName } from "@src/utils/foundSubsText";

// In the player when an episode starts after one with a found file, and Next episode is set to Ask
export const NextEpisodePrompt: FC = () => {
  const offer = useUnit($nextEpisodeOffer);
  if (!offer) return null;
  const { result, episodeOf, role } = offer;

  return (
    <div className="es-next-episode" role="status" onClick={(event) => event.stopPropagation()}>
      <span>
        S{episodeOf.season} E{episodeOf.episode}: load {foundName(result)} from {FOUND_SOURCE_TITLES[result.source]}
        {role === "second" ? " as the second line" : ""}?
      </span>
      <button
        type="button"
        className="es-found__button es-found__button--primary"
        onClick={() => nextEpisodeAccepted()}
      >
        Load
      </button>
      <button type="button" className="es-found__button" onClick={() => nextEpisodeDismissed()}>
        Not now
      </button>
    </div>
  );
};
