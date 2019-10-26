// Initializations
let WIDTH = 800;
let HEIGHT = 600;

button_url = "http://localhost:8000/button.png";
snowflake_url = "http://localhost:8000/snowflake.png";
raindrop_url  = "http://localhost:8000/raindrop.png";
bee_url  = "http://localhost:8000/bee.png";
image_urls = [button_url, snowflake_url, raindrop_url, bee_url];

simulation_status = {
  "snowflake":{running: false, run: add_snowflake, button: snowflake_url},
  "rain":{running: false, run: add_rain, button: raindrop_url},
  "swarm":{running: false, run: add_swarm, button: bee_url}
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
}

function game_loop() {
  let gr = game_map;
  stage.removeChild(game_map);
  gr.clear();

  for (let type in simulation_status) {
    if (simulation_status[type].running) {
      let new_particle = simulation_status[type].run();
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
      stage.removeChild(particles[i]);
      particles.splice(i, 1);
    }
  }

  stage.addChild(gr);
}

// Create simulation buttons
function create_menu() {
  let BUTTON_WIDTH = 80;
  let BUTTON_HEIGHT = 80;
  let BUTTON_IMG_SIZE = 30;
  let BUTTON_IMG_WIDTH = 30;
  let BUTTON_IMG_HEIGHT = 30;

  var c = 0;

  for (let type in simulation_status) {
    // Create button and scale image
    let button_img_url = simulation_status[type].button;
    let button = new PIXI.Sprite(PIXI.Loader.shared.resources[button_url].texture);
    button.scale.x = BUTTON_WIDTH / button.width;
    button.scale.y = BUTTON_HEIGHT / button.height;
    button.x = WIDTH - button.width;
    button.y = c * button.height;

    let button_img = new PIXI.Sprite(PIXI.Loader.shared.resources[button_img_url].texture);

    if (button_img.width > button_img.height) {
      BUTTON_IMG_WIDTH = BUTTON_IMG_SIZE;
      BUTTON_IMG_HEIGHT = BUTTON_IMG_SIZE * button_img.height / button_img.width;
    } else {
      BUTTON_IMG_HEIGHT = BUTTON_IMG_SIZE;
      BUTTON_IMG_WIDTH = BUTTON_IMG_SIZE * button_img.width / button_img.height;
    }

    button_img.scale.x = BUTTON_IMG_WIDTH / button_img.width;
    button_img.scale.y = BUTTON_IMG_HEIGHT / button_img.height;
    button_img.x = WIDTH - BUTTON_WIDTH + (BUTTON_WIDTH - BUTTON_IMG_WIDTH) / 2;
    button_img.y = c * button.height + (BUTTON_HEIGHT - BUTTON_IMG_HEIGHT) / 2;

    // Add button listener events
    button.interactive = true;
    button.on("click", function() {
      simulation_status[type].running = !simulation_status[type].running;
      console.log(type);
    });
    stage.addChild(button);
    stage.addChild(button_img);

    c += 1;
  }
}

