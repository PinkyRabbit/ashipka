(function(){
  frameres();
  setTimeout(function() {
    frameres();
  }, 5000);
  $(window).on('resize', function(){
    frameres();
  });
  function frameres(){
    if(($(window).height()*3>$(window).width())&&($(window).width()>767)){
      var messhei = $(window).height()-$('nav').outerHeight(true)-$('.alert-success').outerHeight(true)-$('#input-top').outerHeight(true)-$('.btn-primary').outerHeight(true)-80;
      $('.js-fixbox').css({
        'height': messhei+'px',
        'max-height': messhei+'px'  
      });
    }else{
      $('.js-fixbox').css({
        'height': '200px',
        'max-height': '200px'  
      });
    }
  }
}())
