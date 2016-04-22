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
});

$(document).on('click', '.message.login a', function(e){
    $(".login-page").css("width", "360px");
    $("input").css("border", "none");
});

$(document).on('click', '#ingresar', function(e){
    jQuery.validator.addMethod("unitecmail", function (value, element) {
        return this.optional(element) || 
            ['unitec.edu'].indexOf(value.split('@').pop()) != -1;
        },'Ingresa un correo de unitec');
        
        $('#login-form').validate({
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
                required: "Este campo es requerido"
            },
            clave: {
                required: "Este campo es requerido"
            }
        },
        invalidHandler: function(){
            shakeIt("input");
            shakeIt("span");
            $("input").css("border", "2px solid #D46A6A");
            
        }
    });
});

$(document).on('click', '#registrar', function(e) {
    jQuery.validator.addMethod("unitecmail", function (value, element) {
    return this.optional(element) || 
           ['unitec.edu'].indexOf(value.split('@').pop()) != -1;
},'Ingresa un correo de unitec');

    $('#register-form').validate({
        rules: {
            correo: {
                required: true,
                unitecmail: true,
                email: true
            },
            cuenta: {
                required: true
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
                email: "Por favor ingresa un correo valido"
            },
            cuenta: {
                required: "Por favor ingresa tu numero de cuenta"    
            },
            nombre: {
                required: "Por favor ingresa tu nombre"
            },
            password: {
                required: "Por favor ingresa una contraseña",
                minlength: "Tu contraseña tiene que tener minimo 8 caracteres"
            },
            confirmpass: {
                equalTo: "Las contraseñas no coinciden"
            }
        },
        invalidHandler: function(){
            shakeIt("input");
            shakeIt("span");
            $("input").css("border", "2px solid #D46A6A");
            
        }
    });
});


