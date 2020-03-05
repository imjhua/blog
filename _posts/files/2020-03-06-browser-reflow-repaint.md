---
layout: post
title: 브라우저 Reflow & Repaint
categories: Web
---

렌더링 과정에 레이아웃을 다시 그리거나 렌터트리를 다시 그리는 단계가 반복되는 경우 각각을 Reflow, Repaint라고 합니다. Reflow & Repaint사용을 줄여 브라우저를 최적화 할 수도 있습니다.

## Reflow & Repaint

Reflow와 Repaint는 다음 단계를 반복하는 경우를 말합니다.

- HTML을 파싱해 DOM 트리를 구성한다.
- 렌더 트리를 구성한다.
- 렌더 트리를 레이아웃한다. - Gecko엔진에선 Reflow로 표현
- 렌더 트리를 그린다. - Gecko엔진에선 Repaint로 표현

생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(자신, 자식, 부모, 조상(결국 모든 노드) ) 수치를 다시 계산하여(Recalculate), 렌더 트리를 재생성하는 과정이며 또한, Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 Repaint 라 합니다.

## Reflow

다음 코드는 리플로우를 발생시킵니다.

```js
function reFlow() {
  document.getElementById("container").style.width = "600px";
  return false;
}
```

### Reflow 발생 요소

- 노드의 추가 또는 제거
- 요소의 위치 변경
- 요소의 크기 변경 (margin, padding, border, width, height…) -> 인크리멘탈 레이아웃(비동기)
- 폰트 변경과(텍스트 내용) 이미지 크기 변경 (크기가 다른 이미지로 변경 시) -> 글로벌 레이아웃(동기)
- 페이지 초기 랜더링최초 Layout 과정)
- 윈도우 리사이징 -> 글로벌 레이아웃(동기)

### Reflow 최적화 방법

1. 클래스 변화에 따른 스타일 변경 시, 최대한 DOM 구조 상 끝단에 위치한 노드에 주어야 합니다. 가급적 말단에 위치한 노드 수치 변경 시 리플로우 수행 반경을 전체 노드가 아닌 일부 노드로 제한 시킬 수 있습니다. 즉, Reflow 수행 비용을 줄일 수 있다는 말과 같습니다.(하지만 실무 작업 시 적용 가능한 범위가 크지 않다)

2. 인라인 스타일을 최대한 배제합니다. 적용 시 코드 가독성과 Reflow 비용을 줄일 수 있습니다.

3. 애니메이션이 들어간 노드는 가급적 position:fixed 또는 position:absolute로 지정하여 전체 노드에서 분리 시키도록 합니다. 보통 (JS(Javascript) + CSS)를 활용한 에니메이션 효과는 해당 프레임에 따라 무수히 많은 Reflow 비용이 발생하게 됩니다. 하지만 position 속성을 "fixed" 또는 "absoute"로 값을 주면 지정된 노드는 전체 노드에서 분리됩니다. 즉, 전체 노드에 걸쳐 Reflow 비용이 들지 않으며, 해당 노드의 Repaint 비용만 들어가게 됩니다. 또한, 노드의 position 값을 초기에 적용하지 않았더라도 에니메이션 시작 시 값을 변경(fixed, absolute)하고 종료 시 다시 원복 시키는 방법을 사용해도 무관합니다.

### Google의 리플로우를 최소화하는 데 도움이 되는 간단한 가이드라인

- 불필요한 DOM 트리 깊이를 줄입니다. DOM 트리의 하위 노드를 변경하면 트리의 모든 수준, 즉 위로는 루트, 아래로는 수정된 노드의 하위 요소에 이르기까지 모두 변경될 수 있습니다. 이에 따라 리플로우를 실행하는 데 더 많은 시간이 걸리게 됩니다.
- CSS 규칙을 최소화하고 사용되지 않는 CSS 규칙을 삭제합니다.
- 애니메이션과 같이 복잡한 렌더링을 변경하는 경우 흐름 밖에서 변경합니다. 변경할 때는 절대 위치나 고정 위치를 사용합니다.
- 불필요하고 복잡한 CSS 선택기, 특히 하위 요소 선택기는 사용하지 않습니다. 이 경우 선택기를 일치시키기 위해 더 높은 CPU 처리량이 필요합니다.

