---
layout: post
title: 브라우저가 렌더링 할 수 있는 만큼만 렌더링하기 (스크롤 이벤트 최적화를 위한 Throttle - rAF사용)
categories: Web
---

과도한 이벤트 횟수의 실행으로 이벤트 핸들러가 무거운 계산 및 기타 DOM 조작과 같은 작업을 수없이 많이 수행하는 경우 성능 문제가 발생하고 이는 사용자 경험까지 떨어뜨리게 됩니다. 이벤트 성능을 최적화하는 기법의 하나로 throttle이 이 있는데 스크롤이벤트에서 rAF(requestrAnimationFrame)사용하여 throttle하는 방법을 알아봅니다.

## Throttle

Throttle 는 여러번 발생하는 이벤트를 일정 시간 동안, 한번만 실행됩니다. 특성 자체가 실행 횟수에 제한을 거는 것이기 때문에 일반적으로 성능 문제 때문에 많이 사용합니다. 스크롤을 올리거나 내릴 때 scroll 이벤트 핸들러 경우에 매우 많이 발생합니다. scroll 이벤트가 발생할 때 뭔가 복잡한 작업을 하도록 설정했다면 매우 빈번하게 실행되기 때문에 큰 버퍼링이 걸릴 지도 모를 것입니다. 그럴 때 쓰로틀링을 사용할 수 있습니다. 몇 초에 한 번, 또는 몇 밀리초에 한 번씩만 실행되게 제한을 두는 것입니다.

## rAF(requestrAnimationFrame)

window.requestAnimationFrame()은 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 합니다. 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받습니다. DOM의 위치와 길이, 크기등이 다시 계산되는 리플로우 과정을 거친 후에야 가시성에 영향을 주는 DOM의 수정이 있을때 발생하는 리페인트가 진행되기 전에 호출합니다. 즉 화면에 새로운 애니메이션을 업데이트할 준비가 될때마다 이 메소드를 호출하는것이 좋습니다.

```js
const animate = function (time: number) {
  console.log(time);
};
// animate();
requestRef.current = requestAnimationFrame(animate);
console.log(requestRef.current);
return () => cancelAnimationFrame(requestRef.current);
```

requestAnimationFrame(callback)의 콜백 함수에는 requestAnimationFrame()이 콜백 함수 실행을 시작할 때의 시점을 나타내는 performance.now() 에 의해 반환되는 것과 유사한 DOMHighResTimeStamp 단일 인자가 전달됩니다.

### 브라우저 렌더링 순서

브라우저 렌더링 순서는 다음과 같습니다.

1. DOM트리 생성
2. 스타일 구조체 생성
3. 렌더트리 생성
4. 레이아웃 처리 -> 리플로우(위치와 길이, 크기 등을 다시 계산)
5. 페인트 -> 리페인트(가시성에 영향을 줌)
6. 합성

## 브라우저가 렌더링 할 수 있는 만큼만 렌더링하기

브라우저가 렌더링할 수 있는 능력만큼만 스크롤 이벤트핸들러가 동작할 수 있다면 어떨까요? 브라우저는 60fps(초당 60회)로 화면을 렌더링합니다. 1프레임당 약 16.67(17ms)정도가 걸립니다. 이를 보장하기 위해 rAF(requestrAnimationFrame)를 사용할 수 있습니다.

참고) 프레임 드랍
초당 표시되는 프레임의 숫자는 화면(UI)이 얼마나 매끄럽고 실제와 비슷하게 보이는지에 대해 직접적인 영향을 끼칩니다. 대부분의 요즘 디스플레이는 초당 60프레임을 표시합니다. 이는 사용자와 16.67ms 내에 한 정적 이미지(프레임)를 생성하는 모든 작업이 끝나야 된다는 의미이기도 합니다. 만약 16.67ms 내에 해당 프레임을 생성하지 못한다면 프레임 드랍이 발생하고, UI가 멈춘 것처럼 보이게 됩니다.

## 적용

requestAnimationFrame를 적용하는 두가지 방법이 있습니다.

- 특정 조건에 맞는 경우 실행 후 clear
- 반복적으로 호출하다가 특정 조건에 맞는 경우 실행(재귀). 반족적으로 호출하고 clear

```js
// 특정 조건에 맞는 경우 실행

let last_known_scroll_position = 0;

function doSomething(scroll_pos) {
  // scroll 위치에 대한 작업
}

window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  // 스크롤 할 때마다 requestAnimationFrame로 요청한다.
  window.requestAnimationFrame(function () {
    doSomething(last_known_scroll_position);
  });
});

// 반복적으로 호출
function draw() {
  // Drawing code goes here
  requestAnimationFrame(draw);
}

draw();
```

#### 특정 조건에 맞는 경우 리팩토링

