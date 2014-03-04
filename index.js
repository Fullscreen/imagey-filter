(function(root) {
  var angular = (typeof require === 'function') ? require('angular') : root.angular

  angular.module('imagey', []).filter('imagey', function() {
    //                   Detect if we're in an anchor
    //                   |                          Domain
    //                   |                            |           TLD
    //                   |                            |            |            One or more non ' or " characters
    //                   |                            |            |            |           Match trailing image extension
    //                   |                            |            |            |           |
    //                   \/                           \/           \/           \/          \/
    var IMG_URL_REGEX = /(href=['"]?)?https?:\/\/(?:[0-9a-z\-]+\.)+[a-z]{2,6}\/(?:[^'"]+)\.(?:jpe?g|gif|png)/g

    // Turn http:// urls into a proxied https:// url using Google's image proxy
    function proxify(href) {
      var prefix, suffix, encodedHref

      if (href && href.substring(0, 5) == 'http:') {
        prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url="
        suffix = "&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*"
        encodedHref = encodeURIComponent(href)
        return prefix + encodedHref + suffix
      } else {
        return href
      }
    }

    // Takes a plaintext input, and rewrites URLs that look like image references
    // into IMG tags, a la `linkey`
    return function(input) {
      if (!input) { return input }

      // If we have an href, skip the link, else swap it out for an image tag
      return input.replace(IMG_URL_REGEX, function(match, href) {
        return (href) ? match : "<img src=\"" + proxify(match) + "\">"
      })
    }
  })
})(this)
