// LightWidget.tsx
import React from 'react';
import { lightEntity } from './types';
import Icon from '@mdi/react';
import { mdiLightbulb, mdiLightbulbOn } from '@mdi/js';

export const LightWidget = ({ 
    entity, 
    toggleLight, 
    setBrightness 
}: { 
    entity: lightEntity, 
    toggleLight: (id: string) => void, 
    setBrightness: (id: string, brightness: number) => void 
}) => (
    <div 
        style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }} 
        className={`${entity.state === 'on' ? 'bg-green-500/50 hover:bg-green-700' : 'bg-red-500/50 hover:bg-red-700'}`}
    >
        <button 
            className={`py-2 px-4 font-bold rounded ${entity.state === 'on' ? 'bg-green-500/90 hover:bg-green-700' : 'bg-red-500/80 hover:bg-red-700'} text-white`}
            onClick={() => toggleLight(entity.entity_id)}
            style={{ 
                flex: 1, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            <Icon 
                path={entity.state === 'on' ? mdiLightbulbOn : mdiLightbulb} 
                size={1} 
                color="white" 
                style={{ marginRight: '10px' }} 
            />
            {entity.attributes.friendly_name}
        </button>
        {entity.state === 'on' && (
            <>
                <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={entity.attributes.brightness || 0} 
                    onChange={(e) => setBrightness(entity.entity_id, Number(e.target.value))} 
                    style={{ 
                        flex: 1, 
                        width: '80%', 
                        marginTop: '10px' 
                    }}
                />
            </>
        )}
    </div>
);

export default LightWidget;