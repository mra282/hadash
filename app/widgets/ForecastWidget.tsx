import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { HassEntity  } from 'home-assistant-js-websocket';

export type WeatherHomeEntity = HassEntity & {
  attributes: HassEntity['attributes'] & {
    forecast: {
      datetime: string;
      condition: string;
      temperature: number;
      humidity: number;
      wind_speed: number;
      wind_speed_unit: string;
      templow: number;
    }[];
    temperature_unit: string;
    wind_speed_unit: string;
  };
};

export const ForecastWidget = ({ entity }: {entity: WeatherHomeEntity}) => {
  const today = entity.attributes.forecast[0];
  const forecast = entity.attributes.forecast.slice(1);

  return (
    <div className="shadow-md rounded-lg p-2 flex flex-col bg-slate-900/60" style={{ width: '100%', height: '100%', fontSize: '2em' }}>
      <div className="flex justify-between items-center">
        <p className="text-xs">{dayjs(today.datetime).format('dddd, MMMM D, YYYY')}</p>
      </div>
      <div className="flex justify-between items-start">
        <Image 
          src={`/images/icons/weather/${today.condition}.png`} 
          alt={today.condition} 
          width={96} // Add width
          height={96} // Add height
          className="w-24 h-24 m-auto" 
        />
        <ul className="text-right text-sm">
          <li>Temperature: {today.temperature}°{entity.attributes.temperature_unit}</li>
          <li>Humidity: {today.humidity}%</li>
          <li>Wind Speed: {today.wind_speed}{entity.attributes.wind_speed_unit}</li>
        </ul>
      </div>
      <div className="flex items-center mt-4">        
        <div className="ml-4 flex-grow flex flex-row justify-between text-sm">
          {forecast.map((data, index) => (
            <div key={index} className="flex flex-col items-center py-2">
              <p>{dayjs(data.datetime).format('MM/DD')}</p>
              <Image 
                src={`/images/icons/weather/${data.condition}.png`} 
                alt={data.condition} 
                width={24} // Add width
                height={24} // Add height
                className="w-6 h-6" 
              />
              <p>{data.templow}°/{data.temperature}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastWidget;