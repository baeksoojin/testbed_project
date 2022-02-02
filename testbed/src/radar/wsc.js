var fs = require('fs');
var os = require('os');
var ip = require("ip");
var WebSocketClient = require('websocket').client;

var wdt = require('./wdt');




const Wsc=()=>{

    var usebtswslocalip;
    var protocol;
    var ws_connection;

        
    var WS_SUBSCRIPTION_ENABLE = 0;

    var usebtswshost         = "210.94.199.225";    //  테스트베드 IP입니다.
    var usebtswsport         = "3233";    //  테스트베드 port입니다.
    var usebtswslocaluserid  = "qsoojinq@naver.com";    //  테스트베드에 등록된 사용자입니다.

    var sh_state = 'connect';
    console.log(sh_state);

    var ifaces = os.networkInterfaces();

    console.log(ifaces);

    

    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function(details) {
            return details.family === 'IPv4' && details.internal === false;
        });


        if(iface.length > 0) {
            usebtswslocalip = iface[0].address;
            console.log('local ip address : ' + usebtswslocalip);
            
        }
        
        
    }

    function ws_watchdog() {
        if(sh_state == 'connect') {
            ws_connect(usebtswshost);
            console.log("______connect");
        }else if(sh_state == 'connecting') {
            console.log("--------------------------connecting");
            var req_message = {};
            req_message['m2m:rqp']          = {};
            req_message['m2m:rqp']          = {};
            req_message['m2m:rqp'].op       = 'CONNECT';
            req_message['m2m:rqp'].userid   = usebtswslocaluserid;
            
            sh_state = 'ready'

            ws_connection.sendUTF(JSON.stringify(req_message['m2m:rqp']));
            console.log('websocket (json) ' + JSON.stringify(req_message['m2m:rqp']) + ' ---->');
        }
    }

    var ws_client        = null;
    global.ws_connection = null;
    wdt.set_wdt(require('shortid').generate(), 1, ws_watchdog);

    function ws_connect(ws_ip) {
        ws_client = new WebSocketClient();

        // console.log(ws_client);

        protocol = 'onem2m.r2.0.json';

        ws_client.connect('ws://'+ws_ip+':'+usebtswsport, protocol);
        //  console.log(ws_client);

        ws_client.on('connectFailed', function (error) {
            console.log("(---------------------------connecting error)");
            console.log('Connect Error: ' + error.toString());
            ws_client.removeAllListeners();

            sh_state = 'connect';
        });

        ws_client.on('connect', function (connection) {
            console.log('----------------------------WebSocket Client Connected');
            ws_connection = connection;
            sh_state = 'connecting';

            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString());
                sh_state = 'connect';
            });
            connection.on('close', function () {
                console.log('echo-protocol Connection Closed');
                sh_state = 'connect';
            });
            
            connection.on('message', ws_message_handler)
        });
    }

    function ws_message_handler(message) {

        if(message.type === 'utf8') {

            console.log('"""""""""""""""""""""""""""here');
            
            var protocol_arr = this.protocol.split('.');
            var bodytype = protocol_arr[protocol_arr.length-1];

            var jsonObj = JSON.parse(message.utf8Data.toString());

            //console.log(jsonObj['m2m:dbg']);

            if (jsonObj['m2m:dbg'] == null) {
                jsonObj['m2m:dbg'] = jsonObj;
            }

            if (jsonObj['m2m:dbg'].status === 'ERROR') {
                console.log(jsonObj);
                sh_state = 'connect';
            }
            else 
            if (jsonObj['m2m:dbg'].status  === 'SUCCESS' && 
                jsonObj['m2m:dbg'].message === 'CONNECT'  ) {
                console.log('Socket server connect OK');
                sh_state = 'ready';
            }
            else 
            if (jsonObj['m2m:dbg'].status  === 'SUCCESS') {
                ws_message_action(jsonObj);
            }
        }
        else if(message.type === 'binary') {

        }
    }


    function ws_message_action(jsonObj) {

        /////////////////////////////////////////////////////////////////////////
        // 수신된 데이터 처리부분.
        /////////////////////////////////////////////////////////////////////////
        console.log('================================================================');
        console.log(JSON.stringify(jsonObj));
        console.log('----------------------------------------------------------------');
        return jsonObj;    
    }
}


export default Wsc;