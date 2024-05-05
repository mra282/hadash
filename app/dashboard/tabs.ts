export const tabs =[
    {
        name: 'Living Room',
        entities: [
            {widgetType: 'ClockWidget', col: 2, row: 2, colOffset: 0, rowOffset: 0},
            {entityId: 'weather.home', widgetType: 'ForecastWidget', col: 2, row: 2, colOffset: -2, rowOffset: 2},
            {entityId: 'sensor.living_room_temperature', widgetType: 'TemperatureWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.table_lamp_door', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.sconce', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
        ],
    },
    {
        name: 'Train Room',
        entities: [
            {entityId: 'light.train_sitting_area', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.train_table_stairs', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.train_table_window', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.train_table_middle', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
        ],
    },
    {
        name: 'Master Bedroom',
        entities: [
            {entityId: 'light.reading', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.bedroom_master', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
        ],
    },
    {
        name: 'Office',
        entities: [
            {entityId: 'weather.home', widgetType: 'ForecastWidget', col: 2, row: 2, colOffset: 0, rowOffset: 0},
            {entityId: 'sensor.office_motion_temperature', widgetType: 'TemperatureWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.nanoleaf', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
            {entityId: 'light.wled_master', widgetType: 'LightWidget', col: 1, row: 1, colOffset: 0, rowOffset: 0},
        ]
    }
]