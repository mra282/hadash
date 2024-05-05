'use client';
import { useState, useEffect } from 'react';
import {
  Connection,
  createLongLivedTokenAuth,
  createConnection,
  subscribeEntities,
  HassEntities,
} from 'home-assistant-js-websocket';

export const useHomeAssistantConnection = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [entities, setEntities] = useState<HassEntities>({});

  useEffect(() => {
  async function connect() {
    const hassUrl = process.env.NEXT_PUBLIC_HASS_URL;
    const token = process.env.NEXT_PUBLIC_HASS_TOKEN;

    if (hassUrl && token) {
      const auth = createLongLivedTokenAuth(hassUrl, token);
      const conn = await createConnection({ auth });
      setConnection(conn);
      subscribeEntities(conn, (ents) => setEntities(ents));
    } else {
      console.error('hassUrl or token is undefined');
    }
  }
  connect();
}, []);

  return { connection, entities };
};