import "./home.css"

import m from "mithril"
import FatalError from "../components/fatal-error"
import request from "../util/request"

export default function Home(vnode) {
  function handleError(e) {
    try {
      const details = JSON.parse(e.message)
      const error = details.error || "Unknown Error"
      const trace = (details.traces["Application Trace"] || []).map(line => line.trace).join("\n")

      vnode.state.error = {
        message: `${details.status} ${error}`,
        exception: `${details.exception}\n${trace}`
      }
    } catch(_) {
      vnode.state.error = {
        message: e.message
      }
    }
  }

  function createGame() {
    request("/games", { method: "POST" }).then(response => {
      m.route.set(`/games/${response.game.id}/host/${response.host.id}`)
    }).catch(handleError)
  }

  function joinGame() {
    const gameId = prompt("Game ID")
    request(`/games/${gameId}/sessions`, { method: "POST" }).then(response => {
      m.route.set(`/games/${response.player.game_id}/play/${response.player.id}`)
    }).catch(handleError)
  }

  function view() {
    return [
      vnode.state.error && m(FatalError, {
        title: "An unexpected error occurred! Try reloading the page",
        message: vnode.state.error.message,
        exception: vnode.state.error.exception
      }),
      m(".home-buttons", [
        m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" }),
        m("button", { onclick: createGame }, "Create Game"),
        m("button", { onclick: joinGame }, "Join Game")
      ])
    ]
  }

  return { view }
}
