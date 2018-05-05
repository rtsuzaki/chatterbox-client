var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function(){
    $('.username').on(app.handleUsernameClick);
    $('#update-btn').click(this.handleRefresh);
    $('.sendMessage').click(this.handleSubmit);
    $('.updateRoom').click(this.handleRoomSwitch);
  },
  handleRefresh: function() {
    app.fetch();
  },
  handleUsernameClick: function() {
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
  
  },
  handleRoomSwitch: function() {
    app.renderRoom($('#newRoom').val())
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

        let roomArray = [];
       
        if ($('#roomSelect').val() === '1') {
           app.clearMessages();
           data.results.forEach(function(el) {
             app.renderMessage(el);
           });
        } else {
            app.clearMessages();
            data.results.forEach(function(el) {
              if (el.roomname === $('#roomSelect').val()){
                roomArray.push(el);
              }    
            });
            roomArray.forEach(function(el) {
             app.renderMessage(el);  
            });
        } 
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
    $('#chats').append('<div class="username">'+message.username+' : '+message.text+'</div>');
    // $('.username').prepend('<div>'+message.username+'</div>');
    
  },
  renderRoom: function(roomName) {
    let nextRoomNumber = Number($( "option" ).last().val())+1;
    $('option').last().after('<option value ='+nextRoomNumber+'>'+roomName+'</option>')
  }
}








/////////////////////////////
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

