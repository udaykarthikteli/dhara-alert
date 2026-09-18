import { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { ThemeContext } from '../context/ThemeContext';

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export const useSocket = () => {
  const [data, setData] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socket.on('connect', () => console.log('Socket connected'));
    socket.on('sensor', payload => {
      setData(payload);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return data;
};
