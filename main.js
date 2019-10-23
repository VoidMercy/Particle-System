// Initializations
let WIDTH = 800;
let HEIGHT = 600;

buttons = [];

button_url = "http://localhost:8000/button.png";
snowflake_url = "http://localhost:8000/snowflake.png";
image_urls = [button_url, snowflake_url];

simulation_status = {
  "snowflake":{running: false, add: add_snowflake},
  "rain":{running: false, add: add_rain}
};

particles = [];

let game_map = new PIXI.Graphics();

//Create a Pixi Application
let app = new PIXI.Application({width: WIDTH, height: HEIGHT});
let stage = app.stage;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// Load images
for (let i = 0; i < image_urls.length; i++) {
  PIXI.Loader.shared.add(image_urls[i]);
}
PIXI.Loader.shared.load(setup);

// Setup
function setup() {
  create_menu();
  app.ticker.add(delta => game_loop(delta));

  simulation_status["snowflake"].running = true;
  simulation_status["rain"].running = true;
}

function game_loop() {
  let gr = game_map;
  stage.removeChild(game_map);
  gr.clear();

  for (let type in simulation_status) {
    if (simulation_status[type].running) {
      let new_particle = simulation_status[type].add();
      if (new_particle !== 0) {
        particles.push(new_particle);
      }
    }
  }

  // Update particles by calling their update and draw functions
  for (let i = particles.length - 1; i >= 0; i--) {
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
  let BUTTON_COUNT = 3;
  let BUTTON_WIDTH = 50;
  let BUTTON_HEIGHT = 50;

  for (var i = 0; i < BUTTON_COUNT; i++) {
    // Create button and scale image
    let button = new PIXI.Sprite(PIXI.Loader.shared.resources[button_url].texture);
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

