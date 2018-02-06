import m from "mithril"
import ActionCable from "actioncable"

const LOADING = "loading"
const CONNECTED = "connected"
const DISCONNECTED = "disconnected"
const REJECTED = "rejected"
const STATES = [LOADING, CONNECTED, DISCONNECTED, REJECTED]

function buildQueryString(params) {
  return Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`)
}

export default function socket({ params, channel, on, disableRedraw }) {
  let state = LOADING
  const cable = ActionCable.createConsumer(`${BASE_SOCKET_URL}?${buildQueryString(params)}`)

  function defineStateGetters(object) {
    STATES.forEach(expectedState => {
      Object.defineProperty(object, expectedState, {
        get: () => state == expectedState
      })
    })

    return object
  }

  function sendEvent({ event, data, subscription, forceRedraw }) {
    if (on[event]) {
      const result = on[event](data, subscription)

      if (!disableRedraw) {
        Promise.resolve(result).then(() => m.redraw())
      }
    } else if (forceRedraw) {
      m.redraw()
    }
  }

  const subscription = cable.subscriptions.create(channel, {
    connected() {
      console.log("Socket connected")

      state = CONNECTED
      sendEvent({ event: "connected", subscription, forceRedraw: true })
    },

    disconnected() {
      console.log("Socket disconnected")

      state = DISCONNECTED
      sendEvent({ event: "disconnected", subscription, forceRedraw: true })
    },

    rejected() {
      console.log("Socket rejected")

      state = REJECTED
      sendEvent({ event: "rejected", forceRedraw: true })
    },

    received(data) {
      console.log("Socket received", data)

      if (data && data.event) {
        sendEvent({ event: data.event, data, subscription })
      } else {
        sendEvent({ event: "unknown", data, subscription })
      }
    }
  })

  return defineStateGetters({
    disconnect: cable.disconnect.bind(cable),
    perform: subscription.perform.bind(subscription)
  })
}
