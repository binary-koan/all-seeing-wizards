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

export default function socket({ params, channels, on, disableRedraw }) {
  let state = LOADING
  const cable = ActionCable.createConsumer(`${BASE_SOCKET_URL}?${buildQueryString(params)}`)
  const subscriptions = {}

  function defineStateGetters(object) {
    STATES.forEach(expectedState => {
      Object.defineProperty(object, expectedState, {
        get: () => state == expectedState
      })
    })

    return object
  }

  function sendEvent({ event, subscription, channel, data, forceRedraw }) {
    if (on[event]) {
      const result = on[event](data, { subscription, channel })

      if (!disableRedraw) {
        Promise.resolve(result).then(() => m.redraw())
      }
    } else if (forceRedraw) {
      m.redraw()
    }
  }

  channels.forEach(channel => {
    let subscription = cable.subscriptions.create(channel, {
      connected() {
        state = CONNECTED
        sendEvent({ event: "connected", data: subscription, subscription, channel, forceRedraw: true })
      },

      disconnected() {
        state = DISCONNECTED
        sendEvent({ event: "disconnected", data: subscription, subscription, channel, forceRedraw: true })
      },

      rejected() {
        state = REJECTED
        sendEvent({ event: "rejected", channel, forceRedraw: true })
      },

      received(data) {
        if (data && data.event) {
          sendEvent({ event: data.event, subscription, channel, data })
        } else {
          sendEvent({ event: "unknown", subscription, channel, data })
        }
      }
    })
  })

  return defineStateGetters({
    disconnect: cable.disconnect.bind(cable)
  })
}
