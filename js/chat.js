//Front-end developer test
/*
  - create a new file, add it into html
  - create a function to show realtime chat interface
  - style layout
  - call a dummy api function (supplied) to get / receive messages
  - show chat history from dummy api function

*/


var chat = new function(){
	var _events = {};
	var chats = [];


	this.addHistory = addHistory;

	function addHistory(){
		var d = new Date();
		d.setTime(d.getTime()-280000);
		chats.push({datetime:new Date(d.setTime(d.getTime()+2000)).toISOString(), message:"hello", from:"Visitor"});
		chats.push({datetime:new Date(d.setTime(d.getTime()+4000)).toISOString(), message:"Hi, how can I help you?", from:"Operator"});
		chats.push({datetime:new Date(d.setTime(d.getTime()+8000)).toISOString(), message:"I'm looking for a size 7, but can't find it", from:"Visitor"});
		chats.push({datetime:new Date(d.setTime(d.getTime()+4000)).toISOString(), message:"Ok, one moment I'll check the stock", from:"Operator"})
		chats.push({datetime:new Date(d.setTime(d.getTime()+18000)).toISOString(), message:"I'm sorry, there is no sie 7 available in that colour. There are some in red and blue however", from:"Operator"})
		chats.push({datetime:new Date(d.setTime(d.getTime()+4000)).toISOString(), message:"Oh great, thank you", from:"Visitor"});
		chats.push({datetime:new Date(d.setTime(d.getTime()+4000)).toISOString(), message:"my pleasure :-)", from:"Operator"});
	}
	
	this.getChatHistory = getChatHistory;
	
	function getChatHistory(callback){
		if(chats == ""){
			addHistory();	
		}
		if(typeof(callback) == "function") {
			setTimeout(callback(chats), 1000);
		}
	}
	var Message;
  Message = function (arg) {
      this.text = arg.text, this.message_side = arg.message_side;
      this.draw = function (_this) {
          return function (local, from, date) {
								dataEnvio = date.split('T');
								now = new Date
								
								var month = parseInt(now.getMonth())+1;
								if(month < 10){
									month = "0"+month;
								}
								day = now.getDate();
								if(day < 10){
									day = "0"+day;
								}
								const dataFinal = now.getFullYear()+"-"+month+"-"+day;
								
								const currentDate = new Date(); // Data e horário atual
								const oldDate = new Date(date);
								
								var $message;
								$message = $($('.message_template').clone().html());
							if(dataEnvio[0] == dataFinal){
								const miliseconds = currentDate.getTime() - oldDate.getTime();
								const seconds = miliseconds / 1000;
								const minutes = seconds / 60;
								console.log(Math.round(minutes) );
								$message.find('.date').text(Math.round(minutes)+' minutes ago');
							}else{
								$message.find('.date').text(date);
							}
              
             
              $message.find('.name_message').text(from);
							
              $message.addClass(_this.message_side).find('.text').html(_this.text);
              $(local).append($message);
              return setTimeout(function () {
                  return $message.addClass('appeared');
              }, 0);
          };
      }(this);
      
      return this;
  };
	this.sendMessage = sendMessage
	function sendMessage(text, local, from, date) {
		
		var $messages, message;
		if (text.trim() === '') {
				return;
		}
		$('.message_input').val('');
		$messages = $(local);
		message_side = from === 'Operator' || from === 'operator' ? 'right' : 'left';
		message = new Message({
				text: htmlEncode(text),
				message_side: message_side
		});
		message.draw(local, from, date);
	
		
		return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
		
	};
	this.htmlEncode = htmlEncode;
	function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}
	this.sendChat = sendChat;
	function sendChat(str){
		dispatchChatEvent(htmlEncode(str), "Visitor");
		if(str.indexOf("hello") != -1 || str.indexOf("hi") != -1) {
			setTimeout(operatorGreetingChat, 2000);
		} else if(str.indexOf("?") != -1) {
			setTimeout(operatorAnswerChat, 2000);
		} else {
			setTimeout(operatorChat, 2000);
		}
		
	}

	var responses = [
		"OK, let me check that out for you",
		"Message received. I'll see what I can do.",
		"ok, thank you.",
		"I understand.",
		"Hmm, I'm not sure I understand, can you rephrase that?",
		"Right ok, let me sort that out for you."
	];
	var greetings = [
		"Hello there, welcome to the site. How may I help you?",
		"Good day! How are you?",
		"Hello, what can I do for you?",
		"Hi and welcome!",
		"Greetings :-)"

	]
	var answers = [
		"Thank you for your question.",
		"OK, let me check that out for you",
		"A very good question! Let me have a look...",
		"Hmm, ok give me a minute and I'll sort that out.",
		"Yes, I think so."
	]
	function operatorChat(){
		var randResponse = responses[Math.floor(Math.random()*responses.length)];
		dispatchChatEvent(randResponse, "Operator");
	}
	function operatorAnswerChat(){
		var randResponse = answers[Math.floor(Math.random()*responses.length)];
		dispatchChatEvent(randResponse, "Operator");
	}
	function operatorGreetingChat(){
		var randResponse = greetings[Math.floor(Math.random()*responses.length)];
		dispatchChatEvent(randResponse, "Operator");
	}

	function dispatchChatEvent(msg, from){
		var event = new CustomEvent('chatreceived', {"detail":{datetime:new Date().toISOString(), message:msg, from:from}});

		// Listen for the event
		addListener('chatreceived', event.detail);

		// Dispatch the event.
		raiseEvent("chatreceived", {"chat":{datetime:new Date().toISOString(), message:msg, from:from}});
	}

	function addListener(eventName, callback) {
		
		
		var events = _events;
		chat.sendMessage(callback.message, '.messages', callback.from, callback.datetime);
		
		if(chats == ""){
			addHistory();	
		}
		chats.push(callback);
		
		
	};

	function raiseEvent(eventName, args) {
		var callbacks = _events[eventName];
		if(typeof(callbacks) != "undefined") {
			for (var i = 0, l = callbacks.length; i < l; i++) {
			  callbacks[i](args);
			}
		}
		
	}
}

