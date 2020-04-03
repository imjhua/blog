---
layout: post
title: Express 시작하기 
categories: Nodejs
---

자바스크립트 런타임인 Nodejs를 사용할때에, HTTP서버를 직접 구현하는 대신 웹 서버에서 필요한 대부분의 기능이 이미 구현된 Express 웹프레임워크를 주로 사용합니다. Express에는 라우팅, 세션, 템플릿 등 웹 애플리케이션을 만들기 위해 필요한 기능들이 구현되어 있기 때문에 가져다만 쓰면 됩니다. (Express 이외에도 다양한 웹 프레임워크가 존재합니다)

## Express 서버 
Node 자바스크립트 런타임에서 Express로 HTTP서버를 띄워봅시다.

### 설치
express 모듈을 설치 합니다.

```sh
$ npm init
$ npm install -S express
```

### 서버 띄우기
다음과 같이 express앱을 생성하여 서버를 띄우기 위한 코드를 작성합니다.

```js
// main.js

var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello');
});

app.listen(3000, function(){
  console.log('Express App is listening on port 3000');
})
```

node로 실행합니다.
```sh
$ node main.js
```

브라우저에 내용을 확인 합니다.
```
http://localhost:3000/
```


### 기본 라우팅 
라우팅 설정은 다음과 같습니다.

```
app.METHOD(PATH, HANDLER)
``` 
- MHETHOD: HTTP요청 메소드 get, post, delete, pul 
- PATH: 라우드 경로 
- HANDLER: 실행 될 콜백 함수


### 예

#### 동적인 값을 받아 파라미터를 전달 받는을 수 있다.
```js
app.get('/:id', function(req, res) {
    res.send('Received a GET request, param: ' + req.params.id);
});

```

#### 응답으로 json을 만들 수 있다.
```js
  res.json({ 
        success: true,
        user: req.body.username
  });
```
#### HTTP Status 코드를 정의 할 수 있다.
```js
  res.status(400).json({ message: 'Hey, you. Bad Request!' });
```


### 라우트 모듈화
한 파일이 커지는 것을 방지하고 코드를 나눔으로써 가독성과 유지 보수를 위해 모듈화를 합니다. 모듈화하기 위해 라우트 객체를 생성 후 내보내기를 합니다.

```js
//routes/user.js

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('User');
});

module.exports = router;
```

express 객체의 use 함수를 사용하여 라우트 모듈을 불러옵니다.

```js
// main.js

var express = require('express');
var app = express();
var user = require('./routes/user');
app.use('/user', user);
```

브라우저에서 내용을 확인합니다.
```
http://localhost:3000/user
```


## 미들웨어 함수
요청 오브젝트(req), 응답 오브젝트(res),  그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수에 대한 액세스 권한을 갖는 함수 입니다. 미들웨어를 통해 Express에서 제공하지 않는 기능들을 직접 구현하거나 끼워 넣을 수 있습니다.

- Express: HTTP 요청 -> `미들웨어` -> 라우트 작업 -> HTTP 응답

### 미들웨어 만들기
미들웨어 또한 콜백 함수 입니다. 다음 console.log는 터미털에서 실행한 경우, 터미널에서 프린트 될 것입니다.

```js
var myLogger = function(req, res, next) {
    console.log(req.url);
    next(); // callback
};

app.use(myLogger);
```

### 미들웨어 모듈 사용하기
다음 미들웨어를 npm으로 설치 합니다.
```sh
$ npm install -S morgan body-parser 
```
- morgan: 로깅 미들웨어 
- body-parser: JSON형태 데이터 파싱


### 미들웨어 사용
morgan의 로깅 옵션을 사용합니다. 

```js
var morgan = require('morgan');

app.use(morgan('dev'));
```

morgan의 리파지토리를 보려면 다음 명령어를 실행합니다.
```sh
$ npm repo morgan
```

bodyParse 미들웨어도 적용해 봅니다. 이 미들웨어는 json바디를 읽을 수 있도록 설정합니다.
```js
app.use(bodyParser.json());
```

bodyParse미들웨어를 적용하면 post호출에서 전달한 body를 json형태로 읽을 수 있습니다.
```js
router.post('/', function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));

    res.json({ 
        success: true,
        user: req.body.username
    });
});

```


## nodemon
변화를 감지하여 스스로 재 시작을 해주는 모듈입니다.

다음으로 설치합니다.
```sh
$ npm install -g nodemon
```

다음으로 실행합니다. 
```sh
$ nodemon main.js
```

## 정적 파일 제공
app.use를 통해 정적 파일 디렉토리와 경로를 설정해 줍니다.

```js
//main.js

app.use('/', express.static('public')); // '/'경로의 우선권을 갖는다.

// app.get('/', function(req, res){
//   res.send('Hello!');
// });
```

public 디렉토리의 html은 다음과 같이 브라우저에서 접근 할 수 있습니다.

```
http://localhost:3000/about.html
```

----
해당 내용은 다음 글을 참고 하였습니다.
- https://bitbucket.org/velopert/express-tutorial/src/master/