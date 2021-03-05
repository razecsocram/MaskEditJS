export function GetTeclado(mascara){
    var input = document.querySelector('[type="text"]'),
    oldValue,
    newValue,
    difference = function(value1, value2) {
        var output = [];
        for(var i = 0; i < mascara.length; i++) {
            if(value1[i] !== value2[i]) {
                output.push(value2[i]);
            }
        }
        return output.join("");
    },
    keyDownHandler = function(e) {
        oldValue = input.value;
    },
    inputHandler = function(e) {
        newValue = input.value;
        const char = difference(oldValue, newValue);
        const keyCode = char.charCodeAt(0);
        if((keyCode>47 && keyCode<58)){
            formataCampo(document.querySelector('[type="text"]'), mascara, newValue)
        } 
        else if(isNaN(keyCode)==false){
            document.querySelector('[type="text"]').value = oldValue;
        } else{
            document.querySelector('[type="text"]').value = input.value;
        }
    };
    input.addEventListener('keydown', keyDownHandler);
    input.addEventListener('input', inputHandler);    
}
//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) { 
    var boleanoMascara; 
    var Digitato = evento;
    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.value.toString().replace(exp,"" ); 
    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;; 
    if (Digitato != 8){ // backspace 
        for(var i=0; i<= TamanhoMascara; i++) { 
            var boleanoMascara  = ((Mascara.charAt(i) == "-") || 
                                    (Mascara.charAt(i) == ".") || 
                                    (Mascara.charAt(i) == "/")) 
            boleanoMascara  = boleanoMascara || 
                            ((Mascara.charAt(i) == "(") || 
                            (Mascara.charAt(i) == ")") || 
                            (Mascara.charAt(i) == " ")) 
            if (boleanoMascara) { 
                NovoValorCampo += Mascara.charAt(i); 
                TamanhoMascara++;
            }else { 
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                posicaoCampo++; 
            }              
        }      
        campo.value = NovoValorCampo;
        return true; 
    } else { 
        return true; 
    }
}