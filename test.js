
// Initializations
var WIDTH = 800;
var HEIGHT = 600;

buttons = [];

button_url = "http://localhost:8000/button.png";
snowflake_url = "http://localhost:8000/snowflake.png";
image_urls = [button_url, snowflake_url];

simulation_status = {"snowflake":false, "rain":false};

particles = [];

var game_map = new PIXI.Graphics();

//Create a Pixi Application
var app = new PIXI.Application({width: WIDTH, height: HEIGHT});
var stage = app.stage;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// Load images
for (var i = 0; i < image_urls.length; i++) {
  PIXI.Loader.shared.add(image_urls[i]);
}
PIXI.Loader.shared.load(setup);

// Setup
function setup() {
  create_menu();
  app.ticker.add(delta => game_loop(delta));

  simulation_status["snowflake"] = true;
  simulation_status["rain"] = true;
}

function game_loop() {
  var gr = game_map;
  stage.removeChild(game_map);
  gr.clear();

  if (simulation_status["snowflake"]) {
    var new_particle = add_snowflake();
    if (new_particle !== 0) {
      particles.push(new_particle);
    }
  }

  if (simulation_status["rain"]) {
    var new_particle = add_rain();
    if (new_particle !== 0) {
      particles.push(new_particle);
    }
  }

  // Update particles by calling their update and draw functions
  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].update(particles[i]);
    particles[i].draw(particles[i], gr);
    if (particles[i].offscreen(particles[i])) {
      particles.splice(i, 1);
    }
  }

  stage.addChild(gr);
}

// Create simulation buttons
function create_menu() {
  var BUTTON_COUNT = 3;
  var BUTTON_WIDTH = 50;
  var BUTTON_HEIGHT = 50;

  for (var i = 0; i < BUTTON_COUNT; i++) {
    // Create button and scale image
    var button = new PIXI.Sprite(PIXI.Loader.shared.resources[button_url].texture);
    button.scale.x = BUTTON_WIDTH / button.width;
    button.scale.y = BUTTON_HEIGHT / button.height;
    button.x = WIDTH - button.width;
    button.y = i * button.height;

    // Add button listener events
    button.interactive = true;
    button.on("click", test_click);
    stage.addChild(button);

    buttons.push(button);
  }
}

function test_click() {
  console.log("CLICKED");
}

