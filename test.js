
// Initializations
var WIDTH = 800;
var HEIGHT = 600;

buttons = [];

button_url = "http://localhost:8000/button.png";
snowflake_url = "http://localhost:8000/snowflake.png";
image_urls = [button_url, snowflake_url];

simulation_status = {"snowflake":false, "rain":false};

particles = [];

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
}

function game_loop() {
  if (simulation_status["snowflake"]) {
    var new_particle = add_snowflake();
    if (new_particle !== 0) {
      stage.addChild(new_particle);
      particles.push(new_particle);
    }
  }

  // Update particles by calling their update functions
  for (var i = 0; i < particles.length; i++) {
    particles[i].update(particles[i]);
  }
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

