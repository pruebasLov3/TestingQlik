var config = {
    host: '9c9gat5gx2yqbc5.us.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'Rl6R9uncsZ6ZIPbsD_MEEcc_oQzAxwiv'
};

//Redirect to login if user is not logged in
async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}
login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
        //open apps -- inserted here --
        var app = qlik.openApp( '956f26c7-ef70-41b1-85b0-22491717ba60', config );
       
        //get objects -- inserted here --
        //Fiters
        app.visualization.get('8c98dd8c-ef7c-4d83-815c-5d6d66cc38c8').then(function(vis){
        vis.show("QV01");
        } );
        app.visualization.get('JPXamu').then(function(vis){
        vis.show("QV02");
        } );
        app.visualization.get('68ae8b51-deba-4158-b2b9-e167bee7d2b0').then(function(vis){
        vis.show("QV03");
        } );
        app.visualization.get(' 638dc443-e7d1-4934-b23e-d9075e05317a').then(function(vis){
        vis.show("QV04");
        } );
        app.visualization.get('71794456-cc5e-4e23-8b9d-131082af6e59').then(function(vis){
        vis.show("QV05");
        } );
        
    } );
});
