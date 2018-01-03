import m from "mithril"

import Home from "./pages/home"
import Decks from "./pages/decks"
import GameHost from "./pages/game_host"
import GamePlayer from "./pages/game_player"

m.route(document.getElementById("app"), "/", {
  "/": Home,
  "/decks": Decks,
  "/games/:game_id/host/:host_id": GameHost,
  "/games/:game_id/play/:player_id": GamePlayer
})
