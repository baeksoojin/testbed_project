import React,{useState} from 'react';
import { firebaseDB } from './firebase';
//import Wsc from './radar/wsc';
//import MQTT from './radar/mqtt';

const ShowData = () =>{


  const[cnt,setCnt] = useState(0);

  const ShowCount = (event) =>{

    event.preventDefault();
    //3. firebase에서 count(객체카운팅 결과값)데이터 읽어오기
    const data = firebaseDB.ref('/data')
    .once('value', function (snap) {
      for (var i in snap.val()) {
          console.log(snap.val()[i].count);
      }
      setCnt(snap.val()[i].count);
    })//ref의 뒤에 realtimeDB의 속성을 적으면 됨.

    // 참고) 3.번코드는 데이터를 지우며 가장 최근값만 저장해서 사실 for문을 안 돌려도 되지만, 과거 데이터를 사용할 일이 생길때를 대비해 for문으로 작성함.
    

  }



  return(
    <div className="test">
      <form onSubmit={ShowCount}>
          <button type="submit" >병원 혼잡도 보기</button>
      </form>
      <p>{cnt}명이 있습니다.</p>
    </div>
  )
}

export default ShowData;
