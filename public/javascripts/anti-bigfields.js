(function() {
  $('#form').on('submit', function(e){
    $('.form-group').removeClass('has-error');
    $('#form textarea').each(function(i) {
      if($(this).val().length>30000){
        e.preventDefault();
        $(this).parent().addClass('has-error');
      }
    });
  });
}())
