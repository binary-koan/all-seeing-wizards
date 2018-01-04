import m from "mithril"

export default function request(path, options = { method: "GET" }) {
  const url = path.includes("://") ? path : BASE_URL + path

  return m.request(Object.assign({ url }, options))
}