## Repaint

reflow만 수행되면 실제 화면에 반영되지 않습니다. 위에서 언급된 렌더링 과정과 같이 Render Tree를 다시 화면에 그려주는 과정이 필요합니다. 결국은 Paint 단계가 다시 수행되는 것이며 이를 Repaint 라고 합니다. 하지만 무조건 Reflow가 일어나야 Repaint가 일어나는것은 아닙니다. background-color, visibility와 같이 레이아웃에는 영향을 주지 않는 스타일 속성이 변경되었을 때는 Reflow를 수행할 필요가 없기 때문에 Repaint만 수행하게 됩니다.

다음은 Repaint 발생 코드입니다.

```js
function rePaint() {
  document.getElementById("container").style.backgroundColor = "red";
  return false;
}
```

### Reflow, Repaint 줄이기

#### 사용하지 않는 노드에는 visibilty: invisible 보다 display: none을 사용하기

visibility invisible은 레이아웃 공간을 차지하기 때문에 reflow의 대상이 됩니다. 하지만 display none은 Layout 공간을 차지하지 않아 Render Tree에서 아예 제외됩니다.

#### Reflow, Repaint 가 발생하는 속성 사용 피하기

아래는 각각 Reflow, Repaint가 일어나는 CSS 속성들 입니다. Reflow가 일어나면 Repaint는 필연적으로 일어나야 하기 때문에 가능하다면 Reflow가 발생하는 속성보다 Repaint 만 발생하는 속성을 사용하는것이 좋습니다.

참고) Reflow가 일어나는 대표적인 속성

position width height left top
right bottom margin padding border
border-width clear display float font-family
font-size font-weight line-height min-height overflow
text-align vertical-align white-space ....

참고) Repaint가 일어나는 대표적인 속성

background background-image background-position background-repeat background-size
border-radius border-style box-shadow color line-style
outline outline-color outline-style outline-width text-decoration
visibility ....
또한 Reflow Repaint가 일어나지 않는 transform, opacitiy와 같은 속성도 있습니다. 따라서 left, right, width, height 보다 transform을, visibility/display 보다 opacitiy를 사용하는 것이 성능 개선에 도움이 됩니다.

#### 영향을 주는 노드 줄이기

Javascript + Css를 조합하여 애니메이션이 많거나 레이아웃 변화가 많은 요소의 경우 position을 absolute 또는 fixed를 사용하여 영향을 받는 주변 노드들을 줄일 수 있습니다. fixed와 같이 영향을 받는 노드가 전혀 없는 경우 reflow과정이 전혀 필요가 없어지기 때문에 Repaint 연산비용만 들게 됩니다.

또다른 방법은 애니메이션 시작시 요소를 absolute, fixed로 변경 후 애니메이션이 종료되었을 때 원상복구 하는 방법도 Reflow, Repaint 연산을 줄이는대에 도움이 됩니다.

#### 프레임 줄이기

단순히 생각하면 0.1초에 1px씩 이동하는 요소보다 3px씩 이동하는 요소가 Reflow, Repaint 연산비용이 3배가 줄어든다고 볼 수 있습니다. 따라서 부드러운 효과를 조금 줄여 성능을 개선할 수 있습니다.

#### cssText 및 클래스를 활용해 Reflow or Repaint 최소화.

DOM과 스타일 변경을 하나로 묶어 리플로우 수행을 최소화 한다.

## 브라우저 렌더링 과정

브라우저 렌더링 과정을 정리해봅니다.

