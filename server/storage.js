var get = function(options){

};

var set = function(message, dbConnection){
  message.createdAt = new Date();

  // add to TABLE `rooms` and get resultant room_id
  var queryString = "INSERT INTO rooms (roomName) VALUES('" + message.room + "')";
  console.log('queryString:',queryString);
  dbConnection.query(queryString, function(err, rows, fields){
    if(err){
      console.log('Error inserting into rooms table:',err);
    } else {
      console.log('rows from INSERT INTO rooms',rows);
      var resultant_roomID = rows.insertId;
      // add to TABLE `users` and get resultant user_id
      queryString = "INSERT INTO users (username, room_id) VALUES('" +
        message.username + "','" + resultant_roomID + "')";
      dbConnection.query(queryString, function(err, rows, fields){
        if(err){
          console.log('Error inserting into users table:',err);
        } else {
          // add to TABLE `messages` using room_id and user_id from above code
          queryString = "INSERT INTO messages (user_id, room_id, text, createdAt)" +
            " VALUES('" + rows.insertId + "','" + resultant_roomID + "','" + message.text +
              "','" + message.createdAt + "')";
          dbConnection.query(queryString, function(err, rows, fields){
            if(err){
              console.log('Error inserting into messages table:',err);
            } else {
              console.log('SUCCESSFUL storing of message into SQL DB');
            }
          });
        }
      });
    }
  });
};

var getRooms = function() {

};

module.exports = {
  "get": get,
  "set": set,
  "getRooms": getRooms
};