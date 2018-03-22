(function ($) {
    $(document).ready(function () {
        
        // Bind click: Delete account button
        $('#delete-btn').click(function(e) {
            e.preventDefault();
            deleteAccount();
        });
    });
   

}(jQuery));

function deleteAccount() {
    $('#modal').removeClass().addClass('shown light');
    $('#modal-main').html("<div id='delete'></div>");
    $('#delete').load('/components/account/delete', function(){ 
        $('#confirm').on('input', function(){
            if($('#confirm').val().toLowerCase() == 'delete') {
                $('#nuke').removeClass('disabled');
            }  else {
                if(!$('#nuke').hasClass('disabled')) {
                    $('#nuke').addClass('disabled');
                }
            }
        });
        // Bind click: Nuke account button
        $('#delete').on('click','a#nuke', function(e) {
            e.preventDefault();
            $.ajax({
              url: api.data+'/account',
              method: 'DELETE',
              dataType: 'json',
              success: function(data) {
                  window.localStorage.removeItem("jwt");
                  window.localStorage.removeItem("fsu");
                  $('#modal-main').html("<div class='text-center'><h2>Goodby</h2><p>We'll send you to the homepage, ok?</p></div>");
                  setTimeout(function(){ window.location.replace("/"); }, 2000);
              },
              error: function(data) { 
                  $('#modal-main').load("/components/generic/error");
              },
              headers: {'Authorization': 'Bearer '+token},
            }); 
        });

    });
}

