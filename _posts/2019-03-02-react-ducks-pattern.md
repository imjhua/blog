---
layout: post
title: Ducks Pattern
categories: React
---

Redux 공식 문서에서는, ActionType, Action, Reducer 이 3가지 모듈을 따로 나누어 작업합니다. 그러다보니, 하나의 액션을 추가하려면 3개의 다른 파일들을 수정해야하는 번거로움이 생깁니다. 상태관리를 편하게 하자고 리덕스를 사용하는건데 오히려 더 복잡해지는것 같기도 합니다. Ducks 패턴을 이용하면 함께 작업이 이루어 지는 파일들을 하나로 합쳐 사용하고, 다라서 관련 모듈들을 무척 단순하게 작성할 수 있습니다.


## Ducks Pattern
Ducks 구조에는 Reducer 파일 안에 ActionType(액션타입)과 ActionCreator(액션생성자 함수)를 함께 넣어서 관리하고 이를 '모듈' 이라고 부릅니다. 실제로 컴포넌트에서도 액션 크리에이터를 사용해 액션을 생성하지, 액션의 타입을 직접 알 필요는 없습니다. Duck Pattern의 포인트는, string으로 선언된 Action type이 알고보면 대부분 action creator와 reducer에서만 쓰일텐데 굳이 파일을 쪼개어 import/export하는 작업을 하는 대신, 굳이 파일을 쪼개지 않는 다는 것입니다.

### 규칙
액션 타입을 만들때에는 액션 이름이 중첩되지 않도록 하기 위해 다음과 같이 접두사를 붙여주는 것이 좋습니다. 

```js
[module-or-app]/reducer/ACTION_TYPE
```


리듀서, 액션, 액션타임을 다같이 작성할때에, 리듀서는 export default 로 내보내고, 액션생성자는 export 로 내보내주도록 합니다.


### 파일 구조
이전에 관리하던 types, actions, reducers 대신 이들을 하나로 합쳐 modules 라고 정의 합니다. 모듈을 불러 올떄는 다음과 같이 사용합니다.

```js
import reducers from '@modules';
import * as actions from '@modules';
```

## 단점
코드 작성이 간단해 보이지만 이또한 단점이 존재 합니다. 모듈 하나 하나의 크기가 꽤 커지게 되면, 하나로 합쳐진 코드를 한눈에 보기 어려울 수 있습니다. 특히, 비동기 처리를 담당하면서  요청 보냄, 성공, 실패로 구분하기 위한 액션 타입이 request / succeeded / failed 등으로 세분화 되면서 액션과 비동기 처리를 담당하는 미들웨어(예를 들면 thunk나 saga)의 모듈 크기가 커지게 됩니다. 

----
해당 내용은 다음 글을 참고 하였습니다.
- https://github.com/erikras/ducks-modular-redux