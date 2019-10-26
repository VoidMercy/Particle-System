// Main controller source file

// Initializations
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
  app.ticker.add(delta => main_loop(delta));
}

// Main loop which is called 60 ticks per second
// delta: delta time between last call of main_loop
function main_loop(delta) {
  if (running) {
    let gr = game_map;
    stage.removeChild(game_map);
    gr.clear();

    // Add new particles by calling each respective run functions
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
}

// Create simulation buttons
function create_menu() {
  let PLAY_PAUSE_SIZE = 50;
  let BUTTON_WIDTH = 80;
  let BUTTON_HEIGHT = 80;
  let BUTTON_ICON_SIZE = 30;
  let BUTTON_ICON_WIDTH = 30;
  let BUTTON_ICON_HEIGHT = 30;

  var c = 0;

  for (let type in simulation_status) {
    // Create button and scale image
    let button_icon_url = simulation_status[type].button;
    let button = new PIXI.Sprite(PIXI.Loader.shared.resources[button_url].texture);
    button.scale.x = BUTTON_WIDTH / button.width;
    button.scale.y = BUTTON_HEIGHT / button.height;
    button.x = WIDTH - button.width;
    button.y = c * button.height;

    let button_icon = new PIXI.Sprite(PIXI.Loader.shared.resources[button_icon_url].texture);

    // Maintain button icon aspect ratio
    if (button_icon.width > button_icon.height) {
      BUTTON_ICON_WIDTH = BUTTON_ICON_SIZE;
      BUTTON_ICON_HEIGHT = BUTTON_ICON_SIZE * button_icon.height / button_icon.width;
    } else {
      BUTTON_ICON_HEIGHT = BUTTON_ICON_SIZE;
      BUTTON_ICON_WIDTH = BUTTON_ICON_SIZE * button_icon.width / button_icon.height;
    }

    button_icon.scale.x = BUTTON_ICON_WIDTH / button_icon.width;
    button_icon.scale.y = BUTTON_ICON_HEIGHT / button_icon.height;
    button_icon.x = WIDTH - BUTTON_WIDTH + (BUTTON_WIDTH - BUTTON_ICON_WIDTH) / 2;
    button_icon.y = c * button.height + (BUTTON_HEIGHT - BUTTON_ICON_HEIGHT) / 2;

    // Add button listener events
    button.interactive = true;
    button.on("click", function() {
      simulation_status[type].running = !simulation_status[type].running;
      console.log(type);
    });
    stage.addChild(button);
    stage.addChild(button_icon);

    c += 1;
  }

  // Create pause and play buttons
  button = new PIXI.Sprite(PIXI.Loader.shared.resources[play_url].texture);
  button.scale.x = PLAY_PAUSE_SIZE / button.width;
  button.scale.y = PLAY_PAUSE_SIZE / button.height;
  button.x = WIDTH / 2 - button.width / 2;
  button.y = 0;
  button.interactive = true;
  button.on("click", function() {
    running = true;
  });

  stage.addChild(button);

  button = new PIXI.Sprite(PIXI.Loader.shared.resources[pause_url].texture);
  button.scale.x = PLAY_PAUSE_SIZE / button.width;
  button.scale.y = PLAY_PAUSE_SIZE / button.height;
  button.x = WIDTH / 2 + button.width / 2;
  button.y = 0;
  button.interactive = true;
  button.on("click", function() {
    running = false;
  });

  stage.addChild(button);
}

