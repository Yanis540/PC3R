import {EventEmitter} from 'events';
// https://medium.com/@snassr/websockets-react-go-be6330ad547d
export default class Socket {
    ws: WebSocket;
    ee: EventEmitter<[never]>;
    connected:boolean;
    constructor(protocols?: string | string[] | undefined) {
        this.connected = false; 
        this.ws = new WebSocket(`ws://${process.env.SERVER_URL}/ws`,protocols);
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
    on(channel_name:string | symbol, fn: (...args: any[]) => void) {
        this.ee.on(channel_name, fn);
    };

    // off removes a function as an event consumer/listener.
    off(channel_name:string | symbol, fn: (...args: any[]) => void) {
        this.ee.removeListener(channel_name, fn);
    };

    // open handles a connection to a websocket.
    open() {
        this.connected = true
        this.ee.emit('connect');
    };
    
    // close to handles a disconnection from a websocket.
    close() {
        this.connected = false
        this.ee.emit('disconnect');
    };
    
    // error handles an error on a websocket.
    error(e:any) {
        console.log("websocket error: ", e);
    }

    // emit sends a message on a websocket.
    emit(name:string | symbol, data:string | ArrayBufferLike | Blob | ArrayBufferView) {
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }

    // message handles an incoming message and forwards it to an event listener.
    message(e: MessageEvent<any>) {
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        }
        catch(err) {
            this.ee.emit('error', err);
            console.log(Date().toString() + ": ", err);
        }
    }
}