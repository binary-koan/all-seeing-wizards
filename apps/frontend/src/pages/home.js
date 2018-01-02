import m from "mithril"
import ActionCable from "actioncable"

export default function Home(vnode) {
  function createGame() {
    m.request({ method: "POST", url: "http://localhost:3000/games" }).then(response => {
      window.cable = ActionCable.createConsumer("ws://localhost:3000/cable")
      cable.subscriptions.create("Game", {
        connected() {
          console.log("connected!")
        },

        disconnected() {
          console.log("Disconnected!")
        },

        rejected() {
          console.log("Rejected!")
        }
      })
    }).catch(e => console.log(e))
  }

  function view() {
    return [
      m("button", { onclick: createGame }, "Create Game"),
      m("button", "Join Game"),
      m("a[href=/decks]", { oncreate: m.route.link }, "View Decks")
    ]
  }

  return { view }
}
