

https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e

https://hoorooroob.tistory.com/entry/React-React-Naive-TIPS-axios-%EC%99%80-fetch-%EC%96%B4%EB%96%A4-%EA%B2%83%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C



- https://medium.com/@shlee1353/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-async-await-promise-ae659eb1cb7e
- 

ES8에서 일어나고 있는일, async/await
자바스크립트 ES8에서는 프로미스 사용을 쉽게 해주는 async/await을 도입했습니다. async/await가 제공하는 가능성들을 짧게 살펴 보고 비동기 코드를 작성하기 위해 어떻게 사용할 수 있는지 살펴보겠습니다.

그럼 먼저 async/await이 어떻게 작동하는지 보겠습니다.

먼저 async 함수 선언을 통해 비동기 함수를 정의합니다. 이렇게 생성된 함수는 AsyncFunction 객체를 반환합니다. AsyncFunction 객체는 해당 함수 내에 포함되어 있는 코드를 수행하는 비동기 함수를 나타냅니다.

이렇게 만들어진 비동기 함수가 호출 되면 이것은 프로미스를 반환합니다. 비동기 함수가 프로미스가 아닌 값을 반환하면, 프로미스는 자동으로 생성되며 해당함수로 부터 반환 받은 값을 이행합니다. 이 async 함수가 예외를 던지면 프로미스는 그 던져진 값과 함께 거절됩니다.

async 함수는 await 구문을 포함할 수 있는데 이를 이용하면 함수의 수행을 멈추고 프로미스의 이행 값이 넘어오기를 기다렸다가 async 함수의 수행을 계속해서 이어가다가 마지막에는 이행된 값을 반환할 수 있습니다.

자바스크립트의 프로미스는 자바의 Future 혹은 C#의 Task와 비슷하다고 볼 수 있습니다.

async/await의 목적은 프로미스의 이용을 쉽게하는 것입니다.
다음 예제를 살펴봅시다:


위와 유사하게 예외를 던지는 함수들은 거절된 프로미스를 반환하는 함수와 동일합니다.


await 키워드는 async 함수 내에서만 사용될 수 있으며 동기적으로 프로미스를 기다릴 수 있도록 해줍니다. 만약 우리가 async 밖에서 프로미스를 사용하면 여전히 then 콜백을 사용해야 합니다.


“비동기 함수 표현식”을 통해서 비동기 함수를 정의할 수도 있습니다. 비동기 함수 표현식은 비동기 함수문과 매우 비슷하고 거의 동일한 문법을 갖고 있습니다. 주된 차이점은 비동기 함수에서는 함수 이름을 생략할 수 있다는 점입니다. 비동기 함수도 정의 되는 즉시 수행되는 IIFE(Immediately invoked function expression — 즉시실행 함수구문)처럼 사용될 수 있습니다.

다음 예제를 살펴 보겠습니다:


또 한 가지 중요한 점은 async/await이 모든 메이저 브라우저에서 지원된다는 점입니다.


만약 이와 같은 호환성으로도 부족하다면 바벨이나 타입스크립트 같은 몇 가지 트랜스파일러를 사용할 수 있습니다.
결국 중요한 것은 비동기 코드 작성을 위해 무작정 ‘최신의' 방식만을 따르지 않는 것입니다. 그 보다는 비동기 자바스크립트가 어떻게 동작하는지를 이해하고 선택한 메소드의 내부를 깊이 이해하는 것이 중요합니다. 프로그래밍의 다른 부분들이 그렇듯이 모든 접근 방식에는 장점과 단점이 있습니다.

https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4

async/await의 기반이 promise라는 사실입니다.

사실, 우리가 쓰는 모든 async 함수는 promise를 리턴하고, 모든 await 함수는 일반적으로 promise가 됩니다.

제가 이걸 왜 강조하는걸까요? 왜냐하면 오늘날 쓰여지는 거의 모든 javascript 코드가 callback 패턴을 사용하기 때문입니다. 
즉, 많은 분들이 promise 를 안쓰신다는거죠. 그리고 그분들은 async/await 의 중요한 점을 놓치고 있습니다.
