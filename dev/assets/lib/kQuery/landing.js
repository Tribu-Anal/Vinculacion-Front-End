function shakeIt(element) {
   var l = 20;  
   for( var i = 0; i < 10; i++ )   
     $(element).animate( { 
         'margin-left': "+=" + ( l = -l ) + 'px',
         'margin-right': "-=" + l + 'px'
      }, 50);  

}

$(document).on('click', '#ingresar', function(e){
    jQuery.validator.addMethod("unitecmail", function (value, element) {
        return this.optional(element) || 
            ['unitec.edu'].indexOf(value.split('@').pop()) != -1;
        },'Ingresa un correo de unitec');
        
       var validator = $('#login-form').validate({
        rules: {
            usuario: {
                required: true,
                unitecmail: true
            },
            clave: {
                required: true
            },
        },
        messages: {
            usuario: {
                required: "Este campo es requerido",
                email: "Por favor ingresa un correo v&aacute;lido"
            },
            clave: {
                required: "Este campo es requerido"
            }
        },
        highlight: function(element){
            $(element).css("border", "2px solid #D46A6A");
        },
        unhighlight: function(element){
            $(element).css("border", "none");
        },
        invalidHandler: function(form){
            var errors = validator.numberOfInvalids();
            for(var i = 0; i<errors; i++){
                shakeIt(validator.errorList[i].element);
            }
        }
    });
});