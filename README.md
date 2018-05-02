# 2-way data binding
## Install
To get started you can simply import <code>./dist/bundle.js</code> in your code from this repository
> $ git clone --depth 1 https://github.com/MaksymBlank/2-way-data-binding

Then simply include it to your template before your main.js file
```html
<script src="./2-way-data-binding/dist/data-binding.js"></script>

<script>
    mx().bind(function($scope){
        $scope.name = 'Max';
    });
</script>
```
or use webpack
```js
import * as mx from './js/data-binding';

mx().bind(function($scope){
    $scope.name = 'Max';
});
```

## Usage
### $scope
To get access to $scope simply call <code>mx().bind()</code> function and get $scope as an argument
```js
// Set prop
mx().bind(($scope)=>{
    $scope.name = 'Max';
});
// Get prop
mx().bind(($scope)=>{
    console.log($scope.name);
});
```
### HTML binding
There are 2 ways to bind your $scope properties in html.
- by adding attribute (<code>mx-bind="property"</code>)
- by putting property in braces ( <code>{{property}}</code> )

Example:
``` html
My name is <span mx-bind="name"></span>
```
or
```html
My name is {{name}}
```
### Multiple binding
You also can bind multiple properties
```html
<p>My name is {{name}} {{lastname}}</p>
```
> If property isn't defined in $scope, it will be empty

### mx-model
To bind html input to your $scope properties, add attribute <code>mx-model</code> to the input.
```html
<input type="text" mx-model="name" value="Max">
```
> If property isn't defined in $scope, input's value will be shown. Otherwise $scope[property] will be shown as a value.

### mx-click
To create event listener for clicking, add attribute <code>mx-click</code> to the button.
```html
<script>
    mx().bind(function($scope){
        $scope.name = 'Max';
        $scope.lastname = 'Blank';

        $scope.getFullName = function(){
            window.alert(this.name + ' ' + this.lastname);
        }
    })
</script>

...

<button type="submit" mx-click="getFullName()">
```

# Testing
```
$ git clone --depth 1 https://github.com/MaksymBlank/2-way-data-binding

$ npm i -g gulp webpack webpack-cli

$ npm run test

$ open test/index.html
```