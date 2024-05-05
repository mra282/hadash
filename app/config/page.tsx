'use client';
import React, { useState } from 'react';
import { useHomeAssistantConnection } from '../services/homeassistant';

const ConfigPage: React.FC = () => {
  const { entities } = useHomeAssistantConnection();
  const [tabs, setTabs] = useState([{ name: '', entities: [''], widgets: [''] }]);

  const entityIds = Object.keys(entities);

  const handleChange = (tabIndex: number, property: string, value: string, index?: number) => {
    const newTabs = [...tabs];
    if (index !== undefined) {
      newTabs[tabIndex][property][index] = value;
    } else {
      newTabs[tabIndex][property] = value;
    }
    setTabs(newTabs);
  };

  const handleAddTab = () => {
    setTabs([...tabs, { name: '', entities: [''], widgets: [''] }]);
  };

  const handleRemoveTab = (tabIndex: number) => {
    const newTabs = [...tabs];
    newTabs.splice(tabIndex, 1);
    setTabs(newTabs);
  };

  const handleAddEntity = (tabIndex: number) => {
    const newTabs = [...tabs];
    newTabs[tabIndex].entities.push('');
    setTabs(newTabs);
  };

  const handleRemoveEntity = (tabIndex: number, entityIndex: number) => {
    const newTabs = [...tabs];
    newTabs[tabIndex].entities.splice(entityIndex, 1);
    setTabs(newTabs);
  };

  const handleAddWidget = (tabIndex: number) => {
    const newTabs = [...tabs];
    newTabs[tabIndex].widgets.push('');
    setTabs(newTabs);
  };

  const handleRemoveWidget = (tabIndex: number, widgetIndex: number) => {
    const newTabs = [...tabs];
    newTabs[tabIndex].widgets.splice(widgetIndex, 1);
    setTabs(newTabs);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save the tabs state to the tabs.json file
  };

  return (
  <div className="p-6 bg-slate-500/60 backdrop-blur my-5 mx-6">
    <form onSubmit={handleSubmit} className="space-y-4">
      {tabs.map((tab, tabIndex) => (
        <div key={tabIndex} className="space-y-2">
          <input
            type="text"
            name="name"
            value={tab.name}
            onChange={(e) => handleChange(tabIndex, 'name', e.target.value)}
            placeholder="Tab name"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
          {tab.entities.map((entity, entityIndex) => (
            <div key={entityIndex} className="flex items-center space-x-2">
              <input
                type="text"
                name="entity"
                value={entity}
                onChange={(e) => handleChange(tabIndex, 'entities', e.target.value, entityIndex)}
                list="entityIds"
                placeholder="Entity ID"
                className="flex-grow px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <button type="button" onClick={() => handleRemoveEntity(tabIndex, entityIndex)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                Remove Entity
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddEntity(tabIndex)} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Add Entity
          </button>
          {tab.widgets.map((widget, widgetIndex) => (
            <div key={widgetIndex} className="flex items-center space-x-2">
              <input
                type="text"
                name="widget"
                value={widget}
                onChange={(e) => handleChange(tabIndex, 'widgets', e.target.value, widgetIndex)}
                placeholder="Widget type"
                className="flex-grow px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <button type="button" onClick={() => handleRemoveWidget(tabIndex, widgetIndex)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                Remove Widget
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddWidget(tabIndex)} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Add Widget
          </button>
          <button type="button" onClick={() => handleRemoveTab(tabIndex)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
            Remove Tab
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddTab} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
        Add Tab
      </button>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Save
      </button>
    </form>
  </div>
);
};

export default ConfigPage;