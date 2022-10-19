//*-Callbacks
//Una función de callback es una función que se pasa a otra función como un argumento, 
//que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.
//Primero creamos una función
function sum(num1, num2){
    return num1 + num2;
};
//Ahora vamos a crear una función que va a recibir el callback en este caso la función sum como argumento
//y dentro va a ser ejecutada
function calc(num1,num2,callback){
   //vamos a retornar el valor de esta función, más los valores que se pasan previamente
    return callback(num1,num2);
};
//Ahora vamos a llamarla, aqui vemos como se invoca la función calc que a su vez
//va a recibir a la función sum con los dos valores que le queremos pasar
console.log(calc(2,2,sum));//no es necesario agregar los parentesis de la función, porque sino la estariamos
                         // invocando inmediatamente,además no es necesario pasarle a sum los argumentos
                         // porque ya en la función calc le vamos a pasar los argumentos

//OTRO EJEMPLO DE CALLBACK
//*-Ejemplo con setTimeout
//este permite ejecutar el codigo en un tiempo determinado que yo valla a definir,esta recibe como argumentos
// una función, el tiempo y argumentos a necesitar
setTimeout(function (){ //es una funcion anonima
    console.log('Hola :D');
}, 5000);
//setTimeout de por si es un callback porque recibe una función
//Creamos otra función
function greeting(name){
    console.log(`Hola ${name}`);
};
setTimeout(greeting,2000,'Azucena');//al final se pone el argumento que se necesita