import { applyMiddleware, compose, createStore } from "redux"
import io from "socket.io-client"

import reducer from "./reducer"
import { sessionStorageUpdater } from "./sessionStore"
import socketReceiver from "./socketReceiver"
import socketSender from "./socketSender"

const socket = io("http://localhost:3000")

const sender = socketSender(socket)
const receiver = socketReceiver(socket)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(sender, sessionStorageUpdater)))
receiver.subscribe(store.dispatch)

export default store
