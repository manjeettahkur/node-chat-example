// asquire dependencies
const args = require("args");
const express = require('express');
const path = require("path");
const websocket = require('ws');
const redis = require("redis");

// setup command line options
args.option('http-port', 'The port on which the app will be running', 8080);
args.option('websocket-port', 'The port on which websocket will be running', 9090);
args.option('redis-address', 'Address of Redis server to connect', '127.0.0.1:6379');

// parse command line
const params = args.parse(process.argv);

// set params to variables
const http_port = params.httpPort;
const ws_port = params.websocketPort;
const redis_server = params.redisAddress;

// define express variable, render engine and set public folder
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
// set route and pass variable to client
app.get('/', (req, res) => { res.render('index', { ws_port: ws_port } ) });

// define Redis clients for subscribe and publish
var sub_client = redis.createClient('//'+redis_server);
var pub_client = redis.createClient('//'+redis_server);

// subscribe to Redis channel
sub_client.subscribe("sdc_channel");

// start WebSocket server
const wss = new websocket.Server({ port: ws_port });
wss.on('connection', function connection(ws) {

  console.log('socket connected');

  // callback to send received from Redis message to websocket
  const redis_send = (channel, message) => {
    console.log('Redis received: ' + message);
    ws.send(message); 
   }

  // publish message to Redis channel if socket is alive
  ws.on('message', function incoming(message) {
    if(ws.readyState == ws.OPEN) {
      pub_client.publish("sdc_channel", message);
      console.log('ws received: %s', message);
    }
  });


  // send received from Redis message to websocket
  sub_client.on('message', redis_send);

  // remove Redis event listener on websocket disconnect
  ws.on('close', function close() {
    console.log('socket disconnected');
    sub_client.off('message', redis_send);
  });

});

// start HTTP server
app.listen(http_port, () => console.log(`Redis server ${redis_server}...\nChat server listening on http port ${http_port}, ws port ${ws_port}`));
