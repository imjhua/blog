---
layout: post
title: History의 pushState
categories: JavaScript
---

브라우저의 세션 기록 스택에 상태를 추가할 수 있는 방법이 있습니다. 바로 History객체가 제공하는 pushState메서드를 통해서요. 이게 무슨 말이냐 하면, 브라우저에서 새로운 이동이 발생하는 경우(링크를 타고 가거나, 뒤로가기)에 기록들이 쌓이게 됩니다. 세션 기록, 현재 페이지를 불러온 탭 또는 프레임의 방문기록들이 스택에 쌓이게 됩니다. 우리는 URL을 조작 할 수 있습니다.! 눈에 보이지는 않지만 URL에 어떤 데이터를 포함시킬 수도 있습니다.

## History 객체

브라우저의 기록들은 History객체가 담당합니다. 이러한 기록들을 상태(state)라고 하는데 History객체를 통해 state를 조작하는 것이 가능합니다. 이를위해 History는 다양한 메소드들 제공합니다.

- History.back(): 세션 기록의 바로 뒤 페이지로 이동하는 비동기 메서드입니다. 브라우저의 뒤로 가기 버튼을 눌렀을 때, 그리고 history.go(-1)을 사용했을 때와 같습니다. 세션 기록의 제일 첫 번째 페이지에서 호출해도 오류는 발생하지 않습니다.
- History.forward(): 세션 기록의 바로 앞 페이지로 이동하는 비동기 메서드입니다. 브라우저의 앞으로 가기 버튼을 눌렀을 때, 그리고 history.go(1)을 사용했을 때와 같습니다. 세션 기록의 제일 마지막 페이지에서 호출해도 오류는 발생하지 않습니다.
- History.go(): 현재 페이지를 기준으로, 상대적인 위치에 존재하는 세션 기록 내 페이지로 이동하는 비동기 메서드입니다. 예를 들어, 매개변수로 -1을 제공하면 바로 뒤로, 1을 제공하면 바로 앞으로 이동합니다. 세션 기록의 범위를 벗어나는 값을 제공하면 아무 일도 일어나지 않습니다. 매개변수를 제공하지 않거나, 0을 제공하면 현재 페이지를 다시 불러옵니다.
- History.pushState(): 주어진 데이터를 지정한 제목(제공한 경우 URL도)으로 세션 기록 스택에 넣습니다. 데이터는 DOM이 불투명(opaque)하게 취급하므로, 직렬화 가능한 모든 JavaScript 객체를 사용할 수 있습니다. 참고로, Safari를 제외한 모든 브라우저는 title 매개변수를 무시합니다.
- History.replaceState(): 세션 기록 스택의 제일 최근 항목을 주어진 데이터, 지정한 제목 및 URL로 대체합니다. 데이터는 DOM이 불투명(opaque)하게 취급하므로, 직렬화 가능한 모든 JavaScript 객체를 사용할 수 있습니다. 참고로, Safari를 제외한 모든 브라우저는 title 매개변수를 무시합니다.

이중 관심있게 들여다 보고자 하는 것은 상태를 추가하고자 할때 호출하는 History.pushState 입니다. 이와 함께 현재 상태를 대체하는 History.replaceState을 비교해 보면서요.

### popstate 이벤트

그전에 세션을 조작할때 알아야 할 중요한 이벤트가 있습니다. popstate이벤트 입니다. 이는 사용자가 새로운 상태로 이동할 때마다 발생하는 이벤트입니다.

Window 인터페이스의 popstate 이벤트는 사용자의 세션 기록 탐색으로 인해 현재 활성화된 기록 항목이 바뀔 때 발생합니다. 만약 활성화된 엔트리가 history.pushState() 메서드나 history.replaceState() 메서드에 의해 생성되면, popstate 이벤트의 state 속성은 히스토리 엔트리 state 객체의 복사본을 가집니다. 주의할 점은, 실제 history.pushState() 메서드나 history.replaceState() 메서드를 호출하는 것 자체로는 popstate이벤트가 발생하지 않는 다는 것입니다. 세션기록에 어떠한 변경(추가 혹은 대체)이 가해지고 난 후 그 세션을 조작할때에 해당 이벤트가 발생합니다.

