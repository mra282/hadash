// TemperatureWidget.tsx
import React from 'react';

const getBackgroundColor = (temp: number) => {
  if (temp > 80) return 'bg-red-500';
  if (temp < 60) return 'bg-blue-500';
  if (temp < 70) return 'bg-green-500';
  if (temp < 75) return 'bg-yellow-500';
  return 'bg-orange-500';
};

const TemperatureWidget = ({ entity }: { entity: any }) => {
  const temp = parseFloat(entity.state);
  const backgroundColor = getBackgroundColor(temp);

  return (
    <div 
      className={`font-bold rounded text-white flex items-center justify-center ${backgroundColor}`}
      style={{ width: '100%', height: '100%', fontSize: '2em' }}>
      {temp}°F
    </div>
  );
};

export default TemperatureWidget;