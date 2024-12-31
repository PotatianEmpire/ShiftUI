[<h4>Back</h4>](./README.md)
# ShiftUI
ShiftUI is a collection of small libraries to create simple lightweight javascript applications.
## Creating a repository
You can either clone this repository and start creating all files or download the lib folder and move it into your project repository.
## Setup
ShiftUI will first need to be imported into the html document:
```html
...
<body>
    ...

    <!-- import lib -->
     <script src="lib/shiftUI/canvas.js"></script>
     <script src="lib/shiftUI/mediaInterface.js"></script>

     <script src="lib/presets/ui.js"></script>
</body>
```
## Creating a viewport
Next we need to create a rendering viewport:
```html
...
<body>
   ...

   <canvas id="viewport"></canvas>
   
   <!-- import lib -->
    ...
</body>
```
Optionally set the margins to 0 and hide the overflow:
```html
...
    <style>
        html,body,canvas {margin: 0;overflow: hidden;}
    </style>
...
```
## Initializing ShiftEngine
Create a script or add a javascript file to the html document.
```js
// javascript
```
Create a sprite for hosting the application.
```js
let app = new Sprite();
```
Create a shiftEngine object with the canvas id and app.
```js
let app = new Sprite();
let engine = new ShiftEngine("viewport",app);
```
## Configuring the application
Add text to the app as a test.
```js
let app = new Sprite();
let engine = new ShiftEngine("viewport",app);

app.addText(FormattedText.parse(`"Hello World"`));
```
## Running the application
Now we call the engine.start() function to start running the application.
```js
...
app.addText(FormattedText.parse(`"Hello World"`));

engine.start();
```