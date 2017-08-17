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
      var messhei = $(window).height()-$('nav').outerHeight(true)-$('.alert-success').outerHeight(true)-$('.btn-primary').outerHeight(true)-80;
      $('.form-control').css({
        'height': messhei+'px',
        'max-height': messhei+'px'  
      });
    }else{
      $('.form-control').css({
        'height': '200px',
        'max-height': '200px'  
      });
    }
  }
}())
