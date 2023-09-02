import { parse } from "subtitle";

import Service from "./service";

class ServiceStub implements Service {
  public init(): void {
    throw new Error("Not Implimented streaming service");
  }

  public async getSubs() {
    throw new Error("Not Implimented streaming service");
    return parse("");
  }

  public getSubsContainer() {
    throw new Error("Not Implimented streaming service");
    return window.document.body;
  }

  public getSettingsButtonContainer() {
    throw new Error("Not Implimented streaming service");
    return window.document.body;
  }

  public getSettingsContentContainer() {
    throw new Error("Not Implimented streaming service");
    return window.document.body;
  }

  public isOnFlight() {
    throw new Error("Not Implimented streaming service");
    return false;
  }
}

export default ServiceStub;
