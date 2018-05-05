// YOUR CODE HERE:
let app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    $(".username").click(function(){
      
        app.handleUsernameClick.called = true;
        app.handleUsernameClick.restore = function() {
          app.handleUsernameClick.called = false;
        };
      })

  $(".submit").submit(function(){
      
        app.handleSubmit.calledOnce = true;
        // app.handleSubmit.restore = function() {
        //   app.handleSubmit.called = false;
        // };
      })


  },
  handleUsernameClick: function() {
  },
  handleSubmit: function() {
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
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    $('#chats').before('<div class="username">'+message.username+'</div>');
    $('#chats').append('<div>'+message.text+'</div>');
  },
  renderRoom: function(roomName) {
    $('#roomSelect').append('<option value = "option1">'+roomName+'</option>')
  }
}








/////////////////////////////
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

