var xhr; var token;

$(document).ready( function () {

 // проверка на токен в кукисах
 token=GetCookie('auth');
 if (typeof(token) != 'undefined' && token)
 {
  $('.authbox .loading').height($('.authbox .boxxer').height()).css('display','block');

  $.get('./login.php?token='+token, function(response) 
  {
   $('.authbox .loading').css('display','none');
   
   if (response.indexOf('{ok}') >= 0) 
   {
    $('.welcome').fadeOut(300);
    $('.loginbox').css('display','none');
    $('.logined').fadeIn(300); $('.logined span.token').text(token);
   } else { 
    // SetCookie('auth', '');
   }
  });
 }

});


function loginbox_logout()
{
 $('.authbox .loginbox').css('display','none');
 $('.authbox .welcome').fadeIn(300);
 $('.authbox .logined').fadeOut(200);
 SetCookie('auth', '');
 return false;
}

function loginbox_show()
{
 $('.authbox .welcome').fadeOut(300, function()
 {
  $('.authbox .loginbox').fadeIn(400);
 }); 
 return false;
}


function loginbox_submit()
{
 $('.authbox .warning').css('display: none;'); $('.authbox .warning').text();
 $('.authbox .loading').height($('.authbox .boxxer').height()).css('display','block');
 
 if (xhr && xhr.readyState != 4) { xhr.abort(); }
 
 xhr=jQuery.ajax({
  url: './login.php', type: "POST", dataType: "html", data: { 'login': $(".authbox input[name='login']").val(), 'passw': $(".authbox input[name='passw']").val() },
  success: function(response)
  {

   if (response)
   {
    if (response.indexOf('{ok}') >= 0) 
    {
     var token=response.substring(response.indexOf('{ok}')+4);
     SetCookie('auth', token);
     $('.authbox .loginbox').fadeOut(300);
     $('.authbox .logined').fadeIn(200);
     $('.authbox .warning').css('display: none;'); $('.authbox .warning').text();
    }

    if (response.indexOf('{err}') >= 0) 
    {
     $('.authbox .warning').text('Для авторизации надо набрать demo/demo'); $('.authbox .warning').fadeIn(400); 
    }

    if (response.indexOf('{require}') >= 0) 
    {
     $(".authbox input").addClass('require');
     
    }

//  $('.authbox .loading').height($('.authbox .boxxer').height());		// это если проверить хотите, фикс так как высота <p> не учитывалась ранее при расчете
    $('.authbox .loading').css('display','none');
     
   } else { }
  }, error: function(response) { 
   $('.authbox .warning').text('Ошибка при отправке формы'); $('.authbox .warning').fadeIn(400); 
  }
 });
 return false;
}


function SetCookie(name, value) {
 cookie_string=name + "=" + escape ( value );
 expires=new Date ('2200', '12', '30');
 cookie_string += "; expires=" + expires.toGMTString();
 cookie_string += "; path=/";
 document.cookie=cookie_string;
}
 
function GetCookie(name) {
 cookie_name = name + "=";
 cookie_length = document.cookie.length;
 cookie_begin = 0;
 while (cookie_begin < cookie_length) {
  value_begin = cookie_begin + cookie_name.length;
  if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
   var value_end = document.cookie.indexOf (";", value_begin);
   if (value_end == -1) { value_end = cookie_length; }
    return unescape(document.cookie.substring(value_begin, value_end));
  }
  cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
  if (cookie_begin == 0) { break; }
 }
 return null;
}