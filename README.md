# testbed_project

## 1. FMCW RADAR 센서 데이터 처리 (websocket)방식

#### 1-1. wsc.js를 통해 testbed서버에서 radar센서 데이터를 받아서 firebase에 저장

###### npm install
- package.json 경로에서
``` c
npm i
```
- websocket 방식
>> npm i fs;
>> npm i os;
>> npm i ip;
>> npm i websocket;
>> npm i shortip;

- firebase 사용
>> npm i firebase

###### 사용자 등록 및 testbed ip, port번호 입력
wsc.js
- usebtswshost         = "210.94.199.225";    //  테스트베드 IP입니다.
- usebtswsport         = "3233";    //  테스트베드 port입니다.
- usebtswslocaluserid  = USERID;    //  테스트베드에 등록된 사용자입니다.

###### wsc.js실행

>> 명령어
- websocket통신을 실행
``` c
>> cd radar
>> node wsc
```

>> 코드설명
- firebase realtimeDB이용
``` c
var firebase = require('firebase/compat/app');
require('firebase/compat/database');//database사용
```

- count 속성을 추가해 객체 카운팅 결과를 jsonObj에 저장
``` c
    radar_data['m2m:dbg']['message']['count'] = radar_data['m2m:dbg'].message.SenValue.length; 
```

- jsonObj를 firebase에 저장
``` c
    firebaseDB.ref('/').child('data').push(message);
```

#### 1-2. 사용자가 버튼을 클릭하면 객체카운팅 결과 보여주기


###### ShowData.js실행

>> 명령어
``` c
>> cd testbed
>> npm start
```

>> 코드설명

- firebase에 저장된 객체카운팅 결과를 가져와 cnt 변수에 저장
``` c
    const data = firebaseDB.ref('/data')
    .once('value', function (snap) {
      for (var i in snap.val()) {
          console.log(snap.val()[i].count);
      }
      setCnt(snap.val()[i].count);
    })//ref의 뒤에 realtimeDB의 속성을 적으면 됨.

    // 참고) 데이터를 지우며 가장 최근값만 저장해서 사실 for문을 안 돌려도 되지만, 과거 데이터를 사용할 일이 생길때를 대비해 for문으로 작성함.
    

  }
```
- 버튼 클릭으로 혼잡도 체크
``` c
  <form onSubmit={ShowCount}>
      <button type="submit" >병원 혼잡도 보기</button>
  </form>
  <p>{cnt}명이 있습니다.</p>
  }
```

#### 2. 실행화면

###### cd testbed -> npm start

1. testbed -> firebase
<img width="1433" alt="스크린샷 2022-02-09 오전 1 58 36" src="https://user-images.githubusercontent.com/74058047/153045897-923d68fb-5dcc-4c24-aa02-7bf199e281c7.png">
[참고] 해당사진은 radar센서에 객체가 인식되지 않을 때, ready상태에서 임의로 결과를 넣어주고 돌린 결과입니다. 따라서 객체 인식의 경우를 test하고 싶다면 141-150줄을 주석처리후 테스트를 진행하면 됩니다.

2. firebase -> react app에서 count (객체 카운팅 변수값) 출력
<img width="1475" alt="스크린샷 2022-02-09 오전 2 06 00" src="https://user-images.githubusercontent.com/74058047/153046515-3d46ed60-0b70-4319-b175-45252a229a11.png">



 
