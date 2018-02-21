// function init() {
//
//   $(".flexcontainer").click(function(){
//     console.log("cccclllicked flex");
//       window.location.href = "https://www.facebook.com/events/185686832020479/";
//   });
//
//
//   var serverBaseUrl = document.domain;
//
//   /*
//    On client init, try to connect to the socket.IO server.
//    Note we don't specify a port since we set up our server
//    to run on port 8080
//    */
//   var socket = io.connect(serverBaseUrl);
//
//   //We'll save our session ID in a variable for later
//   var sessionId = '';
//
//
//   //Helper function to update the participants' list
//   function updateParticipants(participants) {
//     $('#participants').html('');
//     for (var i = 0; i < participants.length; i++) {
//       $('#participants').append('<span id="' + participants[i].id + '">' +
//         participants[i].name + ' ' + (participants[i].id === sessionId ? '*' : '') + '<br /></span>');
//     }
//   }
//
//   /*
//    When the client successfully connects to the server, an
//    event "connect" is emitted. Let's get the session ID and
//    log it. Also, let the socket.IO server there's a new user
//    with a session ID and a name. We'll emit the "newUser" event
//    for that.
//    */
//   socket.on('connect', function () {
//     $( "#name" ).focus();
//     sessionId = socket.io.engine.id;
//     console.log('Connected ' + sessionId);
//   });
//
//   /*
//    When the server emits the "newConnection" event, we'll reset
//    the participants section and display the connected clients.
//    Note we are assigning the sessionId as the span ID.
//    */
//
//    socket.on('newConnection', function (data) {
//      updateParticipants(data.participants);
//      getVimeoCredit();
//    });
//   /*
//    When the server emits the "userDisconnected" event, we'll
//    remove the span element from the participants element
//    */
//   socket.on('userDisconnected', function(data) {
//     $('#' + data.id).remove();
//   });
//
//   /*
//    When the server fires the "nameChanged" event, it means we
//    must update the span with the given ID accordingly
//    */
//   socket.on('nameChanged', function (data) {
//     $('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '*' : '') + '<br />');
//   });
//
//   /*
//    When receiving a new chat message with the "incomingMessage" event,
//    we'll prepend it to the messages section
//    */
//   socket.on('incomingMessage', function (data) {
//     var message = data.message;
//     var name = data.name;
//     $('#messages').prepend( name + ': <span class="chatText">' + message + '</span><br>');
//   });
//
//   /*
//    Log an error if unable to connect to server
//    */
//   socket.on('error', function (reason) {
//     console.log('Unable to connect to server', reason);
//   });
//
//   /*
//    "sendMessage" will do a simple ajax POST call to our server with
//    whatever message we have in our textarea
//    */
//
//    function newName() {
//      socket.emit('newUser', {id: sessionId, name: $('#name').val()});
//      console.log($('#name').val());
//    };
//
//   function sendMessage() {
//     var outgoingMessage = $('#outgoingMessage').val();
//     var name = $('#name').val();
//     $.ajax({
//       url:  '/message',
//       type: 'POST',
//       contentType: 'application/json',
//       dataType: 'json',
//       data: JSON.stringify({message: outgoingMessage, name: name})
//     });
//
//   }
//
//   /*
//    If user presses Enter key on textarea, call sendMessage if there
//    is something to share
//    */
//   // function outgoingMessageKeyDown(event) {
//   //   if (event.which == 13) {
//   //     event.preventDefault();
//   //     if ($('#outgoingMessage').val().trim().length <= 0) {
//   //       return;
//   //     }
//   //     sendMessage();
//   //     $('#outgoingMessage').val('');
//   //   }
//   // }
//
//   /*
//    Helper function to disable/enable Send button
//    */
//
//   function getVimeoCredit() {
//     console.log("getVimeoCredit Called");
//     var vimeoUrl = $('#videoIframe').attr('src');
//     console.log("vimeoUrl = " + vimeoUrl);
//     var subStr = vimeoUrl.match("video/(.*)?background");
//     alert(subStr[1]);
//     $('.vimeo').each(function(){
//       var $this  = this;
//       $.ajax({
//               type:'GET',
//               url: 'http://vimeo.com/api/v2/video/' + '222431003'  + '.json',
//               jsonp: 'callback',
//               dataType: 'jsonp',
//               success: function(data){
//
//                   var v = data[0];
//                   console.log(v.title);
//                   console.log(v.user_name);
//                    // $('<a/>',{
//                    //     href:video.url,
//                    //     text:video.title })
//               }
//           });
//   });
// }
//
//
//
//   function checkOutgoingMessageLen() {
//     //TODO
//     var outgoingMessageValue = $('#outgoingMessage').val();
//     // $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
//   }
//
//
//   function changeBackground() {
//     var video = $('#magicInput').val();
//     console.log(video);
//     socket.emit('newVideo', video);
//   }
//
//
//   socket.on('videoForAll', function (data) {
//     console.log("we all got the video: " + data);
//     var cleaned = data.replace(/https:\/\/vimeo.com/i, '');
//     var newUrl = "https://player.vimeo.com/video" + cleaned + "?background=1autoplay=1&loop=1&title=0&byline=0&portrait=0";
//     console.log(newUrl);
//     $('#videoIframe').attr('src', newUrl);
//   });
//
//   socket.on('firstVideo', function (data) {
//     console.log("we got first video: " + data);
//     $('#videoIframe').attr('src', data);
//   });
//
//   /*
//    When a user updates his/her name, let the server know by
//    emitting the "nameChange" event
//    */
//   // function nameFocusOut() {
//   //   var name = $('#name').val();
//   //   socket.emit('nameChange', {id: sessionId, name: name});
//   // }
//   // https://player.vimeo.com/video/254932961
//
//   /* Elements setup */
//   // $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
//   // $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
//   // $('#name').on('focusout', nameFocusOut);
//   // $('#send').on('click', sendMessage);
//
//   $('#outgoingMessage').keypress(function (e) {
//     if (e.which == 13) {
//       sendMessage();
//       $('textarea').val('')
//       return false;    //<---- Add this line
//     }
//   });
//   $('#name').keypress(function (e) {
//     if (e.which == 13) {
//       newName();
//       $( ".name" ).hide();
//       $( ".chat" ).show();
//       $( "#stream" ).show();
//       return false;    //<---- Add this line
//     }
//   });
//   $('#magicInput').keypress(function (e) {
//     if (e.which == 13) {
//       changeBackground();
//       return false;    //<---- Add this line
//     }
//   });
//
//
//
//   function videoSize() {
//     var $windowHeight = $(window).height();
//     var $videoHeight = $(".video").outerHeight();
//   	var $scale = $windowHeight / $videoHeight;
//
//     if ($videoHeight <= $windowHeight) {
//       $(".video").css({
//         "-webkit-transform" : "scale("+$scale+") translateY(-50%)",
//   			"transform" : "scale("+$scale+") translateY(-50%)"
//   		});
//   	};
//   }
//
//   $(window).on('load resize',function(){
//     videoSize();
//   });
//
//
// }
//
//
//
//
//
// $(document).on('ready', init);
