# CK Editor implementation with Angularjs

## Step 1

Create a proper html file 

## Step 2

Include below listed required js file with the html 

#### Core JS  Files

`<script src="angular.min.js"></script>`

#### Library for CK Editor

`<script src="ckeditor/ckeditor.js"></script>`,

#### Directive of angularjs

`<script src="ckeditor/angular-ckeditor.js"></script>`

## Step 3

### Html ###
1) Add Module name with `<body>` tag of you html

  Like: `<body data-ng-app="editor-app">`
  
2) Include a container with a controller name where editor will be implemented

  Like: `<div data-ng-controller="CkeditorCtroller">`
  
3) Include an another container within the previous container which actually hold the editor instence

  Like: `<div ckeditor="options" ng-model="content" ></div>`
  
  Here `ckeditor` attribute of the previous container  is a angularjs directive which defined in `ckeditor/angular-ckeditor.js`

### Script ###

1) Initialize a anguler module object with the directive `ckeditor`

  Like: `var app = angular.module("editor-app", ['ckeditor']);`
  
2) Define the contrller and attach with module 

  Like: `app.controller('CkeditorCtroller', ['$scope', function ($scope) {}])`
  
3) Within controller , add the options of ckeditor

  like :  `$scope.options = {language: 'en',allowedContent: true,entities: false  };`
  
  There are verious type of options within ckeditor library

##Example ##

You can find the example in "Demo" folder included in this project

  
  
