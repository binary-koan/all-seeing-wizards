import m from "mithril"

import Home from "./pages/home"
import Decks from "./pages/decks"
import Game from "./pages/game"

m.route(document.getElementById("app"), "/", {
  "/": Home,
  "/decks": Decks,
  "/games/:id": Game
})
