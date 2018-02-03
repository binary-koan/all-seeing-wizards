import "./home.css"

import m from "mithril"
import FatalError from "../components/fatal_error"
import request from "../util/request"

export default class Home {
  handleError(e) {
    try {
      const details = JSON.parse(e.message)
      const error = details.error || "Unknown Error"
      const trace = (details.traces["Application Trace"] || []).map(line => line.trace).join("\n")

      this.error = {
        message: `${details.status} ${error}`,
        exception: `${details.exception}\n${trace}`
      }
    } catch(_) {
      this.error = {
        message: e.message
      }
    }
  }

  createGame() {
    request("/games", { method: "POST" }).then(response => {
      m.route.set(`/games/${response.game.id}/host/${response.host.id}`)
    }).catch(e => this.handleError(e))
  }

  joinGame() {
    const gameId = prompt("Game ID")
    request(`/games/${gameId}/sessions`, { method: "POST" }).then(response => {
      m.route.set(`/games/${response.player.game_id}/play/${response.player.id}`)
    }).catch(e => this.handleError(e))
  }

  view() {
    return [
      this.error && m(FatalError, {
        title: "An unexpected error occurred! Try reloading the page",
        message: this.error.message,
        exception: this.error.exception
      }),
      m(".home-buttons", [
        m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" }),
        m("button", { onclick: () => this.createGame() }, "Create Game"),
        m("button", { onclick: () => this.joinGame() }, "Join Game")
      ])
    ]
  }
}
