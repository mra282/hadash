import React, { useEffect, useState } from 'react';
import Layout from '@/app/layout';
import LightWidget from '@/widgets/lightWidget/widget';
import { lightEntity } from '@/widgets/lightWidget/types';
import { TemperatureWidget } from '@/widgets/temperatureWidget/widget';
import { ClockWidget } from '@/widgets/clockWidget/widget';
import { WeatherHomeEntity, ForecastWidget } from '@/widgets/forecastWidget/widget';
import { useHomeAssistantConnection } from '@/services/homeassistant';
import { callService } from 'home-assistant-js-websocket';
import tabs from '@/dashboards/homeassistant.json';

const IndexPage: React.FC = () => {
  const { connection, entities } = useHomeAssistantConnection();

  useEffect(() => {
    document.body.style.backgroundImage = `url('/backgrounds/clear.png')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat'; // Prevent repeating
    document.body.style.height = '100vh'; // Fill the screen
  }, []);
    
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
  <Layout>
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
        widget = entity && <LightWidget entity={entity as lightEntity} toggleLight={toggleLight} setBrightness={setBrightness}/>;
        break;
      case 'TemperatureWidget':
        widget = entity && <TemperatureWidget entity={entity} />;
        break;
      case 'ForecastWidget':
        if (entity && 'forecast' in entity.attributes && 'temperature_unit' in entity.attributes && 'wind_speed_unit' in entity.attributes) {
          widget = <ForecastWidget entity={entity as WeatherHomeEntity} />;
        } else {
          console.error('Entity does not have necessary properties for WeatherHomeEntity');
        }
        break;
      case 'ClockWidget':
        widget = <ClockWidget />;
        break;
      default:
        widget = null;
    }

    if (!widget) return <React.Fragment key={entityId} />;

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
  </Layout>
);
};

export default IndexPage;