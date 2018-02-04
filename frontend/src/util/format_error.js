export default function formatError({ message }) {
  try {
    const details = JSON.parse(message)
    const error = details.error || "Unknown Error"
    const trace = (details.traces["Application Trace"] || []).map(line => line.trace).join("\n")

    return {
      message: `${details.status} ${error}`,
      exception: `${details.exception}\n${trace}`
    }
  } catch(_) {
    return {
      message: message
    }
  }
}
