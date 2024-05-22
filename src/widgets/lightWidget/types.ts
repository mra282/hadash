import { HassEntity } from 'home-assistant-js-websocket';

export type lightEntity = HassEntity & {
    attributes: HassEntity['attributes'] & {
      brightness: number;
      friendly_name: string;
      color_temp: number;
      xy_color: [number, number];
    };
  };