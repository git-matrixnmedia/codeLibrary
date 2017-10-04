
$(document).ready(function(){	
    var base_url    = $("#base_url").val();
    var current_url = $("#current_url").val() ;
   //setTimeout(function(){ $("#flashMessage").fadeOut('slow') ; },5000);      
   
   /**
    * LOAD AJAX PAGINATION LISTING PAGE
    *
    */

   $("#paginateContent").html('<center><img src="'+base_url+'/img/data_loader.gif" /></center>'); 
   //$("#paginateContent").load(current_url,{},function(){
     // $('[data-toggle="tooltip"]').tooltip();
   //});

   $("#paginateContent").load(current_url);
   

   /**
    * CHECK ALLOWED DOMAIN NAME
    */

   $("body").on('blur','input.allowed_domain',function(){    // ========= check if only valid file type ========= //
      
      var allowed_domian_type = $(this).data('allowed_domian_type') ;
      var url = $(this).val() ;
      var domain_name = extractDomain(url);

      if(allowed_domian_type.indexOf(domain_name) == -1)
      {
         $(this).val('');
         if(!$(this).next('span.text-red').length)
         $(this).after("<span class='text-red' style='color:#b94a48;'>The following video type not allowed</span>");         
      }
      else
      {
         $(this).next('span.text-red').remove();      
      }
   });


   /**
    * SEARCH FORM DATA LIST PAGE
    */

    $(".search_button").off().on('click',function(e){
        e.preventDefault();

        var form_data = $(this).closest('form').serialize() ;
        var current_url = $(this).closest('form').find('input[type=hidden]:eq(1)').val();

        $.ajax({
              type: "GET",
              url: current_url,
              data: form_data,
              success: function(response) 
              {   
                  $("#paginateContent").html('<center><img src="'+base_url+'/img/data_loader.gif" /></center>'); 
                  $("#paginateContent").html(response) ;
                  $(".clear_search").css('display','') ;
              }
        });
    });

    $(".clear_search").off().on('click',function(){
        var current_url = $(this).closest('form').find('input[type=hidden]:eq(1)').val();
        $("#paginateContent").html('<center><img src="'+base_url+'/img/data_loader.gif" /></center>'); 
        $("#paginateContent").load(current_url) ;
        $(this).closest('form').find('input[type=text],select').val('');
        $(".clear_search").css('display','none') ;
    });
    

    /**
     * CHARACTERS COUNT FUNCTIONAILTY
     * WHEN KEY PRESS
     */

     $(".chars_count").on('keyup blur paste',function(){
        var max_chars  = $(this).attr('maxlength') ;
        var used_chars = $(this).val().length ;
        var left_chars = (parseInt(max_chars) - parseInt(used_chars)) ;

        if(left_chars >=0)
        {
          $(this).next('input.display_chars_count').val(left_chars) ;
        }
     });


     $(".chars_count").each(function(){
         var max_chars  = $(this).attr('maxlength') ;
         var used_chars = $(this).val().length ;
         var left_chars = (parseInt(max_chars) - parseInt(used_chars)) ;
         $(this).after('<input type="text" size="2" disabled="disabled" value="'+left_chars+'" class="display_chars_count" /> characters left') ;
     });

   /**
    * CHECK VALID INPUT FILE TYPE
    */

   $("body").on('change','input:file',function(){    // ========= check if only valid file type ========= //

      var thisInput = this ;
      if($(thisInput).next('span.text-red').length)
      {
        $(thisInput).next('span.text-red').remove() ;
      }
      $("#previewImage").attr('src',base_url+'/img/no_image.png');

      var file_id = $(thisInput).attr('id') ;      
      var allowed_type  = $("#"+file_id).data('allowed_type'); 

      if($("#"+file_id).data('allowed_size'))
      {
        var allowed_size  = $("#"+file_id).data('allowed_size'); 
        var split_size    = allowed_size.split('|');

        var dt = {
            allowed_width : split_size[0],
            allowed_height : split_size[1]
        } ;
      }
      else
      {
        var dt = {
            allowed_width : '100',
            allowed_height : '100'
        } ;
      }
      var fileUpload = document.getElementById(file_id);    

      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+("+allowed_type+")$");
      if (regex.test(fileUpload.value.toLowerCase())) {
          
          if (typeof (fileUpload.files) != "undefined") {
              var reader = new FileReader();
              reader.readAsDataURL(fileUpload.files[0]);
              reader.onload = function (e) {

                  var image = new Image();

                  image.src = e.target.result;
                         
                  image.onload = function() {
                      var thisImage = this ;
                      var height = thisImage.height;
                      var width = thisImage.width;
                      $(thisInput).next('span.text-red').remove();
                      $('#previewImage').attr('src', image.src);
                      
                      /*if(height >= dt.allowed_height && width >= dt.allowed_width) 
                      {
                          $(thisInput).next('span.text-red').remove();
                          $('#previewImage').attr('src', image.src);
                      }
                      else
                      {
                         $(thisInput).val('');
                         $(thisInput).after("<span class='text-red' style='color:#b94a48;'>Image must be greater than "+dt.allowed_width+"px X "+dt.allowed_height+"px</span>");         
                      }*/
                  };
   
              }
          } else {
               $(thisInput).val('');
               $(thisInput).after("<span class='text-red' style='color:#b94a48;'>This browser does not support HTML5.</span>");         
          }
      } else {
           $(thisInput).val('');
           $(thisInput).after("<span class='text-red' style='color:#b94a48;'>The following file type not allowed</span>");              
      }

   }); 

});   

function readURL(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#previewImage').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function extractDomain(url) 
{
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

// Extra text added when copy from webpage

function addLink() {
    //Get the selected text and append the extra info
    var selection = window.getSelection(),
        pagelink = '<br /><br /> Read more at: ' + document.location.href,
        copytext = selection + pagelink,
        newdiv = document.createElement('div');

    //hide the newly created container
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';

    //insert the container, fill it with the extended text, and define the new selection
    document.body.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);

    window.setTimeout(function () {
        document.body.removeChild(newdiv);
    }, 100);
}


