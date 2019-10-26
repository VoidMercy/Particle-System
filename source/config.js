// Configuration file to add more simulations

let WIDTH = 800;
let HEIGHT = 600;
let running = true;

// List of image urls
button_url = "http://localhost:8000/images/button.png";
snowflake_url = "http://localhost:8000/images/snowflake.png";
raindrop_url  = "http://localhost:8000/images/raindrop.png";
bee_url  = "http://localhost:8000/images/bee.png";
play_url  = "http://localhost:8000/images/play.png";
pause_url  = "http://localhost:8000/images/pause.png";

// Images to be loaded into PIXI
image_urls = [button_url, snowflake_url, raindrop_url, bee_url, play_url, pause_url];

// List of simulation modules
// running - state of simulation
// run - javascript function that is called every tick 60 times a second
// button - url of simulation button's icon
simulation_status = {
  "snowflake":{running: false, run: add_snowflake, button: snowflake_url},
  "rain":{running: false, run: add_rain, button: raindrop_url},
  "swarm":{running: false, run: add_swarm, button: bee_url}
};
