var fs = require('fs');
var mqtt = require('mqtt');
var util = require('util');
var ip = require("ip");

var wdt = require('./wdt');


const MQTT = () => {

        
    var btsuserid  = "qsoojinq@naver.com";    //  테스트베드에 등록된 사용자입니다.
    var req_topic  = util.format('/oneM2M/req/bts_broadcast/');
    var resp_topic = util.format('/oneM2M/resp/bts_broadcast/%s/', btsuserid);

    var connectOptions = {
            host: "210.94.199.225",    //  테스트베드 IP입니다.
            port: "1883",    //  테스트베드 port입니다.
            protocol: "mqtt",
            keepalive: 10,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 2000,
            connectTimeout: 2000,
            rejectUnauthorized: false
        };

    mqtt_client = mqtt.connect(connectOptions);

    mqtt_client.on('connect', function () {
        mqtt_client.subscribe(resp_topic);
        console.log('subscribe resp_topic as ' + resp_topic);

        sh_state = 'connecting';
    });

    mqtt_client.on('message', mqtt_message_handler);

    sh_state = 'connect';
    var return_count = 0;
    var request_count = 0;


    function mqtt_watchdog() {
        if(sh_state == 'connect') {
        }
        else if(sh_state == 'connecting') {
            var req_message = {};
            req_message['m2m:rqp']          = {};
            req_message['m2m:rqp'].op       = 'CONNECT';
            req_message['m2m:rqp'].userid   = btsuserid;
            
            sh_state = 'ready'

            mqtt_client.publish(req_topic, JSON.stringify(req_message['m2m:rqp']));
            console.log('mqtt (json) : ' + req_topic + ' : ' + JSON.stringify(req_message['m2m:rqp']) + ' ---->');
        }
    }

    wdt.set_wdt(require('shortid').generate(), 2, mqtt_watchdog);

    function mqtt_message_handler(topic, message) {
        
            var jsonObj = JSON.parse(message);

            if (jsonObj['m2m:dbg'] == null) {
                jsonObj['m2m:dbg'] = jsonObj;
            }

            if (jsonObj['m2m:dbg'].status === 'ERROR') {
                console.log(jsonObj);
                sh_state = 'connecting';
            }
            else 
            if (jsonObj['m2m:dbg'].status  === 'SUCCESS' && 
                jsonObj['m2m:dbg'].message === 'CONNECT'  ) {
                console.log('MQTT server connect OK');
                sh_state = 'ready';
            }
            else 
            if (jsonObj['m2m:dbg'].status === 'SUCCESS') {
                mqtt_message_action(jsonObj);
            }    
    }

    function mqtt_message_action(jsonObj) {

        /////////////////////////////////////////////////////////////////////////
        // 수신된 데이터 처리부분.
        /////////////////////////////////////////////////////////////////////////
        console.log('================================================================');
        console.log(JSON.stringify(jsonObj));
        console.log('----------------------------------------------------------------');
        console.log(jsonObj);

        return jsonObj;
    }


}


