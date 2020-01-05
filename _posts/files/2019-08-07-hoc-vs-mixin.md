---
layout: post
title: HOC와 Mixins 
categories: React
categories: TODO
---
https://joshua1988.github.io/vue-camp/reuse/mixins-vs-hoc.html



HOC는 리엑트의 함수형 프로그래밍에서 기반한 컴포넌트 개발 패턴입니다. 컴포넌트의 코드를 재사용하기 위한 방법이기도 하면서 캡슐화와 컴포넌트 추상화를 구현하는 방법이기도 합니다. 컴포넌트의 로직을 훼손하지 않고 재사용성을 최대한 끌어올리겠다는 전략이기도 합니다.




 HOC를 이욯아ㅕ 컴포넌트를 개발해 나가면, 상위와 하위컴포넌트 로직은 변경하지 않은 채 기능을 확장해 나갈 수 있습니다. 가장 간단한 예로는 상위컴포넌트에 특정 이미지를 로딩하기 위한 url만 주입하고, 하위에는 그 url을 뿌리기만 하면 됩니다. 

 단점으로는, HOC를 이용한 접근 방식은 컴포넌트의 레이어를 복잡하게 만듭니다. 컴포넌트의 props, event등을 넘겨야 하는 코드가 많아집니다. 이에 비해 mixins는 문법도 간단하고 입문자에게 버거운 HOC 사고방식을 하지 않아도 되는 이점이 있습니다. 
 
 장점은, 물론 컴포넌트 기능 테스트 측면에서는 HOC가 mixins보다 유리합니다. 관심사의 분리라는 측면에서는 컴포넌트의 역할이 깨끗이 분리가 되면서 기능을 확장할 수 있기 떄문입니다.


믹스인의 단점.
믹스인은 암시적 의존성을 만듭니다. 


----
해당 내용은 다음 글을 참고 하였습니다.
- https://joshua1988.github.io/vue-camp/reuse/mixins-vs-hoc.html
- https://reactjs-kr.firebaseapp.com/blog/2016/07/13/mixins-considered-harmful.html