var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function(){
    $('.username').on(app.handleUsernameClick);
    $('#update-btn').click(this.handleSubmit)
    $('.submit').submit(app.handleSubmit());
  },
  handleUsernameClick: function() {
  },
  handleSubmit: function() {
   console.log('clicked submit button')
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
        
        console.log(data);
        console.log('chatterbox: Message sent');
        app.renderMessage(data.results[0]);
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
    $('#roomSelect').append('<option value = "option1">'+roomName+'</option>')
  }
}








/////////////////////////////
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