참고로.. 브라우저는 popstate 이벤트를 페이지 로딩시에 다르게 처리합니다. Chrome(v34 이전버전) 와 Safari는 popstate 이벤트를 페이지 로딩시에 발생시킵니다. 하지만 Firefox 는 그렇지 않습니다.

### pushState

pushSate를 호출하는 구문은 다음과 같습니다.

```js
history.pushState(state, title[, url]);
```

빈 브라우저 페이지를 새로 열어 새로운 페이지의 주소와 함께 pushState를 호출하면 새로운 상태가 생성됩니다. 우리가 이러한 변화를 눈으로 브라우저를 통해 확인 할 수 있는 방법은 2가지 입니다.

- 주소가 바뀐다. 이때, 화면의 갱신은 없다.
- 뒤로가기 버튼이 활성화 되었다. 브라우저의 세션 기록 스택에 추가되었기 때문에.

즉, 새로운 페이지의 주소만 바뀔뿐 페이지가 새로 갱신되는 것은 아닙니다. 즉 주소만 바뀐 효과가 나타납니다.

#### URL 데이터 사용하기

우리는 URL을 조작 할 수 있고 URL에 어떤 데이터를 포함시킬 수도 있다고 하였습니다. 이것은 매우 유용한데, 주소와 함께 데이터도 저장 할 수 있기 때문에 데이터에 바뀔 페이지의 정보를 담아 주고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링 하는 것도 가능합니다. 정보는 history.state로 접근할 수 있습니다.

### replaceState

pushState는 세션 기록 스택에 새로운 주소를 추가하였습니다. 원래의 주소가 있고 추가로 세션이 생긴 것입니다. 히스토리를 조회하면 원래의 페이지를 진입하는 것도 가능하지요. replceState는 새로운 세션을 추가하는 것이 아닌 현재 주소를 대체 합니다. 원래의 페이지가 바뀌어 버렸기 때문에 더이상 접근 할 방법이 없습니다.

## SPA에서의 활용

싱글페이지애플리케이션(SPA)에서는 페이지가 하나이기 떄문에 원래대로라면 페이지별로 주소를 가지고 있지 않습니다. History객체를 이용한다면 주소에 데이터를 저장하여 원하는 페이지를 렌더링 할 수 있습니다.

popstate이벤트는, pushState와 replaceState를 할 때 발생하지 않고, 세션 기록을 조회할때 뒤로가기나 앞으로가기를 눌렀을 때만 발생합니다. popstate 이벤트 발생 후 history.state에 접근하면 이전 state를 가져올 수 있다는 말입니다. 따라서 이전 페이지도 그 정보들을 활용해 다시 렌더링할 수 있습니다.

### 꿀팁 뒤로가기 못하게 하기

뒤로가기 못하게 하기. 즉 뒤로가도 계속 현재 페이지를 보고자 할 때 pushState를 사용합니다. 새로운 세션에 현재 페이지를 넣는다면 뒤로가기를 하더라도 계속 자기 자신이겠지요?

```js
window.history.pushState(null, null, location.href);
```

## pushState의 장점 (window.location과 비교하여)

어떤 면에선 pushState()와 window.location = "#foo"가 비슷합니다. 둘 다 새로운 세션 기록 항목을 생성하고 활성화하기 때문입니다. 그러나 pushState()에는 몇 가지 장점이 있습니다.

- 새로운 URL은 같은 출처에 한해서 아무 URL이나 가능합니다. 반면 window.location 설정은 해시만 수정해야 같은 문서에 머무릅니다.
- 원할 경우 URL을 바꾸지 않을 수도 있습니다. 그러나 window.location = "#foo"는 현재 해시가 #foo가 아닐 때만 새로운 기록 항목을 생성합니다.
- pushState()는 임의의 데이터를 세션 기록 항목에 연결할 수 있습니다. 해시 기반 방식에서는 필요한 모든 데이터를 인코딩 해 짧은 문자열로 만들어야 합니다.

다만 pushState()는 이전 URL과 신규 URL의 해시가 다르더라도 절대 hashchange 이벤트를 유발하지 않습니다. HTML 외의 문서에서는 이름공간 URI가 null인 요소를 생성합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/API/History
- https://developer.mozilla.org/ko/docs/Web/API/History/pushState
- https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event
- https://www.zerocho.com/category/HTML&DOM/post/599d2fb635814200189fe1a7
