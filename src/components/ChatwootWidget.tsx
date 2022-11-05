import { useEffect } from 'react'

const ChatwootWidget = () => {
  useEffect(() => {
    ;(function (d, t) {
      var BASE_URL = 'https://chat.vcborn.com'
      var g = d.createElement('script'),
        s = d.getElementsByTagName(t)[0]
      g.src = BASE_URL + '/packs/js/sdk.js'
      g.defer = true
      g.async = true
      s.parentNode.insertBefore(g, s)
      g.onload = function () {
        // @ts-ignore
        window.chatwootSDK.run({
          websiteToken: `n186k91Hgg1182WdjKUik7Ux`,
          baseUrl: BASE_URL,
        })
      }
    })(document, 'script')
  }, [])

  return null
}

export default ChatwootWidget
