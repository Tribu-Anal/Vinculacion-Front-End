function shakeIt(element) {
   var l = 20;  
   for( var i = 0; i < 10; i++ )   
     $(element).animate( { 
         'margin-left': "+=" + ( l = -l ) + 'px',
         'margin-right': "-=" + l + 'px'
      }, 50);  

}
$(document).on('click', '.message a', function(e){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    $(".login-page").css("width", "500px");
    $("input").css("border", "none");
    $("label").remove();
});

$(document).on('click', '.message.login a', function(e){
    $(".login-page").css("width", "360px");
    $("input").css("border", "none");
    $("label").remove();
});

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

$(document).on('click', '#registrar', function(e) {
    jQuery.validator.addMethod("unitecmail", function (value, element) {
    return this.optional(element) || 
           ['unitec.edu'].indexOf(value.split('@').pop()) != -1;
},'Ingresa un correo de unitec');

    var validator = $('#register-form').validate({
        rules: {
            correo: {
                required: true,
                unitecmail: true,
                email: true
            },
            accountId: {
                required: true,
                digits: true
            },
            nombre: {
                required: true
            },
            password: {
                required: true,
                minlength: 8
            },
            confirmpass: {
               required: false,
               equalTo: "#password"
            }
        },
        messages: {
            correo: {
                required: "Por favor ingresa tu correo de unitec",
                email: "Por favor ingresa un correo v&aacute;lido"
            },
            accountId: {
                required: "Por favor ingresa tu n&uacute;mero de cuenta",
                digits: "Por favor ingresa solo d&iacute;gitos"    
            },
            nombre: {
                required: "Por favor ingresa tu nombre"
            },
            password: {
                required: "Por favor ingresa una contraseña",
                minlength: "Tu contraseña tiene que tener m&iacute;nimo 8 caracteres"
            },
            confirmpass: {
                equalTo: "Las contraseñas no coinciden"
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
        },
        submitHandler: function(){
            $(".message.login a").trigger("click");
            $("#register-form").trigger("reset");
        }
    });
});


