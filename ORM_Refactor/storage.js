var get = function(options, Sequelize, sequelize){
  var result;
  var flag = false;

  // get room_id
  var getRoom = function(){
    var Room = sequelize.define('room', {
      roomName: Sequelize.STRING
    });
    Room.sync().success(function(){
      Room.find({roomName: options.room}).success(function(room){
        getMessages(room.id);
      });
    });
  };

  var getMessages = function(room_id){
    var Message = sequelize.define('user', {
      user_id: Sequelize.INTEGER,
      room_id: Sequelize.INTEGER,
      text: Sequelize.STRING
    });
    Message.sync().success(function(){
      Message.findAll({where: {room_id: room_id}}).success(function(messages){
        result = messages;
        flag = true;
      });
    });
  };
  while(!flag){
    // wait for async callbacks to finish before moving on
  }
  return result;
};

var set = function(message, Sequelize, sequelize){
  // add to TABLE `rooms` and get resultant room_id
  var setRoom = function(){
    var Room = sequelize.define('room', {
      roomName: Sequelize.STRING
    });

    Room.sync().success(function(){
      Room.findOrCreate({roomName: message.room}).success(function(room){
        setUser(room.id);
      });
    });
  };

  // add to TABLE `user` and get resultant user_id
  var setUser = function(room_id){
    var User = sequelize.define('user', {
      username: Sequelize.STRING,
      room_id: Sequelize.INTEGER
    });

    User.sync().success(function(){
      User.findOrCreate({
        username: message.username,
        room_id: room_id
      }).success(function(user, created){
        setMessage(room_id, user.id);
      });
    });
  };

  // add to TABLE `messages` and get resultant message_id
  var setMessage = function(room_id, user_id){
    var Message = sequelize.define('message', {
      user_id: Sequelize.INTEGER,
      room_id: Sequelize.INTEGER,
      text: Sequelize.STRING
    });

    Message.sync().success(function(){
      Message.create({
        user_id: user_id,
        room_id: room_id,
        text: message.text
      }).success(function(message){
        console.log('Success: message added with id:',message.id);
      });
    });
  };

  // start callback chain:
  // setRoom, which will call setUser, which will call setMessage
  setRoom();
};



var getRooms = function() {

};

module.exports = {
  "get": get,
  "set": set,
  "getRooms": getRooms
};