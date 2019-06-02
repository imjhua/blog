---
layout: post
title: Ducks 패턴 
tags:
 - react-duck
categories: TODO
---
https://medium.com/@FourwingsY/redux-redux-saga-%EB%A1%9C-async-%EB%8B%A4%EB%A3%A8%EA%B8%B0-b7b9a9110356
## 소개
Redux를 쓰기로 결정한 후 구조를 어떻게 잡을지 고민하다가, ducks pattern을 보고 이 구조를 따라가기로 했다. 이 패턴의 포인트는 string으로 선언된 Action type이 알고보면 대부분 action creator와 reducer에서만 쓰일텐데, 굳이 파일을 쪼개어 import/export하는 작업을 해야 하냐는 관점이다. 실제로 connect된 컴포넌트에서도 액션 크리에이터를 사용해 액션을 생성하지, 액션의 타입을 직접 알 필요는 없다. 때문에 Ducks 패턴을 사용한 모듈들을 무척 단순하게 작성할 수 있었다.


하지만 지금은 이 패턴을 더이상 쓰고 있지 않다. 모듈 하나 하나의 크기가 꽤 커져서, 코드를 한눈에 보기 어려워졌기 때문이다. ducks 모듈은 액션, 액션 크리에이터, 리듀서, 사가로 나누어졌고, index.ts 파일에서 import/export되었다. 모듈의 크기가 커진 데에 가장 큰 이유는 async한 액션을 다루기 시작하면서 액션과 사가가 단순하지 않아졌기 때문이다.






----
해당 내용은 다음 글을 참고 하였습니다.
- https://github.com/erikras/ducks-modular-redux