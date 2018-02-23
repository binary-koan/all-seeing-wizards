import "./home.css"

import m from "mithril"
import FatalError from "../components/fatal_error"
import request from "../util/request"
import formatError from "../util/format_error";

export default class Home {
  createGame() {
    request("/games", { method: "POST" }).then(response => {
      m.route.set(`/games/${response.game.id}/host/${response.game.host.id}`)
    }).catch(e => this.error = formatError(e))
  }

  joinGame() {
    const gameId = prompt("Game ID")
    request(`/games/${gameId}/sessions`, { method: "POST" }).then(response => {
      m.route.set(`/games/${response.game.id}/play/${response.player.id}`)
    }).catch(e => this.error = formatError(e))
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
