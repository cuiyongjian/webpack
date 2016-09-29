export default {
  getCookie (name) {
    let cookieName = encodeURIComponent(name) + '='
    let cookieStart = document.cookie.indexOf(cookieName),
    let cookieValue = null

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }
    return cookieValue
  }
}
