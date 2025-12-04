import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RealTimeComGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any): void {
        console.log('Received message:', typeof(data) , data );

        if (data.text === 'ping')  {
            this.server.emit("message", JSON.stringify({ "text": "pong" }));
        }
        else if (data.text === 'pong') { 
            this.server.emit("message", JSON.stringify({ "text": "ping" }));
        }
        else {
            this.server.emit("message", "unknown command");
        }
    }

    // Example: broadcast every second
    broadcastInterval: NodeJS.Timeout;

    afterInit() {
        this.broadcastInterval = setInterval(() => {
            this.server.emit('message_interval', `WebSocket broadcast: ${new Date().toISOString()}`);
        }, 1000);
    }

    // Clean up interval on shutdown
    onModuleDestroy() {
        clearInterval(this.broadcastInterval);
    }
}