import React,{useState} from 'react';
import { firebaseDB } from './firebase';
import Wsc from './radar/wsc';
// import MQTT from './radar/mqtt';

const SaveData = () =>{

    const save = () =>{
        console.log('testbed실이 아닌 곳에서');
    
        //데이터셋을 불러와서 실시간으로 넣는 코드
        // const radar_data = MQTT(); => 학교 밖에서는 안 됨.

        //------------------------------------샌서 데이터 불러오기와서 가공후 firebase realtimeDB에 저장----------------------------------------------

        const radar_data = {
            'm2m:dbg': {
            status: 'SUCCESS',
            message: {
                SenMngNo: '000200000000000029',
                SenDateTime: '20220207135212',
                SenValue: '[{"MsgID":1,"TargetID":2,"PositionX":0,"PositionY":7,"PositionZ":0,"BPM":117,"HBR":46,"Therm":0,"rsv":0,"Engergy":5575,"Point":0,"Type":0,"status":1,"v1":0,"v2":0,"y1":0,"y2":0}]'
            }
            }
        }

        //1. count 속성 정의하기 => object에서 Senvlaue값의 데이터의 배열 길이를 체크해 lenght로 저장.
        
        const senvalue = JSON.parse(radar_data['m2m:dbg'].message.SenValue); // Senvalue값을 string -> json
        radar_data['m2m:dbg'].message.SenValue = senvalue // 기존의 SenValue string값을 obj로 변경한 것을 저장
        radar_data['m2m:dbg']['message']['count'] = radar_data['m2m:dbg'].message.SenValue.length; // count속성을 추가해서 배열의 길이를 카운팅된 객체로 저장.
        console.log(radar_data['m2m:dbg'].message.count);

        //2. firebase에 message값을 저장
        const message = radar_data['m2m:dbg'].message;
        console.log(message);
        firebaseDB.ref('/').remove(); // 가장 최근의 데이터만 필요하기때문에 이젠 데이터 내용은 지움.
        firebaseDB.ref('/').child('data').push(message);
        // =>다음의 명령어를 통해서 json 배열로 불러와지는 message값을 넣을 수 있음.

        // while(true){

        //     function sleep(ms) {
        //         return new Promise((r) => setTimeout(r, ms));
        //     }
    
        // 사용할 코드 작성.

        //     sleep(1000000); //1000 = (1초)마다 반복 [console.log로 잘 들어가고 있는지 체크해야해서 100초마다 서버 체크]
        // } => sleep()이 제대로 이루어지고 있지 않음 ->  수정 예정

    }

   
   save();

    /*

    firebase에 저장되는 데이터 형태. 


    data
        -MvISqHgxVzwYmogx2fS
        SenDateTime: 
            "20220207135212"
        SenMngNo: 
            "000200000000000029"
        -SenValue // 클릭하면 배열 번호가 나오고 배열에 들어가면 레이더가 추적한 사람의 움직임에 대한 데이터값들이 저장되어있음
        count: 
            1

    */
   
    return(
        <div className="putdata_test">
        <p>server작동중</p>
        </div>
    )


    
}

export default SaveData;
