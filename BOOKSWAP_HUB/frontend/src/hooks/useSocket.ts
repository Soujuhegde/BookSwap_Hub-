import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useSocket = (exchangeId?: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io(SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: true,
        });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            setIsConnected(true);
            if (exchangeId) {
                socketInstance.emit('joinConversation', { exchangeId });
            }
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            if (exchangeId) {
                socketInstance.emit('leaveConversation', { exchangeId });
            }
            socketInstance.disconnect();
        };
    }, [exchangeId]);

    return { socket, isConnected };
};
