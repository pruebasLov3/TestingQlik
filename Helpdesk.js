// Configuración inicial para la conexión con el servidor Qlik Sense
var config = {
    host: '9c9gat5gx2yqbc5.us.qlikcloud.com',               // Dirección del servidor Qlik Sense
    prefix: '/',                                            // Prefijo utilizado en la URL (generalmente '/')
    port: 443,                                              // Puerto para la conexión, 443 es el estándar para HTTPS
    isSecure: true,                                         // Indica si la conexión debe ser segura (HTTPS)
    webIntegrationId: 'Rl6R9uncsZ6ZIPbsD_MEEcc_oQzAxwiv'    // ID necesario para la integración web y autenticación
};

// Función asíncrona para gestionar el inicio de sesión
async function login()  {

    // Función interna para verificar si el usuario está logueado
    function isLoggedIn()   {

        // Realiza una solicitud GET a la API de Qlik Sense para obtener la información del usuario
        return fetch("https://" + config.host + "/api/v1/users/me", {
               method: 'GET',
               mode: 'cors',            // Modo CORS para permitir solicitudes de origen cruzado
               credentials: 'include',  // Incluye credenciales en la solicitud (cookies, autorización HTTP básica)
               headers: {
                         'Content-Type': 'application/json',
                          'qlik-web-integration-id': config.webIntegrationId, // Header necesario para la autenticación
                        },
        }).then(response => {

            // Retorna true si el estado de la respuesta es 200 (OK), indicando que el usuario está logueado
            return response.status === 200;
                            });
                            }

    // Verifica si el usuario está logueado y luego ejecuta la lógica basada en eso
    return isLoggedIn().then(loggedIn =>    {
        if (!loggedIn)  {
            // Si el usuario no está logueado, redirige al navegador a la página de inicio de sesión de Qlik Sense
            window.location.href = "https://" + config.host + "/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in'); // Lanza un error para detener la ejecución del script
                        }
                                            });
                        }

// Llama a la función de login y luego configura el entorno para cargar recursos de Qlik Sense
login().then(() => {
    // Configura el entorno RequireJS con la URL base para cargar recursos de Qlik Sense
    require.config({
        baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    });

    // Carga el módulo js/qlik después de que la autenticación es exitosa
    require(["js/qlik"], function (qlik) {

        // Maneja errores globales de Qlik
        qlik.on("error", function (error) {
            $('#popupText').append(error.message + "<br>"); // Muestra mensajes de error en un popup
            $('#popup').fadeIn(1000);                       // Hace visible el popup con una transición
        });

        // Cierra el popup de error cuando se hace clic en el botón de cerrar
        $("#closePopup").click(function () {
            $('#popup').hide();
        });
        
        //#################################################################################################//
        // Aquí comienza la carga de aplicaciones y visualizaciones específicas
        var app = qlik.openApp('956f26c7-ef70-41b1-85b0-22491717ba60', config);

        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('8c98dd8c-ef7c-4d83-815c-5d6d66cc38c8').then(function (vis) {
            vis.show("QV01");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('GBLJKtx').then(function(vis){
        vis.show("QV02");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('ZCLQBPG').then(function(vis){
        vis.show("QV03");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('zBcmzpG').then(function(vis){
        vis.show("QV04");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('MYmhma').then(function(vis){
        vis.show("QV05");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('FpTyJdu').then(function(vis){
        vis.show("QV06");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('gThLYJ').then(function(vis){
        vis.show("QV07");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('CZJfTTS').then(function(vis){
        vis.show("QV08");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('DvkaxfW').then(function(vis){
        vis.show("QV09");
        } );
        // Ejemplos de cómo obtener y mostrar visualizaciones específicas (filtros, KPIs, gráficos)
        // Cada bloque obtiene una visualización por su ID y luego la muestra en un elemento HTML específico
        app.visualization.get('PdPucF').then(function(vis){
        vis.show("QV10");
        } );
        
    } );
});
