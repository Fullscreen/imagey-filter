# What is this?
`imagey` is an Angular filter that replaces links to images in text, with `<img>`
tags, similar to how Angular's [linky filter](http://docs.angularjs.org/api/ngSanitize/filter/linky)
replaces links in text with `<a>` tags.

Basically, it turns this:

```
Check out this awesome google logo: https://www.google.com/images/srpr/logo11w.png
```

into this:

```
Check out this awesome google logo: <img src="https://www.google.com/images/srpr/logo11w.png">
```

## How do I get this awesome code?
Use Bower, and, inside your project run `bower install --save imagey-filter`.

## Okay, now what?
Add it to your Angular dependencies:

``` javascript
var myApp = angular.module('myApp', ['imagey'])
```

### In a template
``` html
<div>
  <!-- To just turn image links into image tags -->
  {{ myContent | imagey }}

  <!-- To turn links into anchor tags, and image links into image tags -->
  {{ myContent | linky | imagey }}
</div>
```

### In Javascript land
``` javascript
// Pull in the filter service
myApp.controller('fooCtrl', function($scope, $filter) {
  // Grab a reference to imagey
  var imagey = $filter('imagey')

  // And run it on some text
  $scope.withImages = imagey(plaintext)
})
```
