---
layout: post
title: CSS가 일반적으로 자바 스크립트보다 애니메이션에 더 좋은 이유
categories: JavaScript
---

브라우저에서 하나의 애니메이션 프레임을 처리한다는 것은 애니메이션 구현에 필요한 모든 계산 과정과 계산을 통해 얻어진 픽셀 자리를 업데이트 하는 것까지 포함합니다. 버벅이지 않는 애니메이션을 보려면 프레임별 렌더링이 문제없이 잘 이루어져야합니다. 애니메이션을 어떻게 적용하느냐에 따라 렌더링성능은 달라지게 되고 자연스럽지 못한 애니메이션을 경험하게 될지도 모릅니다. 특히 자바스크립트보다 CSS로 애니메이션을 적용하는것이 더 부드럽게 보여질 수 있는데 그 이유에 대해 알아봅니다.

<hr />

<!-- vscode-markdown-toc -->

- [렌더링 프로세스](#렌더링-프로세스)
  - [메인스레드와 컴포지터 스레드](#메인스레드와-컴포지터-스레드)
- [애니메이션 대상](#애니메이션-대상)
  - [자바 스크립트보다 CSS 사용하는 이유](#자바-스크립트보다-css-사용하는-이유)
    - [transform & opacity](#transform-&-opacity)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='렌더링-프로세스'></a>렌더링 프로세스

먼저 브라우저의 렌더링 절차를 되새겨 봅시다.

- 스타일 재 계산: 요소를 적절한 CSS 선택자 (예: .heading > span, .title)와 일치시키고 적용 할 스타일을 계산합니다.
- 레이아웃: 크기와 위치를 생성합니다 . 기본적으로 너비, 높이 및 페이지에서 이동해야하는 위치입니다.
- 그림판: 배경, 테두리, 그림자, 텍스트 등 보이는 모든 픽셀을 채 웁니다. 요소는 일반적으로 레이어로 칠해집니다.
- 합성 레이어: 그림판으로 만든 레이어를 올바른 순서로 결합하여 화면에 출력합니다.

### <a name='메인스레드와-컴포지터-스레드'></a>메인스레드와 컴포지터 스레드

브라우저에는 기본 스레드와 합성 스레드의 두 스레드가 있습니다. 메인 스레드는 대부분의 작업은 자바 스크립트, 다시 계산 스타일, 레이아웃 및 페인트를 포함하여, 발생하는 곳입니다. 가장 집약적 인 작업이 모두 그곳에서 실행되므로 한 번에 수십에서 수백 밀리 초 동안 일상적으로 중단됩니다. 컴포지터 스레드는 복합 레이어 및 기타 렌더링 작업을 담당합니다.

## <a name='애니메이션-대상'></a>애니메이션 대상

애니메이션 대상은 레이아웃을 재 조정하기보다는 합성만을 담당하도록 하면 렌더링 성능은 빨라질 것입니다. 많은 것을 담당하여 바쁜 메인스레드보다는 GPU 가속을 활용하는 컴포지터 스레드에게 작업을 맡기면 그만큼 좋은 성능을 경험합니다.

따라서 애니메이션 대상은 다음과 같은 조건을 가집니다.

- 렌더링 폭포의 상단(스타일 재걔산 / 레이아웃 / 페인트)보다는 합성을 담당하도록 한다.
- 메인 스레드를 피한다.
- 컴포지터 스레드와 GPU를 활용한다.

### <a name='자바-스크립트보다-css-사용하는-이유'></a>자바 스크립트보다 CSS 사용하는 이유

이제 결론입니다. 자바 스크립트는 항상 메인 스레드에서 실행되므로 다른 작업으로 인해 스레드가 정체 될 경우, 프레임이 떨어질 가능성이 더 높으므로 자바 스크립트로 애니메이션을 사용하는 것 보다는 GPU를 활용할 수 있는 CSS를 사용하면 더 좋은 성능을 낼 수 있습니다.

#### <a name='transform-&-opacity'></a>transform & opacity

transform, opacity와 같은 속성을 사용하면, CPU 대신 GPU를 사용해 웹 브라우저가 애니메이션을 수행할 수 있도록 할 수 있습니다.

이때 생각해 볼 수 있는것은 애니메이션이 적용되는 레이어는 합성단계에서 합쳐지는게 좋을까요? 개별 레이어로 남겨두는게 좋을까요?

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/