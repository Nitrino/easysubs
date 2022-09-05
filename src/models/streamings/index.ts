import { createStore, createEffect } from 'effector'
import type Service from '@/streamings/service'
import ServiceStub from '@/streamings/ServiceStub'

export const $streaming = createStore<Service>(new ServiceStub())

export const fetchCurrentStreamingFx = createEffect<void, Service>()
