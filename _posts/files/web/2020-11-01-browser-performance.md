---
layout: post
title: 브라우저 성능측정
categories: Web
categories: TODO
---


Chrome Lighthouse
Lighthouse는 웹 앱의 품질을 개선하는 오픈 소스 자동화 도구입니다. 다음 지표들 테스트하여 SPA(Single Page Application)에서는 웹 페이지의 성능을 측정 해 볼 수 있습니다.

다음 지표들이 성능측정의 기준이되는 이유는? HTML로 DOMContentLoaded, load 이벤트가 일찍 발생할 수 있으나, 이벤트가 발생한 이후에도 수많은 스크립트 실행으로 인해 여전히 "느린 로딩"이 존재하기 때문에 새로운 성능측정 지표를 통하여 상세한 성능을 확인합니다,

개선 전
      

개선 후(lazyload적용)
    

체크 항목(Metrics)
점수 계산: https://web.dev/performance-scoring/

FP(First Paint): 화면에 무언가가 처음으로 그려치는 시간
FCP(First Contentful Paint): 처음으로 컨텐츠(텍스트나 이미지)가 출력되기 시작하는 시간
FMP(First Meaningful Paint) 의미있는 콘텐츠(콘텐츠를 노출하는데 필요한 CSS, 자바스크립트 로드가 시작되고 스타일이 적용된 상태)가 그려지는 시작 시간
TTI(Time to Interactive): 자바스크립트의 초기 실행 완료 후 사용자의 액션(행동)이 이루어 질 수 있는 시간
Speed Index: https://web.dev/speed-index/
Largest Contentful Paint: https://web.dev/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=devtools
Time to Interactive: https://web.dev/interactive/
Total Blocking Time: TBT https://web.dev/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=devtools
Cumulative Layout Shift: https://web.dev/cls/?utm_source=lighthouse&utm_medium=devtools


First Contentful Paint 
.

Speed Index
.

Largest Contentful Paint(LCP)
https://web.dev/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=devtools



페이지의 기본 콘텐츠가로드되었을 가능성이있는 페이지로드 타임 라인의 지점을 표시하므로 인지 된로드 속도 를 측정하는 데 중요한 사용자 중심 메트릭입니다 . 뷰포트에서 볼 수 있는 가장 큰 이미지 또는 텍스트 블록 의 렌더링 시간을보고합니다 . 뷰포트에서 가장 큰 콘텐츠 요소가 화면에 렌더링되는시기를 측정합니다.



최적의 점수
좋은 사용자 경험을 제공하기 위해 사이트는 페이지로드 시작 후 처음 2.5 초 이내에 가장 큰 콘텐츠가 포함 되어야 합니다.

0-2.5 Green (fast)
2.5-4 Orange (moderate)
Over 4 Red (slow)
Time to Interactive
.

Total Blocking Time(TBT)
https://web.dev/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=devtools

TBT는 페이지가 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력에 응답하지 못하도록 차단 된 총 시간을 측정합니다. 50ms 이상 실행되는 모든 작업은 긴 작업입니다.  결과값은, 50ms 이후의 시간이 차단 부분입니다. 예를 들어 Lighthouse가 70ms의 긴 작업을 감지하면 차단 부분은 20ms가됩니다.



원인 & 개선방법
일반적으로 긴 작업의 가장 일반적인 원인은 다음과 같습니다.

불필요한 JavaScript로드, 구문 분석 또는 실행. 성능 패널에서 코드를 분석하는 동안 주 스레드가 페이지를로드하는 데 실제로 필요하지 않은 작업을 수행하고 있음을 발견 할 수 있습니다. 코드 분할로 자바 스크립트 페이로드를 감소 , 사용하지 않는 코드를 제거 하거나 효율적으로 타사 자바 스크립트를로드 하여 TBT 점수를 개선해야한다.
비효율적 인 JavaScript 문. 예를 들어, 성능 패널에서 코드를 분석 한 후 document.querySelectorAll('a')2000 개의 노드를 반환 하는 호출이 있다고 가정합니다 . 10 개의 노드 만 반환하는보다 구체적인 선택기를 사용하도록 코드를 리팩토링하면 TBT 점수가 향상됩니다.
최적의 점수
최적의 점수는 0~300ms 입니다.

0–300 Green (fast)
300-600 Orange (moderate)
Over 600 Red (slow)
Cumulative Layout Shift(CLS)
https://web.dev/cls/?utm_source=lighthouse&utm_medium=devtools



페이지의 전체 수명 동안 발생하는 모든 예기치 않은 레이아웃 이동에 대한 모든 개별 레이아웃 이동 점수 의 합계를 측정합니다 . 실제 사용자에게 발생하는 빈도를 측정하여이 문제를 해결하는 데 도움이됩니다. 페이지 콘텐츠의 예기치 않은 이동은 일반적으로 리소스가 비동기 적으로로드되거나 DOM 요소가 기존 콘텐츠 위의 페이지에 동적으로 추가되기 때문에 발생합니다. 원인은 크기를 알 수없는 이미지 나 동영상, 대체 글꼴보다 크거나 작게 렌더링되는 글꼴, 동적으로 크기가 조절되는 타사 광고 또는 위젯 일 수 있습니다.



최적의 점수
좋은 사용자 환경을 제공하려면 사이트에서 CLS 점수가 0.1 미만이되도록 노력해야합니다. 

0~0.1: good
0.1~0.25: needs improvement
0.25이상: poor


개선 포인트
사용하지 않는 스크립트 제거
렌더링 블로킹 항목
Dom size: 스타일 계산의 범위와 복잡성 줄이기
사용자 정의 글꼴이로드되는 동안 보이지 않는 텍스트 대체 폰트 적용 또는 미리 로드(preload)
HTTP/ 2를 통해 리소스를 제공 → 서버에서 HTTP / 2를 활성화해야 한다.
스크롤 성능을 향상시키기 위해 수동 리스너를 사용하지 않는다. (옵션: passive https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md)

캐시사용
네트워크 페이로드 낭비하지 않기. 아끼기.
메인스레드 작업 최소화: 브라우저의 렌더러 프로세스 는 코드를 사용자가 상호 작용할 수있는 웹 페이지로 바꾸는 것입니다. 기본적 으로 렌더러 프로세스 의 기본 스레드 는 일반적으로 대부분의 코드를 처리합니다. HTML을 구문 분석하고 DOM을 빌드하고, CSS를 구문 분석하고 지정된 스타일을 적용하고, JavaScript를 구문 분석, 평가 및 실행합니다. 메인 스레드는 사용자 이벤트도 처리합니다. 따라서 주 스레드가 다른 작업을 수행 중일 때마다 웹 페이지가 사용자 상호 작용에 응답하지 않아 나쁜 경험이 발생할 수 있습니다.

