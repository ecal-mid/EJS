**EJS**
---
Simple javascript framework.

Installation:

include:
```html
<script src="EJS.js"></script>
```
or
```html
<script src="EJS.min.js"></script>
```

Example:

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="EJS.min.js"></script>
    <title>Website title</title>
</head>
<body>
    <h1>Title 1</h1>
</body>
</html>
```
--
EJS is based on two main objects: EJSList and EJSElement

### get('.class-name')

A global function 'get' is exposed when including the library in an HTML document.

#### Example:

```js
// Selecting elements
// This returns a EJSList
get('.class-name')
```

Both of these objects have these properties:

on: Attach event to the selected elements
### Example: 

```js
get('.class-name').on('click', function (event) {
    // This is an EJSElement
    // Here we are adding a class on the element that has been clicked
    this.addClass('.new-class-name')
})
```

off: Remove event from the selected elements
### Example: 

```js
get('.class-name').off('click', clickHandler)
```

addClass: Add a class to the selected elements
### Examples:

```js
// Here we are adding a class on the selected elements
get('.class-name').addClass('new-class-name')
```

removeClass: Remove a class from the selected elements
### Example:

```js
// Here we are removing a class from the selected elements
get('.class-name').removeClass('class-name-to-remove')
```

toggleClass: Toggle a class on the selected elements
### Example:

```js
// Here we are toggling a class on the selected elements
get('.class-name').toggleClass('class-name-to-toggle')
```

setStyle: Set a custom style on the selected elements
### Example:

```js
// Here we are adding custom css properties to the selected elements
get('.class-name').setStyle({
    background: 'red',
    border: 'solid blue 1px'
})
```

---
## EJSList properties:

forEach: Loop through all selected elements
### Example:

```js
// We get the current element and his index through the parameters passed to the handler function
get('.class-name').forEach(function (element, index) {
    element.addClass('new-class-name-' + index)
})
```

---
## EJSElement properties:

elem: Retrieve the base html element (this is a getter -> read only)
html: Get and set the innerHTML of the element

Install dependencies:
```
yarn

// or

npm i
```
Develop:
```
yarn dev

// or

npm run dev
```
