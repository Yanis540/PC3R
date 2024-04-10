import { WS_SERVER_URL } from '@/env';
import {EventEmitter} from 'events';
// https://medium.com/@snassr/websockets-react-go-be6330ad547d
export default class Socket {
    ws?: WebSocket;
    ee: EventEmitter<[never]>;
    connected:boolean;
    protocols ?: string | string[]
    private reconnectAttempts: number = 0;
    private token ?:string ; 
    private readonly maxReconnectAttempts: number = 100; // Nombre maximum de tentatives de reconnexion
    constructor(token : string) {
        this.connected = false; 
        this.token = token 
        // passig headers: https://stackoverflow.com/questions/4361173/http-headers-in-websockets-client-api
        this.ws = new WebSocket(`${WS_SERVER_URL}?Authorization=Bearer ${this.token}`);
        this.ee = new EventEmitter();
        // attach message function as event listener for incoming websocket messages.
        this.ws.onmessage = this.message.bind(this);
        // attach open function tas event listener on websocket connections.
        this.ws.onopen = this.open.bind(this);
        // attache close function as listener on websocket disconnections.
        this.ws.onclose = this.close.bind(this);
        // attache error function as listener on websocket errors.
        this.ws.onerror = this.error.bind(this);
    };

    // on adds a function as an event consumer/listener.
    on(event:ReceiveEvent | symbol, fn: (...args: any[]) => void) {
        this.ee.on(event, fn);
    };

    // off removes a function as an event consumer/listener.
    off(event:string | symbol, fn: (...args: any[]) => void) {
        this.ee.removeListener(event, fn);
    };

    // open handles a connection to a websocket.
    open() {
        this.connected = true
        this.ee.emit('connect');
    };
    
    // close to handles a disconnection from a websocket.
    close() {
        this.connected = false
        if (this.ws?.readyState  === 1) {
            // notifier le serveur que le client se détache 
            const message = JSON.stringify({Event:"close", Data:"Closing"});
            this.ws!?.send(message);
       }
        this.ee.emit('disconnect');
    };
    
    // error handles an error on a websocket.
    error(e:any) {
        console.warn("websocket error: ", e);
         // Tentative de reconnexion après un certain délai en cas d'erreur
        this.ws = undefined;
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            // Essayez de vous reconnecter
            setTimeout(() => {
                if (this.connected == true)
                    return; 
                console.log("Attempting to reconnect...");
                this.reconnectAttempts++;
                this.ws = new WebSocket(`${WS_SERVER_URL}?Authorization=Bearer ${this.token}`);
                this.ws.onmessage = this.message.bind(this);
                this.ws.onopen = this.open.bind(this);
                this.ws.onclose = this.close.bind(this);
                this.ws.onerror = this.error.bind(this);
            }, 3000); // Attendez 3 secondes avant de réessayer
        } else {
            console.log("Maximum reconnection attempts reached. Stopping further reconnection attempts.");
            // Vous pouvez également émettre un événement d'erreur ici si nécessaire.
        }

    }

    // emit sends a message on a websocket.
    emit(event:EmitEvent | symbol, data:string | ArrayBufferLike | Blob | ArrayBufferView|Object) {
        const message = JSON.stringify({Event:event, Data:data});
        this.ws!?.send(message);
    }

    // message handles an incoming message and forwards it to an event listener.
    message(e: MessageEvent<any>) {
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.event, message.data);
        }
        catch(err) {
            this.ee.emit('error', err);
            console.log(Date().toString() + ": ", err);
        }
    }
}