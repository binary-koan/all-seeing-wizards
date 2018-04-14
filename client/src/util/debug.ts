import { Stream } from "xstream"

export function logStream<T>(prefix: string, stream: Stream<T>): Stream<T> {
  return stream.map(value => {
    // tslint:disable-next-line:no-console
    console.log(prefix, value)
    return value
  })
}
