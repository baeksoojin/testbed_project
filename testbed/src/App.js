import React,{useState} from 'react';
import { firebaseDB } from './firebase';
import Wsc from './radar/wsc';

const App = () =>{

  const [TargetId, setTargetId] = useState('');

  //1. 데이터를 실시간으로 testbed에서 불러옴
  //const json_data = Wsc();

  //2. testbed데이터를 firebase에 넣기
  const SenValue = [{"MsgID":1,"TargetID":3,"PositionX":253,"PositionY":49,"PositionZ":0,"BPM":257,"HBR":121,"Therm":0,"rsv":0,"Engergy":1230,"Point":0,"Type":0,"status":2,"v1":0,"v2":0,"y1":0,"y2":0},{"MsgID":1,"TargetID":7,"PositionX":18,"PositionY":46,"PositionZ":0,"BPM":257,"HBR":168,"Therm":0,"rsv":0,"Engergy":20412,"Point":0,"Type":0,"status":2,"v1":0,"v2":0,"y1":0,"y2":0}];
  firebaseDB.ref('/').push(SenValue);
  // =>다음의 명령어를 통해서 json 배열로 불러와지는 SenValue를 넣을 수 있음.

  //3. 데이터 불러와서 활용하기=> 사진참고
  const data = firebaseDB.ref('/-MuuDr5xfAryecNdUc8d/0')
  .once('value', function (snap) {
    for (var i in snap.val()) {
        console.log(snap.val()[i])
    }
  })//ref의 뒤에 realtimeDB의 속성을 적으면 됨.

  return(
    <div className="test">
      <p>testing중</p>
    </div>
  )
}

export default App;
