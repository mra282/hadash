'use client';
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import LightWidget, { lightEntity } from './widgets/LightWidget';
import TemperatureWidget from './widgets/TemperatureWidget';
import { ClockWidget } from './widgets/ClockWidget';
import { WeatherHomeEntity, ForecastWidget } from './widgets/ForecastWidget';
import { useHomeAssistantConnection } from './services/homeassistant';
import { callService } from 'home-assistant-js-websocket';
import { tabs } from './dashboard/tabs';

const Dashboard: React.FC = () => {
  const { connection, entities } = useHomeAssistantConnection();

  useEffect(() => {
    document.body.style.backgroundImage = `url('/backgrounds/clear.png')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat'; // Prevent repeating
    document.body.style.height = '100vh'; // Fill the screen
  }, []);

  
  const lightEntities = Object.keys(entities).filter((key) => key.startsWith('light.'));
    
  const toggleLight = async (entityId: string) => {
    if (connection) {
      await callService(connection, 'homeassistant', 'toggle', { entity_id: entityId });
    }
  };

  const setBrightness = async (entityId: string, brightness: number) => {
    if (connection) {
      await callService(connection, 'light', 'turn_on', { entity_id: entityId, brightness });
    }
  };

  const [activeTab, setActiveTab] = useState(tabs[0].name);

return (
  <div>
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`py-2 px-4 font-bold ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-5 gap-4 p-6 bg-slate-500/60 backdrop-blur my-5 mx-6">
  {tabs.find((tab) => tab.name === activeTab)?.entities.map(({ entityId, widgetType, col = 1, row = 1 }) => {
    const entity = entityId ? entities[entityId] : null;

    let widget;
    switch (widgetType) {
      case 'LightWidget':
        widget = entity && <LightWidget key={entityId} entity={entity as lightEntity} toggleLight={toggleLight} setBrightness={setBrightness}/>;
        break;
      case 'TemperatureWidget':
        widget = entity && <TemperatureWidget key={entityId} entity={entity} />;
        break;
      case 'ForecastWidget':
        if (entity && 'forecast' in entity.attributes && 'temperature_unit' in entity.attributes && 'wind_speed_unit' in entity.attributes) {
          widget = <ForecastWidget key={entityId} entity={entity as WeatherHomeEntity} />;
        } else {
          console.error('Entity does not have necessary properties for WeatherHomeEntity');
        }
        break;
      case 'ClockWidget':
        widget = <ClockWidget key={entityId} />;
        break;
      default:
        widget = null;
    }

    if (!widget) return null;

    return (
      <div key={entityId} className="aspect-[2/1] overflow-clip" style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, position: 'relative' }}>
        <div className="rounded shadow">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {widget}
          </div>
        </div>
      </div>
    );
  })}
</div>
  </div>
);
};

export default Dashboard;