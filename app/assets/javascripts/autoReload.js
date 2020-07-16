$(function(){   
  function buildHTML(message){ 
    if ( message.image ) { 
      var html = 
      `<div class="message" data-message-id=${message.id}> 
        <div class="message__upper-info"> 
          <div class="message__upper-info__talker"> 
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at} 
          </div> 
        </div> 
        <div class="message__text"> 
          <p class="lower-message__content">
            ${message.content}
            </p>  
            <img class="message__image" src="${message.image}">
          </div> 
        </div>` 
        return html; 
    } else { 
      var html =  
      `<div class="message" data-message-id=${message.id}> 
      <div class="message__upper-info"> 
        <div class="message__upper-info__talker"> 
          ${message.user_name}
        </div>
        <div class="message__upper-info__date">
          ${message.created_at} 
        </div> 
      </div> 
      <div class="message__text"> 
        <p class="lower-message__content">
          ${message.content}
          </p>  
        </div> 
      </div>` 
      return html; 
    };
  } 

  var reloadMessages = function() { 
    var last_message_id = $('.message:last').data("message-id") || 0; 
    $.ajax({ 
      url: "api/messages", 
      type: "get", 
      dataType: "json", 
      data: {id: last_message_id} 
    })  
    .done(function(messages) { 
      if (messages.length !== 0) { 
        var insertHTML = ''; 
        $.each(messages, function(i, message) { 
          insertHTML += buildHTML(message)
        }); 
        $('.messages').append(insertHTML); 
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    }) 
    .fail(function() { 
      alert('error'); 
    });
  }; 
  setInterval(reloadMessages, 7000);
}); 