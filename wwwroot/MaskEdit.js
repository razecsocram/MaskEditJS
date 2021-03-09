export function formatarNaoMoeda(mascara, id){
    var input = document.getElementById(id),
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
    keyDownHandler = function() {
        if(input.value.length<=mascara.length){
            oldValue = input.value;
            // document.getElementById(id).innerHTML = input.value;
        }
    },
    inputHandler = function() {
        newValue = input.value;
        const char = difference(oldValue, newValue);
        const keyCode = char.charCodeAt(0);
        if((keyCode>47 && keyCode<58)){
            formataCampo(document.getElementById(id), mascara)
         } 
        else if(isNaN(keyCode)==false){
            document.getElementById(id).value = oldValue;
        } else{
            document.getElementById(id).value = input.value;
        }
    };
    input.addEventListener('keydown', keyDownHandler);
    input.addEventListener('input', inputHandler);    
}

export function formatarMoeda(tam, ndec, id){
    var input = document.getElementById(id),
    oldValue,
    newValue,
    difference = function(value2) {
        return value2.substr((value2.length-1), 1);
    },
    keyDownHandler = function() {
        if(input.value.length<=tam.length){
            oldValue = input.value;
        }
    },
    inputHandler = function() {
        newValue = input.value;
        const char = difference(newValue);
        const keyCode = char.charCodeAt(0);
        if((keyCode>47 && keyCode<58)){
            document.getElementById(id).value = Moeda(newValue, ndec);
        } 
        else if(isNaN(keyCode)==false){
            document.getElementById(id).value = oldValue;
        } else{
            document.getElementById(id).value = input.value;
        }
    };
    input.addEventListener('keydown', keyDownHandler);
    input.addEventListener('input', inputHandler);    
}

// export function Moeda2(id) {
//     var elemento = document.getElementById(id);
//     var valor = elemento.value;

//     valor = valor + '';
//     valor = parseInt(valor.replace(/[\D]+/g, ''));
//     valor = valor + '';
    
//     console.log("valor1: " + valor.toString());

//     valor = valor.replace(/([0-9]{2})$/g, ",$1");
    
//     console.log("valor2: " + valor.toString());

//     if (valor.length > 6) {
//         console.log(">6");

//         valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    
//         console.log("valor3: " + valor.toString());
//     }
    
//     console.log("valor4: " + valor.toString());

//     elemento.value = valor;
//     if(valor == 'NaN') elemento.value = '';
// }

function Moeda(digitado, ndec) {
    digitado = digitado + '';
    digitado = parseInt(digitado.replace(/[\D]+/g, ''));
    digitado = digitado + '';
    digitado = lenMenorSeis(digitado, ndec);
    if(digitado.length>6){
        digitado = lenMaiorSeis(digitado, ndec);
    } 
    return digitado;
}

function lenMenorSeis(buffer,ndec){
    switch (ndec) {
        case 0:
            return buffer.replace(/([0-9]{1})$/g, "$1");
        case 1:
            return buffer.replace(/([0-9]{1})$/g, ",$1");
        case 2:
            return buffer.replace(/([0-9]{2})$/g, ",$1");
        case 3:
            return buffer.replace(/([0-9]{3})$/g, ",$1");
        default:
            return buffer.replace(/([0-9]{4})$/g, ",$1");
    }
}

function lenMaiorSeis(buffer,ndec) {
    switch (ndec) {
        case 0:
            return buffer;
        case 1:
            return buffer.replace(/([0-9]{3}),([0-9]{1}$)/g, ".$1,$2");
        case 2:
            return buffer.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        case 3:
            return buffer.replace(/([0-9]{3}),([0-9]{3}$)/g, ".$1,$2");
        default:
            return buffer.replace(/([0-9]{3}),([0-9]{4}$)/g, ".$1,$2");
    }
}
//formata de forma generica os campos
function formataCampo(campo, Mascara) { 
    var boleanoMascara; 
    var exp = /\-|\.|\/|\(|\)|\,| /g
    var campoSoNumeros = campo.value.toString().replace(exp,"" ); 
    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;
    for(var i=0;i<=TamanhoMascara;i++) { 
        var boleanoMascara  = ((Mascara.charAt(i) == "-") || 
                                (Mascara.charAt(i) == ".") || 
                                (Mascara.charAt(i) == "/") ||
                                (Mascara.charAt(i)== ",") ||
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
}