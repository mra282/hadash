import { Connection as HassConnection, HassEntities } from 'home-assistant-js-websocket';
import React from 'react';

export type Connection = HassConnection;

export type Entities = HassEntities;

export type WidgetType = 'LightWidget' | 'TemperatureWidget';

export type Tab = {
  entityId: string;
  widgetType: WidgetType;
  col: number;
  row: number;
  colOffset: number;
  rowOffset: number;
};