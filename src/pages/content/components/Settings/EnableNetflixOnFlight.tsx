import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $netflixOnFlightEnabled, netflixOnFlightEnabledChanged } from "@src/models/settings";

export const EnableNetflixOnFlight: FC = () => {
  const [netflixOnFlightEnabled, handlenetflixOnFlightEnabled] = useUnit([
    $netflixOnFlightEnabled,
    netflixOnFlightEnabledChanged,
  ]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Netflix on flight</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={netflixOnFlightEnabled} onChange={handlenetflixOnFlightEnabled} />
      </div>
    </div>
  );
};
