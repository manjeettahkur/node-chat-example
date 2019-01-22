/******************************************
    JavaScript functions on client side
*******************************************/
// Init events on page load
      function initEvents(ws_port) {
        var msg_area = document.getElementById('message');
        var send_msg = document.getElementById('send_msg');

        var host = window.location.hostname;
        var ws = new WebSocket('ws://' + host + ':' + ws_port);

        // update chat window on message
        ws.onmessage = function (event) {
          updateChat(JSON.parse(event.data));
        };

        send_msg.onclick = function () {
        // send message to ws and clear message field
        var message = msg_area.value;
          if(message) {
             ws.send(JSON.stringify({message : message}));
             msg_area.value = "";
          }
        }
        // event to send message with enter key
        sendByEnter();
      }

// Update chat window with message
      function updateChat(msg) {
        document.getElementById('chatRoom').innerHTML +=  msg.message + "\n";
      }

// Send message with enter key
      function sendByEnter() {
        var input = document.getElementById("message");

        input.addEventListener("keyup", function(event) {
          // clear default action
          event.preventDefault();
          // check for Enter key
          if (event.keyCode === 13) {
            // call click for button
            document.getElementById("send_msg").click();
          }
        });
      }
