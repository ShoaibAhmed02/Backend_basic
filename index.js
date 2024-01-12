const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const server= require("http").createServer(app);
const {get_messages,send_message}=require("./utils/chat")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
//** Database Connection **//
mongoose
  .connect("mongodb://0.0.0.0:27017/projet_template")
  .then(() => {
    console.log("Connected to MONGO :-( ");
  })
  .catch((err) => console.log("connection Failed! error is : ", err))

const router = require("./Route/routes");
app.use(router);



//Socket code
var io = require('socket.io')(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: false,
      transports: ['websocket', 'polling'],
      allowEIO3: true
  },
});

io.on('connection', socket => {
  console.log("socket connection " + socket.id);
  socket.on('get_messages', function (object) {
    console.log("Object -------------------->", object)  
    var user_room = "user_" + object.sender_id;

      socket.join(user_room);
      get_messages(object, function (response) {
          if (response.length > 0) {
              console.log("get_messages has been successfully executed...");
              io.to(user_room).emit('response', { object_type: "get_messages", data: response });
          } else {
              console.log("get_messages has been failed...");
              io.to(user_room).emit('response', { object_type: "get_messages", message: "There is some problem in get_messages...", data: [] });
          }
      });
  });
  // SEND MESSAGE EMIT
  socket.on('send_message', function (object) {
      var sender_room = "user_" + object.sender_id;
      var receiver_room = "user_" + object.receiver_id;
      send_message(object, async (response_obj) => {
          if (response_obj) {
              console.log("send_message has been successfully executed...");
              io.to(sender_room).to(receiver_room).emit('response', { object_type: "get_message", data: response_obj });
          } else {
              console.log("send_message has been failed...");
              io.to(sender_room).to(receiver_room).emit('error', { object_type: "get_message", message: "There is some problem in get_message..." });
          }
      });
  });
});

//listening the port of
server.listen(3000, () => {
  console.log(`listening on the port :`);
});
