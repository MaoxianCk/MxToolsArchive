export function doCopy(text, success) {
  navigator.clipboard.writeText(text).then(() => {
    success && success()
  })
}