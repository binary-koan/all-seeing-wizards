import xs from "xstream"

export default function timedEvents<T>(events: Array<{ event: T; duration: number }>): xs<T> {
  return xs.create({
    start(listener) {
      this.fireNext = (index: number) => {
        listener.next(events[index].event)

        if (index < events.length - 1) {
          this.timeout = setTimeout(this.fireNext.bind(this, index + 1), events[index].duration)
        } else {
          listener.complete()
        }
      }

      if (events.length) {
        this.fireNext(0)
      }
    },

    stop() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  })
}
