---
layout: post
title: Canvas 이벤트 달기
categories: Web
---

캔버스 내부 도형에 클릭 이벤트를 추가하는 것은 헙니다. 이뉴는, 캔버스는 DOM에 추가된 노드가 아니기 때문입니다. 도형에 이벤트를 추가 할 수는 없지만 이벤트를 발생시킬 수 있습니다. 이를 이용하여 이벤트를 추가할 수 있는 방법들을 알아봅니다.

## Canvas의 Event

오로지 보이는 역할만 수행하기 때문에 캔버스 위에 그려진 도형(Shape)의 위치(path) 또는 범위를 알아내어 이벤트를 추가 할 수 있습니다.

## 캔버스 내부에 그려진 도형 범위를 기억하기

도형을 그릴때 그려진 위치와 크기를 기록하여 클릭된 위치가 해당 도형의 범위에 포함되는지를 계산합니다. 이 방법은 도형이 겹치는 경우에 모든 도형에 이벤트를 실행할 수 있다는 점입니다. 다만 모든 도형의 크기와 위치를 기록해야한다는 점이 복잡하다는 단점을 가집니다.

## 캔버스 내부 특정위치의 색을 대상으로 이벤트 걸기

ㄴ도형이 가진 색을 이용하는 방법입니다. 뒤에 사용될 예제 역시 이 방법을 사용하여 구현하였는데 코드가 비교적 단순하고 적용이 쉽기 때문입니다. Canvas 태그의 특정 위치가 어떤 색을 가지고 있는지 불러올 수 있는데 이때 그려진 도형과 같은 색을 찾음으로써 이벤트를 발생하는 방법입니다.아래는 2번 방법으로 구현된 예제소스입니다. 클릭할 경우 현재 클릭된 도형이 어떤 색인지 보여주게됩니다.

```html
<canvas onclick="showColor(event);" width="200" height="200"></canvas>
```

```js
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillRect(50, 50, 20, 20);

ctx.fillStyle = 'rgb(0, 255, 0);
ctx.fillRect(150, 150, 30, 30);


function showColor() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var x = event.offsetX;
  var y = event.offsetY;
  var color = ctx.getImageData(x, y, 1, 1).data;
  alert(color);
}
```

## 정리

현재까지는 Canvas를 사용하는 방법보다는 SVG 등을 사용하는 방식이 더 많이 쓰이는데 Canvas의 다양한 API 기능들을 모든 브라우저에서 표현하기 어려운 부분도 그 이유이기도합니다. 하지만 최신 브라우저는 대부분 Canvas의 기능들을 지원하고 앞으로는 더 많은 기능들이 추가될 것이므로 Canvas의 다양한 방법들을 익혀두면 향후 많은 도움이 될 것입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://webisfree.com/2018-05-31/[html5]-canvas-%EC%9A%94%EC%86%8C%EC%9D%98-%EB%8F%84%ED%98%95%EC%97%90-%ED%81%B4%EB%A6%AD-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
