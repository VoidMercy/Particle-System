# Particle-System

Extensible in-browser 2D javascript particle simulation using PIXI.js.

### Running and Dependencies

Python2 is required for serving images locally. WebGL is required for running the simulation.

Images can be served on localhost with proper CORS "Access-Control-Allow-Origin" headers to allow PIXI.js to fetch the images using python2's SimpleHTTPServer. Please run `python serve.py` to start this server.

To load the simulation, load `main.html` in a browser that supports WebGL. WebGL is by default enabled on FireFox. To enable WebGL on chrome, make sure hardware acceleration is enabled in settings, and WebGL is enabled in `chrome://flags`

After loading the simulation, you can find the play/pause button on top of the simulation screen, and the buttons to toggle each type of simulation at the right of the screen. Click the buttons on the right to start each simulation.

### Adding/Extending Simulations

1. Add all necessary image urls to `source/config.js`
2. Add simulation configuration to `source/config.js`
3. Add javascript source file to `main.html`

### Coding Javascript Source File for More Simulations

The `run` function from the simulation configuration is called every tick (60 times a seconds). The return value of this function is expected to be a particle with three attributes: update, draw, and offscreen. The value of these attributes should be functions which will be further described below.

```javascript
function update(particle);
// Return value: none
// This function is called every tick, and the particle object is passed as the first argument
```

```javascript
function draw(particle, gr);
// Return value: none
// This function is called every tick. The particle object is passed as the first argument. The second argument is a PIXI.js graphics object that serves as a canvas to which pixels can be drawn.
```

```javascript
function offscreen(particle);
// Return value: boolean
// This function is called every tick. If the return value is true, the particle is removed from the stage.
```

### Example For Adding Simulation Code

In config.js:
```javascript
new_sim_url  = "http://localhost:8000/images/new_sim.png";
image_urls.push(new_sim_url);

simulation_status["new_sim"] = {running: false, run: sim_function, button: new_sim_url};
```

In main.html:
```html
<!-- Add simulation module source file here -->
<script src="source/new_sim.js"></script>
```

In new_sim.js:
```javascript
function sim_function() {
  sim = {};
  sim.update = sim_update;
  sim.draw = sim_draw;
  sim.offscreen = sim_offscreen;
}
function sim_update(particle) {
  // your code here
}
function sim_draw(particle, gr) {
  // your code here
}
function sim_offscreen(particle) {
  // your code here
}
```
