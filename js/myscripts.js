(function () {
  
  $(function () {
    
      var getMessageText, message_side;
     
      getMessageText = function () {
          var $message_input;
          $message_input = $('.message_input');
          chat.sendChat($message_input.val());
          return $message_input.val();
      };
      
      loadData = function(chats){
        $(".messages_history").show();
        $(chats).each(function(index, obj) {
          setTimeout(function(){
              chat.sendMessage(obj.message, '.messages_history', obj.from, obj.datetime);
          }, index * 1000);
        });
      }
      $(".button_history").on('click', function(){
        $(".messages_history").html('');
        chat.getChatHistory(loadData);
      
      });
      $('.send_message').click(function (e) {
          return chat.sendMessage(getMessageText(),'.messages');
      });
      $('.message_input').keyup(function (e) {
          if (e.which === 13) {
              return chat.sendMessage(getMessageText(),'.messages');
          }
      });
  });
}.call(this));

 