1. 파싱: DOM 트리를 만드는 과정. HTML문서를 해석한다. HTML문서를 가공하여 쉽게 접근 가능하도록 한다.
2. 자바스크립트 엔진: HTML parsing, UserInput, rAF 등으로 실행된다.
3. Recalculate Style: 파싱된 css 결과인 CSSOM을 렌더트리에 적용하는 과정이다. HTML은 단순 문서이고 각 엘리먼트들의 렌더링에 관한 모든 정보는 CSS가 가지고 있다.
4. 렌더트리: Recalculate Style의 결과이다. DOMTree + CSSOMTree. 화면에 보이는 요소들을 중심으로 구성한다.
5. 레이아웃: 노드 박스들의 좌표를 계산한다. (크기, 위치)

- 각 박스의 넓이는 viewport(ICB)기준
- 각 박스의 높이는 contents(fonts)기준
- 윈도우 사이즈를 변경하거나 폰트 변경시 글로벌 레이아웃 발생
- Dirty bit system은 인크리멘탈 레이아웃이다.

6. 페인팅: 렌더링 트리를 탐색하면서 특정 메모리 공간에 RGB 값을 채우는 과정 ??

### 렌더 트리

렌더링 트리를 생성하려면 브라우저가 대략적으로 다음 작업을 수행합니다.

- DOM 트리의 루트에서 시작하여 표시되는 노드 각각을 연결합니다.
- 일부 노드는 표시되지 않으며(예: 스크립트 태그, 메타 태그 등), 렌더링된 출력에 반영되지 않으므로 생략됩니다.
- 일부 노드는 CSS를 통해 숨겨지며 렌더링 트리에서도 생략됩니다.
- 예를 들어,span 노드의 경우 ‘display: none’ 속성을 설정하는 명시적 규칙이 있기 때문에 렌더링 트리에서 누락됩니다.
- 표시된 각 노드에 대해 적절하게 일치하는 CSSOM 규칙을 찾아 적용합니다.
- 표시된 노드를 콘텐츠 및 계산된 스타일과 함께 내보냅니다.

참고) visibility: hidden은 display: none과 다릅니다. 전자는 요소를 보이지 않게 만들지만, 이 요소는 여전히 레이아웃에서 공간을 차지합니다(즉, 비어 있는 상자로 렌더링됨). 반면, 후자(display: none)는 요소가 보이지 않으며 레이아웃에 포함되지도 않도록 렌더링 트리에서 요소를 완전히 제거합니다.
최종 출력은 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보를 모두 포함하는 렌더링 트리입니다. 렌더링 트리가 생성되었으므로 ‘레이아웃’ 단계로 진행할 수 있습니다.

### 레이아웃

렌더러가 생성되고 트리에 추가될 때, 이 렌더러는 위치와 크기를 가지지 않습니다. 이러한 값들을 계산하는 것을 레이아웃이라고 부릅니다. 렌더트리는 HTML은 흐름-기반(flow-based) 레이아웃 모델로 이것은 대부분 단일 방향에서 기하학적 값들을 계산할 수 있음을 의미합니다. 좌표계는 루트 렌더러를 기준으로 합니다. top, left 좌표가 사용됩니다. 레이아웃은 재귀적인 과정입니다. 이것은 루트 렌더러(HTML 도큐먼트 엘리먼트에서 <html>에 해당)에서 시작됩니다. 레이아웃은 부분 또는 전체 렌더러의 계층을 통과하면서 재귀적으로 반복되고, 이를 필요로 하는 렌더러의 기하학적 정보를 계산합니다.

- 루트 렌더러의 위치는 0,0이고 치수는 브라우저 윈도우에서 보이는 부분의 크기(뷰포트)이다.
- 레이아웃 시작은 각 노드에 화면에 표시되어야 하는 정확한 좌표를 전달하는 것을 의미한다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=ko
- https://yoonjaepark.github.io/2018-12-25/repaint-reflow
- https://taligarsiel.com/Projects/howbrowserswork1.htm#Dirty_bit_system
- https://www.slideshare.net/deview/125-119068291
- https://yoonjaepark.github.io/2018-12-25/repaint-reflow
- https://webclub.tistory.com/346
- https://boxfoxs.tistory.com/408
