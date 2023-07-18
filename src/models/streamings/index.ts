import { createStore, createEffect } from "effector";
import type Service from "@src/streamings/service";
import ServiceStub from "@src/streamings/serviceStub";

export const $streaming = createStore<Service>(new ServiceStub());

export const fetchCurrentStreamingFx = createEffect<void, Service>();
