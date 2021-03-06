**EJS**
---
Simple javascript framework.
[Working examples](https://ecal-mid.github.io/EJS/)

## Installing

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
## Global property

EJS is based on two main objects: EJSList and EJSElement

### Get

A global function 'get' is exposed when including the library in an HTML document.

#### Example:

```js
// Selecting elements
// This returns a EJSList
get('.class-name')
```

## EJSList & EJSElement properties:

### On
Attach event to the selected elements

#### Example: 

```js
get('.class-name').on('click', function (event) {
    // This is a EJSElement
    // Here we are adding a class on the element that has been clicked
    this.addClass('.new-class-name')
})
```

### Off
Remove event from the selected elements

#### Example: 

```js
get('.class-name').off('click', clickHandler)
```

### AddClass
Add a class to the selected elements

#### Examples:

```js
// Here we are adding a class on the selected elements
get('.class-name').addClass('new-class-name')
```

### RemoveClass
Remove a class from the selected elements

#### Example:

```js
// Here we are removing a class from the selected elements
get('.class-name').removeClass('class-name-to-remove')
```

### ToggleClass
Toggle a class on the selected elements

#### Example:

```js
// Here we are toggling a class on the selected elements
get('.class-name').toggleClass('class-name-to-toggle')
```

### SetStyle
Set a custom style on the selected elements

#### Example:

```js
// Here we are adding custom css properties to the selected elements
get('.class-name').setStyle({
    background: 'red',
    border: 'solid blue 1px'
})
```

## EJSList properties:

### ForEach
Loop through all selected elements

#### Example:

```js
// We get the current element and his index through the parameters passed to the handler function
get('.class-name').forEach(function (element, index) {
    element.addClass('new-class-name-' + index)
})
```

## EJSElement properties:

### Elem
Retrieve the base html element (this is a getter -> read only)

#### Example:

```js
get('.class-name').forEach(function (element, index) {
    const value = 1;
    const rawHTMLElement = element.elem;
    rawHTMLElement.setAttribute('attributeName', value);
})
```

### Html
Get and set the innerHTML of the element

#### Example:

```js
get('.class-name').forEach(function (element, index) {
    element.html = 'text'
})
```

## Developement
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
