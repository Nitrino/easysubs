import { type NodeList } from "subtitle";

import { type Service } from "./service";

class ServiceStub implements Service {
  name = "stub";

  public init(): void {
    throw new Error("Not Implimented streaming service");
  }

  public async getSubs(): Promise<NodeList> {
    throw new Error("Not Implimented streaming service");
    // return parseSync("");
  }

  public getSubsContainer(): HTMLElement {
    throw new Error("Not Implimented streaming service");
    // return window.document.body;
  }

  public getSettingsButtonContainer(): HTMLElement {
    throw new Error("Not Implimented streaming service");
    // return window.document.body;
  }

  public getSettingsContentContainer(): HTMLElement {
    throw new Error("Not Implimented streaming service");
    // return window.document.body;
  }

  public isOnFlight(): boolean {
    throw new Error("Not Implimented streaming service");
    // return false;
  }
}

export default ServiceStub;
