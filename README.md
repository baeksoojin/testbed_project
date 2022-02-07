# testbed_project

## 1. FMCW RADAR 센서 데이터 처리 (websocket)방식
#### [websocket방식]: https://www.notion.so/radar-bb12b65437a84520a43259a163288164

## 2. FMCW RADAR 센서 데이터 처리 (mqtt)방식

#### 2-1. mqtt.js를 통해 testbed서버에서 radar의 실시간 데이터를 불러오기

###### npm i ( testbed_project폴더 경로에서 진행)
- npm i fs;
- npm i mqtt;
- npm i util;
- npm i ip;

###### 사용자 등록 및 testbed ip, port번호 입력
- btsuserid = USERID ;  // 테스트베드에 등록된 사용자입니다.
- host: "210.94.199.225",    //  테스트베드 IP입니다.
- port: "1883",    //  테스트베드 port입니다.

#### 2-2. firebase에 radar 데이터 저장
testbed실이 아닌 외부에서 접속을 하기 위해서, testbed실에서 불러온 데이터를 활용해 타이머를 설정해 루프를 돌리며 진행

###### SaveData.js실행
- count 속성을 추가해 객체 카운팅 결과를 jsonObj에 저장
``` c
    radar_data['m2m:dbg']['message']['count'] = radar_data['m2m:dbg'].message.SenValue.length; 
```

- jsonObj를 firebase에 저장
``` c
    firebaseDB.ref('/').child('data').push(message);
```

#### 2-3. 사용자가 버튼을 클릭하면 객체카운팅 결과 보여주기


###### ShowData.js실행

- count 속성을 추가해 객체 카운팅 결과를 jsonObj에 저장
``` c
radar_data['m2m:dbg']['message']['count'] = radar_data['m2m:dbg'].message.SenValue.length; 
```

- firebase에 저장된 객체카운팅 결과를 cnt 변수에 저장
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

#### 2-4. 서버실행

###### cd testbed -> npm start

1. 버튼 클릭전
<img width="902" alt="스크린샷 2022-02-07 오후 6 39 04" src="https://user-images.githubusercontent.com/74058047/152772132-499e5d7c-a5d9-4f4a-a9c7-9d4585dca4db.png">

2. 버튼 클릭 후 
<img width="900" alt="스크린샷 2022-02-07 오후 6 39 13" src="https://user-images.githubusercontent.com/74058047/152772164-a0247521-f9dc-47cb-aefe-e6e2f2193232.png">

[참고] 해당사진은 무한루프를 돌리기 전 하나의 js파일에서 적용시켜본 캡처본입니다.
#### [mqtt방식]: https://www.notion.so/mqtt-5a30c72687174bdfa0ca63c57da0feb1

 
