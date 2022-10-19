//Continuando con Callbacks, vamos a ver un API
//*-XMLHTTPRequest
//es un objeto de JS que permite hacer peticiones hacia servicios en la nube(urls o APIs)
//para este ejemplo se esta usando https://fakeapi.platzi.com/ el cual se usara
//para obtener información de productos 

//1° Debemos declarar e importar el paquete de XMLHttpRequest, que nos permite utilizar 
//objetos (XHR) para interactuar con servidores (en este caso la API de Platzi) para esto hacemos:
const XMLHttpRequest = require('XMLHttpRequest');
//Lo que hace aquí “require()” es importar el módulo del id que le pasemos, además puede importar JSON y archivos locales. Pero necesitamos trabajar con XMLHttpRequest para manipular la API.

//2° Declaramos como constante el url de la API; ojo si se pone la variable en mayusculas
//quiere decir que no va a cambiar en nuestros archivos
const API = 'https://api.escuelajs.co/api/v1';

//3° Vamos a crear una función la cual nos va a permitir recibir la url que tenemos y el callback que va a ser
// una función anonima para recibir la solicitud que nos esta entregando el llamdo a esta solucitud API
function fetchData(urlApi, callback){
    //1.El parámetro ‘urlApi’ hace referencia a cualquier API con la cuál estemos trabajando, 
    //en este caso la FakeStore de Platzi.
    //2.El segundo parámetro ‘callback’ es donde posteriormente vamos a pasar una función como 
    //argumento para poder controlar el flujo de información de la API.

    //vamos a crear el llamado a XMLHttp
    let xhttp = new XMLHttpRequest();

    //vamos a trbajar con el llamado que hace http
    xhttp.open('GET', urlApi, true); //para abrir una conexión a nuestra API,dentro de los argumentos se pone
                 //el 1er argumento seria tipo de petición que vamos hacer en este caso GET porque queremos obtener
                 // “POST”, “PUT”, “DELETE”.
                 //el 2do elemento seria la url que va a utilizar
                 //el 3er argumento seria un booleano, ndicarle si vamos a utilizar asíncronismo o no, 
                 //tal simple como TRUE o FALSE según el caso.
    
    //Escucharemos los diferentes estados que tiene la solicitud y saber cuando esta disponible la información
    //Vamos a hacer una función anónima para verificar que el request de los datos ha salido con éxito y en caso
    // de un tener error hacer registro de éste. Para ello nos vamos a apoyar de la propiedad de
    // ‘.onreadystatechange’ ésta llamará a la función cada que el readyState cambie (readyState retorna el 
    //número del estado en dónde se encuentra el request)
    xhttp.onreadystatechange = function(event){ //la cual recibe un evento
        //lo que vamos hacer es validar el tipo de estado en el que se encuentra
        if(xhttp.readyState === 4){//Existen 4 estados de readyState, el valor 4 es done cuando ya esta completado
                                    //0 → Se ha inicializado.
                                    //1 → Loading (cargando).
                                    //2 → Se ha cargado.
                                    //3 → Procesamiento si existe alguna descarga.
                                    //4 → Completado.
            //se hara otra validación
            if(xhttp.status === 200 ){//Existen estados para interactuar con API, en este caso vamos a usar el 200
                                //200 → OK → Indica que todo está correcto.
                                //201 → Created → Todo está correcto cuando se hizo una solicitud POST, el recurso 
                                //se creó y se guardó correctamente.
                                //204 → No Content → Indica que la solicitud se completó correctamente pero no 
                                //devolvió información. Este es común cuando se hacen peticiones con el verbo DELETE.
                                //400 → Bad Request → Indica que algo está mal en la petición (no encontró algo).
                                //401 → Unauthorized → Significa que antes de hacer una solicitud al servidor nos 
                                //debemos autenticar.
                                //403 → Forbidden → Indica que no tenemos acceso a ese recurso aunque se esté 
                                //autenticado.
                                //404 → Not Found → Indica que no existe el recurso que se está intentando acceder.
                                //500 → Internal Server Error → Indica que algo falló, es un error que retorna el 
                                //servidor cuando la solicitud no pudo ser procesada.
                    
                    //Ahora vamos a utilizar nuestro callback para pasarle dos valores:
                    //El primero vamos a utilizarlo en caso de que se presente un error, pero como ya hemos verificado 
                    //eso podemos simplemente dejarlo como un ‘null’.
                    //En el segundo va a ser una transformación de la información por lo tanto usamos la función 
                    //‘JSON.parse()’ para convertir en datos que podamos controlar el texto que nos retorna la 
                    //propiedad ‘.responseText’ después de hacer el request.
                    callback(null,JSON.parse(xhttp.resposeText));
            }
        }else{//en caso se registre un error 
            const error = new Error('Error' + urlApi); //aqui le ponemos un nombre en este caso error y una urlApi
            
            //vamos a retornar el callback,pero pasandole el valor de error y luego nulo; porque no estoy regresando
            //ningun dato
            return callback(error,null);
        }
    }
    //Casi al final hacemos el llamado de xhttp,para que se ejecute toda esta logica
    xhttp.send();
}

//Un pequeño ejemplo
/*
const XMLHttpRequest = require('XMLHttpRequest');
const API = 'https://api.escuelajs.co/api/v1/products';
const DONE = 4;
const OK = 200;

function fetchData(urlApi, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function (e) {
        if (xhttp.readyState === DONE && xhttp.status === OK) {
            callback(null, JSON.parse(xhttp.responseText));
        } else {
            const error = new Error('error' + urlApi);
            return callback(error, null);
        }
    }
    xhttp.send();
}
*/