---
layout: post
title: 하드웨어가속과 will-change
categories: JavaScript
---

하드웨어가속은 브라우저의 순간순간 많은 페인팅 또는 합성이 이루어지는 애니메이션을 다룰 때 유용하게 사용할 수 있습니다. 주변경되는 요소의 레이어를 별도로 분리하여 성능의 이점을 얻을수 있습니다. will-change를 적용하여 별도의 레이어로 분리하는 방법도 렌더링성능을 높이기 위한 한가지 방안입니다.

<hr />

<!-- vscode-markdown-toc -->

- [하드웨어 가속](#하드웨어-가속)
- [레이어 분리](#레이어-분리)
  - [will-change 적용](#will-change-적용)
- [주의사항](#주의사항)
  - [잘못된 적용](#잘못된-적용)
- [will-change 속성](#will-change-속성)
  - [auto](#auto)
  - [scroll-position](#scroll-position)
  - [contents](#contents)
  - [custom-ident](#custom-ident)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='하드웨어-가속'></a>하드웨어 가속

하드웨어 가속은 그래픽처리장치(GPU)를 이용하여 중앙처리장치(CPU)의 처리량을 줄이고, 브라우저의 렌더링을 효율화하는 것을 말합니다. CSS 작업에 하드웨어 가속을 활성화하면, GPU에 처리를 분담하여 CPU의 처리량이 줄일 수 있기 때문에 처리속도가 빨라지고 웹페이지의 렌더링을 보다 빠르게 할 수 있습니다.

렌더링에 하드웨어 가속을 사용하게되면 독립적인 레이어로 분리되어 다른 엘리먼트와 독립적인 렌더링이 가능하게 됩니다. 만약, 별도의 레이어로 분리된 엘리먼트에만 유일한 변경이 생기는 경우 다른 엘리먼트까지 렌더링이 될 필요가 없기때문에 분리된 엘리먼트의 변경은 보다 빠르게 렌더링 처리를 할 수 있습니다.

## <a name='레이어-분리'></a>레이어 분리

변경이 있는 개별 레이어에서 애니메이션 프레임에 대해서만 새로운 페인팅이 이루어 진 후 하나의 레이어로 합쳐져 새로운 레이어가 되는 것은 무척 비효율 적입니다. 브라우저의 다음번 요청에서는 요소가 더이상 별개의 레이어가 아니기 때문에 요소들의 재계산을 원활하게 할 수 없습니다. 새로운 레이어로 엘리먼트를 분리하는 것은 비교적 비용이 필요한 작업입니다. 성능 개선을 위해서는 레이어분리가 꼭 필요합니다.

### <a name='will-change-적용'></a>will-change 적용

will-change속성을 통해 브라우저에게 미리 특정 엘리먼트에 조작을 가한다는 사실을 알려주어 관련 처리작업을 준비할 수 있도록 합니다. 변경이 시작되기 전에 적절히 최적화할 수 있습니다. 예를 들어 애니메이션처럼 비용이 필요한 처리가 실제로 시작되기 전에 브라우저가 준비할 수 있다는 뜻입니다.

will-change 속성을 사용하면 해당 레이어는 메인스레드 작업이 아닌, 별도의 레이어로 유지하도록 지시하여 GPU(하드웨어 가속)에 업로드 됩니다.애니메이션을 적용 할 계획이므로 브라우저에 요소를 별도의 레이어에 유지하도록 지시합니다. 이제 애니메이션이 완료된 후 레이어는 합쳐지지 않고 별도로 애니메이션의 변화 동작을 처리하는 레이어가 됩니다.

will-change 다른 요소에 영향을주지 않고 레이어를 다시 칠할 수 있기 때문에 페인트 속성에 애니메이션을 적용해야하는 경우에도 유용합니다.

참고) CSS animation, transform, transition 속성에 자동으로 GPU 가속이 활성화 되지 않으며 will-change와 비슷한 속성으로 translate3d가 있습니다.

참고) opacity 속성은 GPU에 의해 효율적으로 처리되기 때문에 고속으로 처리된다.

## <a name='주의사항'></a>주의사항

will-change 는 하드웨어 가속도를 사용하므로 메모리와 리소스를 필요로 합니다. RAM이나 GPU의 메모리 사용량이 커지며 레이어를 많이 생성하면 할수록 그만큼 악영향이 생길 수 있습니다. 아껴서 사용해야 하며 모든 요소를 개별 레이어로만 동작하도록 하는것은 바람직 하지 않습니다. GPU 활용의 이점을 높일 수 있도록 자주변경되는 요소에만 사용하도록 합니다.

또한 애니메이션 동작이 끝난 후 기본 상태로 되돌려야 합니다. 브라우저가 변화에 최적화를 시도하면 일반적으로 비용이 발생합니다. 브라우저는 보통 필요한 경우에 최적화를 실시하고 최적화가 필요가 없으면 다시 원래되로 되돌아 옵니다. 하지만 will-change의 경우는 최적화를 길게 유지하게 됩니다. 그러므로 엘리먼트에 변경이 종료되면 반드시 will-change를 삭제해야 합니다. 그러면 will-change에 사용하고 있던 자원을 회수할 수 있습니다.

### <a name='잘못된-적용'></a>잘못된 적용

브라우저에 알려주고 있는 것은 이미 일어난 변화에 관한 최적화입니다. will-changee는 미래에 일어날 변화에 대해 적용되어야 합니다.

```css
.element:hover {
  will-change: transform;
  transition: transform 2s;
  transform: rotate(30deg) scale(1.5);
}
```

## <a name='will-change-속성'></a>will-change 속성

will-change 속성은 4가지가 있습니다.

- will-change: auto;
- will-change: scroll-position;
- will-change: contents;
- will-change: transform;
- will-change: top, left;

### <a name='auto'></a>auto

기본값으로 브라우저는 별다른 최적화를 실시하지 않습니다.

### <a name='scroll-position'></a>scroll-position

스크롤 할 때 엘리먼트의 위치가 변경될 것을 알려줍니다. 이 값을 설정하면 브라우저는 스크롤 가능한 엘리먼트를 미리 최적화 하여 랜더링 합니다. 한 번에 많은 양을 스크롤하거나 빠른 스크롤이 필요한 경우에 사용합니다.

### <a name='contents'></a>contents

엘리먼트의 컨텐츠가 변경될 것을 알려줍니다. 브라우저는 보통 엘리먼트의 랜더링 결과를 캐싱합니다. 대부분의 엘리먼트가 변경되지 않고 변경되어도 위치가 바뀌는 정도의 미미한 변경만 발생하기 때문입니다. 하지만 엘리먼트가 계속해서 변경되는 경우 브라우저 캐시는 무의미하게 됩니다. 이 속성을 사용하게 되면 캐시를 하지 않고 변경될 때마다 처음부터 랜더링하게 됩니다.

### <a name='custom-ident'></a>custom-ident

변경하고 싶은 속성을 사용할 수 있습니다. 쉼표(,)를 이용하여 두 개 이상의 속성을 사용할 수 있습니다. 크롬에서는 현재 6가지 속성(opacity, transform, top, left, right, bottom)만 적용됩니다. 참고.

## <a name='정리'></a>정리

will-change속성이 브라우저에게 알려주는 것은 현재 일어날 변화가 아닌 미래에 일어날 변화입니다. 앞으로 일어날 변경점들을 브라우저에게 알려주어 브라우저가 실제로 변화가 생길 때 지연 없이 최적화를 적용할 수 있도록 합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/
- https://wit.nts-corp.com/2017/06/05/4571
- https://web-atelier.tistory.com/39
- https://dev.opera.com/articles/ko/css-will-change-property/