var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function(){
    $('.username').on(app.handleUsernameClick);
    $('#update-btn').click(this.handleRefresh);
    $('.sendMessage').click(this.handleSubmit);
    $('.updateRoom').click(this.handleRoomAdding);
    
    $('button').css('cursor', 'pointer') 
  },
  handleRefresh: function() {
    app.fetch();
  },
  handleSubmit: function() {
    let endOfUrl = window.location.search.split('=')
    let message = {
          username: endOfUrl[1],
          text: $('#message').val(),
          roomname: $('#roomSelect').val(),
        };
    app.send(message);
    app.fetch();
    $('#message').val('')
  
  },
  friendList: [],
  addingFriends: function(friend) {
    if(!app.friendList.includes($(friend.target).text().split(':')[0])) {
      app.friendList.push($(friend.target).text().split(':')[0]);
      console.log(app.friendList)
      $('#friendCounter').text(app.friendList.length);
      $('#friendList').text(app.friendList);
    }
    
    // $(friend.target).css({"background-color": "yellow", "font-size": "200%"})
  },
  handleRoomAdding: function() {
    app.renderRoom($('#newRoom').val())
    $('#newRoom').val('')
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {
        limit: 5,
        order:'-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        
        console.log('chatterbox: Message sent');

        let messageArray = [];
        let roomArray = [];
        
        if ($('#roomSelect').val() === '1') {
          app.clearMessages();
          data.results.forEach(function(el) {
            app.renderMessage(el);
            // if(app.friendList.includes(el.username)){
            //   $('#chats').first().css({"background-color": "yellow", "font-size": "200%"})
            // }
            // if (el.roomname 
          });
        } else {
          app.clearMessages();
          data.results.forEach(function(el) {
            if (el.roomname === $('#roomSelect').val()){
              messageArray.push(el);
            }    
          });
          messageArray.forEach(function(el) {
           app.renderMessage(el);  
           // if(app.friendList.includes(el.username)){
           //    $('#chats').first().css({"background-color": "yellow", "font-size": "200%"})
           // }
          });
        }
        $('.username').click(app.addingFriends);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    $('#chats').append('<div class="username" style="cursor:pointer">'+_.escape(message.username)+':'+_.escape(message.text)+'</div>');
    // $('.username').prepend('<div>'+message.username+'</div>');
    
  },
  renderRoom: function(roomName) {
    let nextRoomNumber = Number($( "option" ).last().val())+1;
    $('option').last().after('<option value ='+nextRoomNumber+'>'+roomName+'</option>')
  },
  myFriendList: [],
}








/////////////////////////////
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

