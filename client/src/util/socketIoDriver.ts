// tslint:disable-next-line:no-submodule-imports
import { adapt } from "@cycle/run/lib/adapt"
import xs, { Stream } from "xstream"

export interface SocketIOSource {
  get: <T>(eventName: string) => Stream<T>
  dispose: () => any
}

export function makeSocketIODriver(socket: SocketIOClient.Socket) {
  function get(eventName: string) {
    const socketStream$ = xs.create({
      start(listener) {
        this.eventListener = (arg: any) => {
          console.log(`received ${eventName}`, arg)
          listener.next(arg)
        }

        socket.on(eventName, this.eventListener)
      },
      stop() {
        socket.removeListener(eventName, this.eventListener)
      }
    })

    return adapt(socketStream$)
  }

  function publish(messageType: string, message: any) {
    console.log(`publishing ${messageType}`, message)
    socket.emit(messageType, message)
  }

  return function socketIODriver(
    events$: Stream<{ messageType: string; message: any }>
  ): SocketIOSource {
    events$.addListener({
      next: event => publish(event.messageType, event.message)
    })

    return {
      get,
      dispose: () => socket.close()
    }
  }
}
