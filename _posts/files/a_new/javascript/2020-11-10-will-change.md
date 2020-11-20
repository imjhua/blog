---
layout: post
title: 하드웨어 가속도와 will-change
categories: JavaScript
---

will-change는 변화가 예상되는 요소를 브라우저에게 미리 알려줍니다. 브라우저는 실제 요소가 변화되기 전에 적절하게 최적화를 할 수 있습니다.

<hr />

<!-- vscode-markdown-toc -->
* [will-change](#will-change)
* [하드웨어의 가속 활용하기](#하드웨어의-가속-활용하기)
  * [transform(translate) 사용전에 will-change 적용](#transform(translate)-사용전에-will-change-적용)
* [주의사항](#주의사항)
* [will-change 속성](#will-change-속성)
  * [auto](#auto)
  * [scroll-position](#scroll-position)
  * [contents](#contents)
  * [custom-ident](#custom-ident)
* [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='will-change'></a>will-change

애니메이션은 어떤 단계를 거쳐 동작하기 때문ㄴ에 브라우저의 순간순간 많은 페인팅 또는 합성이 이루어 질것입니다. 자주변경되는 요소의 레이어를 별도로 분리하여 성능의 이점을 얻을수 있습니다. will-change 속성을 사용하면 해당 레이어는 메인스레드 작업이 아닌, 별도의 레이어로 유지하도록 지시하여 GPU(하드웨어 가속)에 업로드 됩니다.

## <a name='하드웨어의-가속-활용하기'></a>하드웨어의 가속 활용하기

변경이 있는 개별 레이어에서 애니메이션 프레임에 대한 페인팅만 새로 칠해지고 하나의 레이어로 합쳐져 새로운 레이어로써 브라우저에 보여지면 다음번 요청에서는 요소가 더이상 별개의 레이어가 아니기 때문에 브라우저입장에서 요소들의 재계산을 원활하게 할 수 없습니다.

만약 하나로 합쳐진 레이어를 대상으로 애니메이션을 처리해야 한다고 하면 레이아웃 및 페인트 작업을 메인스레드에서 해야 할 것입니다. 그럼 컴포지터 및 GPU사용성능의 이점을 얻을 수 없겠지요?

### <a name='transform(translate)-사용전에-will-change-적용'></a>transform(translate) 사용전에 will-change 적용

애니메이션을 적용 할 계획이므로 브라우저에 요소를 별도의 레이어에 유지하도록 지시합니다. 이제 애니메이션이 완료된 후 레이어는 합쳐지지 않고 별도로 애니메이션의 변화 동작을 처리하는 레이어가 될 것입니다.

will-change 다른 요소에 영향을주지 않고 레이어를 다시 칠할 수 있기 때문에 페인트 속성에 애니메이션을 적용해야하는 경우에도 유용합니다.

참고) 비슷한 속성으로 translate3d가 있습니다.

## <a name='주의사항'></a>주의사항

will-change 는 하드웨어 가속도를 사용하므로 메모리와 리소스를 필요로 합니다. 아껴서 사용해야 하며 모든 요소를 개별 레이어로만 동작하도록 하는것은 바람직 하지 않습니다. GPU 활용의 이점을 높일 수 있도록 자주변경되는 요소에만 사용하도록 합니다.

또한 애니메이션 동작이 끝난 후 기본 상태로 되돌려야 합니다.브라우저가 변화에 최적화를 시도하면 일반적으로 비용이 발생합니다. 브라우저는 보통 필요한 경우에 최적화를 실시하고 최적화가 필요가 없으면 다시 원래되로 되돌아 옵니다. 하지만 will-change의 경우는 최적화를 길게 유지하게 됩니다. 그러므로 엘리먼트에 변경이 종료되면 반드시 will-change를 삭제해야 합니다. 그러면 will-change에 사용하고 있던 자원을 회수할 수 있습니다.


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

앞으로 일어날 변경점들을 브라우저에게 알려주어 브라우저가 실제 요소가 변화되기 전에 적절하게 최적화합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/
- https://wit.nts-corp.com/2017/06/05/4571