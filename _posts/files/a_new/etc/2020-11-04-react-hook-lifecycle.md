---
layout: post
title: 자꾸만 햇갈리는.. React hook 라이프사이클
categories: Etc
---

기존 class형 컴포넌트에서 함수형컴포넌트로 넘어오면서 hook들이 제공되었는데 이들이 호출되는 순서가 햇갈려 정리합니다.

## react hook 라이프사이클

처음에는 무조건 렌더링이 이루어집니다. 이후 useCallback이 메모리에 올라가게 되고, componentDidMount 와 동일한 시점에 useEffect 불리게 됩니다.

### useEffect

useEffect는 의존성 배열을 가질 수 있는데 있는 것과 없는 것은 차이는 리렌더시마다 호출할지, 최초 렌더링에 한번만 호출할지의 여부입니다. 초기 렌더링 이후에는 useEffect이 순서대로 불려지며 의존성 배열에 따른 상태 변화에 따라 렌더링이 이루어집니다. 의존성 배열을 가지지 않는 useEffect는 인라인 코드처럼 동작하지만 또 인라인 코드와의 차이는 렌더링 이후 인라인 코드는 바로 실행되는 반면 의존성 배열이 없는 useEffect는 의존성 배열을 가지는 useEffect 이후 실행됩니다.

우선순위를 정리해보면 다음과 같습니다.

- 인라인 코드(렌더시마다) > 의존성 배열을 가지는 useEffect(조건에 따라) > 의존성 배열을 가지지 않는 useEffect(렌더시마다)

```js
// 최초 렌더링 이후, useEffect는 정의된 순서대로 불린다.
useEffect(() => {
  console.log("useEffect []");
}, []);

useEffect(() => {
  console.log("useEffect [x]");
}, [x]);

useEffect(() => {
  console.log("useEffect");
});
```

## 정리

- render
- inline code
- useCallback []
- useEffect 정의된 순서에 따라 (useEffect [] / useEffect [x] / useEffect )
- (re-)render
- inline code: 렌더시 마다 호출
- useEffect [x]: x 상태 업데이트
- useEffect: 렌더시 마다 호출

```js
export default function App() {
  const [x, setX] = useState(null);
  console.log("render");

  console.log("inline code");

  useEffect(() => {
    animate2();

    console.log("useEffect []");
    setX("update state");
  }, []);

  useEffect(() => {
    console.log("useEffect [x]");
  }, [x]);

  useEffect(() => {
    console.log("useEffect");
  });

  const animate2 = useCallback(() => {
    console.log("useCallback []");
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://cloud.google.com/pubsub/docs/overview