requestAnimationFrame을 호출하면 애니메이션 프레임이 계속 쌓이게 됩니다. 브라우저가 렌더리아 할수 있는 능력에 맞춰 콜백이 실행될텐데, 만약 요청이 기다리고 있는 상태라면 cancelAnimationFrame으로 애니메이션 요청을 취소 할 수 있습니다. 요청 콜백은 함수가 생성된 상태이기 때문에 불필요한 경우 요청을 취소하여 메모리에서 정리하도록 합니다.

따라서 다음과 같이 요청후 바로 취소를 하면 콜백은 실행되지 않습니다.

```js
let requestId = requestAnimationFrame(() => console.log("Hello World!"));
cancelAnimationFrame(requestId);
```

콜백실행완료를 나태내는 플래그 적용하는 것과 요청을 취소하는 코드를 추가해 보겠습니다.

```js
// 콜백실행완료를 나태내는 플래그 적용
// tick 변수로 콜백이 다 실행되었음을 나타낸다.
// 콜백이 다 실행되었으므로 다음 애니메이션 프래임 요청을 받을 수 있는 상태이다.

let rAF = 0;
window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

// cancelAnimationFrame
window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (rAF) {
    cancelAnimationFrame(rAF);
  }
  rAF = window.requestAnimationFrame(function () {
    doSomething(last_known_scroll_position);
  });
});
```

### 코드 예

DOM의 리플로우를 발생시키는 엘리먼트의 뷰포트에 대한 좌표값을 계산하는 getBoundingClientRect()를 호출하는 코드를 두가지 형태로 작성해보았습니다.

- 스크롤 이벤트시마다
- 백그라운드 계속 요청

```jsx
// 스크롤이벤트 핸들러로 요청하는 경우
function raf(cb) {
  let rAFId = 0;
  return function () {
    if (rAFId) {
      cancelAnimationFrame(rAFId);
    }
    rAFId = requestAnimationFrame(cb);
  };
}

export function useViewPort(sectionRef, defaultValue) {
  const [inViewPort, setViewPort] = useState(defaultValue);

  const checkViewPort = useCallback(
    function () {
      const { top } = sectionRef.current.getBoundingClientRect();
      // 뷰포트에 없고
      // 브라우저 창 전체 높이에서 30을 제외한 위치에서
      // 엘리먼트의 top이 들어 오는 경우
      // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
      console.log(inViewPort);
      if (!inViewPort && top < window.innerHeight - 30) {
        setViewPort(true);
      }
    },
    [inViewPort, sectionRef]
  );

  useEffect(() => {
    requestAnimationFrame(checkViewPort);
    window.addEventListener(
      "scroll",
      raf(function () {
        if (inViewPort) checkViewPort();
      })
    );
    return () =>
      window.removeEventListener(
        "scroll",
        raf(function () {
          if (inViewPort) checkViewPort();
        })
      );
  }, [inViewPort, checkViewPort]);

  return inViewPort;
}

// 애니메이션 계속 요청하는 경우(특정 조건에서 콜백 발생)
export function useViewPort(sectionRef, defaultValue) {
  const [inViewPort, setViewPort] = useState(defaultValue);

  let rAFId = useRef(0);

  const checkViewPort = useCallback(
    function () {
      const { top } = sectionRef.current.getBoundingClientRect();
      // 뷰포트에 없고
      // 브라우저 창 전체 높이에서 30을 제외한 위치에서
      // 엘리먼트의 top이 들어 오는 경우
      // 뷰포트 안에 들어오면 뷰포트를 체크하여 로직이 계속 실행되는 것을 막는다.
      console.log(inViewPort);
      if (!inViewPort && top < window.innerHeight - 30) {
        setViewPort(true);
      }

      if (rAFId.current) {
        cancelAnimationFrame(rAFId.current);
      }
      // rAFId.current = requestAnimationFrame(checkViewPort);
    },
    [inViewPort, sectionRef]
  );

  useEffect(() => {
    requestAnimationFrame(checkViewPort);
  }, [inViewPort, checkViewPort]);

  return inViewPort;
}
```

## 정리

수없이 많이 발생하는 이벤트로 비용이 많은 렌더링, 브라우저의 리플로우와 리페인트가 발생한다면 이는 결국 성능저하를 일으킬것입니다. throttle은 과도하게 발생하는 이벤트에 일정시간에 텀(제약)을 걸어 이벤트를 제한합니다. 잦은 이벤트 발생을 막아 성능상의 유리함을 가져 올 수 있습니다. throttle의 한가지 방법으로 브라우저의 성능에 맞게 프레임을 요청하는 requestAnimationFrame을 사용해볼 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
- https://jbee.io/web/optimize-scroll-event/
- https://marshall-ku.com/web/tips/%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%93%B1%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0
- https://medium.com/@bestseob93/javascript-60fps-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0-86ca008fc974
