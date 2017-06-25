export const downloadUrl = (url, filename) => {
  if (
    !/(iP)/g.test(navigator.userAgent) &&
    (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
      navigator.userAgent.toLowerCase().indexOf('safari') > -1)
  ) {
    const link = document.createElement('a')
    link.href = url
    link.rel = 'noopener'
    link.setAttribute('target', '_blank')

    if (link.download !== undefined) {
      filename = filename || url.substring(url.lastIndexOf('/') + 1, url.length)
      link.download = filename
    } else {
      link.setAttribute('download', true)
    }

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      link.dispatchEvent(event)
      return true
    }
  }

  if (url.indexOf('?') === -1 && url.indexOf('data:') === -1) {
    url += '?download'
  }

  const win = window.open('about:blank')
  win.opener = null
  win.location = url

  return true
}
