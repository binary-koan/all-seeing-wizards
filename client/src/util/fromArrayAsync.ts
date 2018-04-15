import xs, { Stream } from "xstream"

export default function fromArrayAsync<T>(arr: T[]): Stream<T> {
  return xs.create({
    start(listener) {
      setTimeout(() => {
        for (const item of arr) {
          listener.next(item)
        }
      })
    },

    stop() {
      /* noop */
    }
  })
}
