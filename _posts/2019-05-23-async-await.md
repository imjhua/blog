

https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4

async/await의 기반이 promise라는 사실입니다.

사실, 우리가 쓰는 모든 async 함수는 promise를 리턴하고, 모든 await 함수는 일반적으로 promise가 됩니다.

제가 이걸 왜 강조하는걸까요? 왜냐하면 오늘날 쓰여지는 거의 모든 javascript 코드가 callback 패턴을 사용하기 때문입니다. 
즉, 많은 분들이 promise 를 안쓰신다는거죠. 그리고 그분들은 async/await 의 중요한 점을 놓치고 있습니다.
