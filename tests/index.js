var angular = require('angular')
  , assert = require('assert')  

// Define our module, and then fetch an injector instance
require('../index.js')
var inject = angular.injector(['ng', 'fs.imagey']).invoke


describe('The exuberant imageyFilter filter', function() {
  var input, output, imagey

  beforeEach(function() {
    inject(function (imageyFilter) { imagey = imageyFilter });
  })

  afterEach(function() {
    input = ''
    output = ''
  })

  it('should turn URLs that look like images into IMG tags', function() {
    // Standalone image HREF
    input  = 'https://www.google.com/logo11w.png'
    output = '<img src="https://www.google.com/logo11w.png">'
    assert.equal(imagey(input), output)
  })

  it('should ignore URLs that don\'t look like images', function() {
    input  = 'https://www.google.com/'
    output = 'https://www.google.com/'
    assert.equal(imagey(input), output)

    input  = 'https://www.google.com/somepage'
    output = 'https://www.google.com/somepage'
    assert.equal(imagey(input), output)

    input  = 'https://www.google.com/urlwithpng'
    output = 'https://www.google.com/urlwithpng'
    assert.equal(imagey(input), output)
  })

  it('should handle images in anchors', function() {
    // URL in HREF and anchor body
    input  = '<a href="https://www.google.com/logo11w.png">https://www.google.com/logo11w.png</a>'
    output = '<a href="https://www.google.com/logo11w.png"><img src="https://www.google.com/logo11w.png"></a>'
    assert.equal(imagey(input), output)

    // URL in HREF and anchor body (single quotes)
    input  = '<a href=\'https://www.google.com/logo11w.png\'>https://www.google.com/logo11w.png</a>'
    output = '<a href=\'https://www.google.com/logo11w.png\'><img src="https://www.google.com/logo11w.png"></a>'
    assert.equal(imagey(input), output)

    // URL as an anchor's HREF, but not actually in the anchor text
    input  = '<a href=\'https://www.google.com/logo11w.png\'></a>'
    output = '<a href=\'https://www.google.com/logo11w.png\'></a>'
    assert.equal(imagey(input), output)
  })

  it('should catch URLs embedded within text', function() {
    // Image link with bounding text
    input  = 'omghttps://www.google.com/logo11w.pngwords'
    output = 'omg<img src="https://www.google.com/logo11w.png">words'
    assert.equal(imagey(input), output)
  })

  it('should proxy non-https links through google\'s proxy', function() {
    input  = 'http://www.google.com/logo11w.png'
    output = '<img src="https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=http%3A%2F%2Fwww.google.com%2Flogo11w.png&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*">'
    assert.equal(imagey(input), output)
  })

  it('should match domains with numbers', function() {
    input = 'https://1.bp.blogspot.com/wowcat.jpg'
    output = '<img src="https://1.bp.blogspot.com/wowcat.jpg">'
    assert.equal(imagey(input), output)
  })

  it('should match nested paths', function() {
    input  = 'https://www.google.com/images/srp1r/logo11w.png'
    output = '<img src="https://www.google.com/images/srp1r/logo11w.png">'
    assert.equal(imagey(input), output)
  })

  it('should match URLs with query strings', function() {
    input  = 'https://secure.gravatar.com/avatar/224f077ce541f028790ce6e46fc5871c?size=80&default=https%3A%2F%2Fdashboard.heroku.com%2Fninja-avatar-48x48.png'
    output = '<img src="https://secure.gravatar.com/avatar/224f077ce541f028790ce6e46fc5871c?size=80&default=https%3A%2F%2Fdashboard.heroku.com%2Fninja-avatar-48x48.png">'
    assert.equal(imagey(input), output)
  })

  it('should match URLs with hashtags', function() {
    input  = 'https://secure.gravatar.com/avatar/224f077ce541f028790ce6e46fc5871c//.png'
    output = '<img src="https://secure.gravatar.com/avatar/224f077ce541f028790ce6e46fc5871c//.png">'
    assert.equal(imagey(input), output)
  })

  it('should make Sean Stavropoulos happy', function() {
    input  = 'https://www.3drealms.com/zerohour/images/zhbackground.bmp//.jpg'
    output = '<img src="https://www.3drealms.com/zerohour/images/zhbackground.bmp//.jpg">'
    assert.equal(imagey(input), output)
  })

  it('should match all sorts of numbers in URLs', function() {
    input  = 'https://fc00.deviantart.net/fs71/f/2011/216/b/9/jet_fighter_zero_2_by_3rdaxisdesign-d45i2t6.png'
    output = '<img src="https://fc00.deviantart.net/fs71/f/2011/216/b/9/jet_fighter_zero_2_by_3rdaxisdesign-d45i2t6.png">'
    assert.equal(imagey(input), output)
  })
})
