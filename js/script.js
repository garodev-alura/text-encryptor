//Diccionario con las Keys
const keyDictionary = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat',
  };

resultActive(false);

//Función de desecriptado/encriptado: Según la bandera que se mande en isEncrypt, si llega en true encripta y si llega en false desencripta
function encrypt(event, isEncrypt){
    event.preventDefault();
    console.log(isEncrypt)

    var inputText = document.getElementById('encryptor__input__text').value;
    
    if (!validation(inputText)) return ;
    resultActive(true);

    document.getElementById('encryptor__back__result__text').value = ( isEncrypt? toEncript(inputText) : toDecript(inputText) );
}

//Función de validación: En caso de ser mayuscula o tener acento muestra el mensaje y pone el foco en la entrada de texto para corregir.
function validation(string){
    var validate = stringValidate(string);
    
    document.getElementById("encryptor__input__action__validation").style.display = ( validate? "none" : "flex" );
    if (!validate){
        textAreaSelect();
    }

    return validate;
}

//Función de encriptación: Lee el diccionario y hace match con las palabras del diccionario para remplazarlas.
function toEncript(string) {
    return string.replace(/[aeiou]/g, match => keyDictionary[match] || match);
}

//Función de desencriptación: Hace un reverse al diccionario para cambiar las entradas entre key -> value y realiza el match para remplazar con el diccionario.
function toDecript(string) {
    const reverseKeyDictionary = Object.fromEntries(
        Object.entries(keyDictionary).map(([key, value]) => [value, key])
      );
    const regex = new RegExp(Object.keys(reverseKeyDictionary).join('|'), 'g');
    return string.replace(regex, match => reverseKeyDictionary[match]);
}

//Función de copiado: Copia el texto del resultado. Y selecciona y pone foco en la entrada de texto, para pegar solamente.
function copy() {
    let copyText = document.querySelector("#encryptor__back__result__text");
    copyText.select();
    document.execCommand("copy");
    textAreaSelect()
}

//Validación para no permitir mayusculas y acentos
function stringValidate(string) {
    const regex = /[A-ZÁÉÍÓÚÜÑáéíóúüñ]/;
    return !regex.test(string);
}

//Activa y desactiva el contenedor de de resultados
function resultActive(active){
    document.getElementById("encryptor__back__standby").style.display = ( active? "none" : "flex" );
    document.getElementById("encryptor__back__result").style.display = ( active? "flex" : "none" );
}

//Foco y selección de la entrada de texto
function textAreaSelect(){
    document.getElementById('encryptor__input__text').focus();
    document.getElementById('encryptor__input__text').select();
}


