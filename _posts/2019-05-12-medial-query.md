---
layout: post
title: 반응형 웹을 위한 미디어 쿼리(Media Query) 사용법
categories: Web
---

웹에 접근할 수 있는 기기들이 다양해 지면서 컨텐츠가 화면에 배치되는 방식에 따라 다른 접근 방식이 필요하게 되었습니다. 반응형 웹 디자인은 사용자와 그들이 사용하는 기기의 요구사항에 맞게 반응합니다. 레이아웃은 기기의 크기와 기능에 따라 변합니다. 


## 반응형 웹
반응형 웹이란 쉽게 말해 디바이스 종류에 따라 웹페이지의 크기가 자동적으로 재조정 되는 것을 말합니다. 어떠한 환경에서도 그에 맞게 사이즈가 변화되어 사용자가 보기 편리하게 만드는 웹입니다. 오직 하나의 HTML소스 만으로 특정 장치에 최적화된 환경을 사용자에게 제공할 수 있습니다.

반응형 웹에 있어서 빼놓을 수 없는 개념이 모바일 퍼스트입니다. 모바일 퍼스트는 웹 디자인을 할때, PC보다 모바일 기기를 먼저 생각해서 디자인하고 프로그래밍 하는 기법입니다. 이 개념은 앞서 말했 듯 태블릿 PC, 스마트 폰등 모바일 기기의 이용이 늘어나면서 일반 웹 사용자보다 모바일 웹 사용자가 더 많아지면서 생기게 됐습니다. 모바일 퍼스트의 핵심은 모바일의 제약을 집중의 기회로 본다는 것에 있습니다. 모바일의 제약은 크게 세가지로 나눌 수있습니다.

- 모바일 기기의 스크린 크기
- 네트워크 속도 및 품질
- 사용하는 모드

모바일 기기의 스크린 크기에 반응 하는 웹을 구성하는 미디어 쿼리에 대해 자세히 알아 봅시다.

## 미디어 쿼리(Media Query)
미디어 타입(media type)은 단말기의 종류에 따라 각각 다른 스타일시트를 적용하게 하는 기능이며 CSS 2.1 부터 추가되었습니다. 하지만 실제로 많이 사용되지 않았는데, 미디어 타입 만으로는 해당 기기의 특성을 정확히 파악하여 알맞은 스타일을 적용시키기 어려웠던 문제점이 있었기 때문입니다. CSS3에는 미디어 타입을 개선하여, 더 구체적인 조건에서 필요한 스타일을 정확하게 적용할 수 있도록 확장하였는데, 이를 미디어 쿼리(media query)라고 합니다.


### 미디어 쿼리 적용법
미디어 쿼리는 화면(screen), 티비(tv), 프린터(print)와 같은 미디어 타입(media type)과 적어도 하나 이상의 표현식(expression)으로 구성됩니다. 표현식은 width, height, color와 같은 미디어 특성(media feature)들을 이용하여 그 특성들의 상태에 따라 다른 스타일 시트를 적용할 수 있습니다. 미디어 쿼리는 CSS3에 포함되어 있으며, 컨텐츠의 변경없이 주로 화면의 크기에 따라 스타일 시트를 달리하여 적절한 모양을 보여줄 수 있습니다. 

미디어 쿼리는 적용 방법은 다음과 같습니다.


#### link태그 사용 
link태그는 head태그 안에 위치하여 media 속성 안 조건에 만족할 때 해당 CSS파일을 불러옵니다.

```html
<link href="cssfile.css" media="screen and (min-width: 512px) and (max-width: 1024px)" rel="stylesheet">  
```
미디어 쿼리가 정의되어 있는 스타일 시트 파일을 브라우저에서 동작 할수 있도록 합니다. 다만 미디어 쿼리는 거의 모든 최신 브라우저에서 잘 동작하지만  인터넷 익스플로러는 9버전 부터 지원합니다. 만약 자신이 제작하는 반응형 웹이 IE8 이하에서도 동작을 하여야 한다면 polyfill 을 사용하여야 합니다. IE 6~8 버전의 경우 미디어쿼리가 동작하지 않기 때문에 IE에서 미디어쿼리를 해석할 수 있도록 만들어주는 respond.js 자바스크립트 라이브러리(polyfill의 일종)를 사용합니다. 다음은 IE 에서는 의미가 있고 다른 브라우저에서는 주석으로 처리됩니다. [if lte IE 8]의 의미는 IE 8 보다 작거나 같은 버전에서 실행된다는 뜻입니다.
```html
<link rel="stylesheet" type="text/css" href="./mystyle.css" />
<!--[if lte IE 8]>
<script type="text/javascript" src="./respond.min.js"></script>
<![endif]-->
```

그 후 다음 스타일 시트(.css)내에서 @media 를 사용합니다. 결과는 위와 동일한 조건이고, 그 조건이 맞으면 {...}  안의 스타일이 적용됩니다.
```css
@media screen and (max-width: 768px) {
    body {
        background-color: lightgreen;
    }
}
``` 

#### style태그 사용
style태그는 head태그 안에 위치하여 media 속성 안 조건에 만족 할 때 스타일을 적용 시킵니다.

```html
<style type="text/css" media="screen and (min-width: 512px) and (max-width:1024px)">  
/* style */
</style>  
```

#### style태그에서의 @import 문 사용
style태그 안에서 @import를 사용하여 뒷 부분의 미디어 쿼리를 만족 할 때 해당 CSS파일을 불러옵니다.

```html
<style>  
    @import url(cssfile.css) screen and (min-width: 152px) and (max-width: 1024px);
</style>  
```

#### CSS파일 내 정의
불러온 CSS파일 안 혹은 style태그 안에서 직접 미디어 쿼리를 작성하여 만족할 때 해당 스타일을 적용 시킵니다.

```css
@media screen and (min-width:512px) and (max-width:1024px)
```


### 미디어쿼리 문법
다음과 같이 정의됩니다.
```css
@media [only | not] [미디어 타입] and (속성: 값) {...}  
```

#### 미디어 타입의 종류
- all : 모든 미디어 타입
- aural : 음성 합성장치
- braille : 점자 표시 장치
- handheld : 손으로 들고 다니면서 볼 수 있는 작은 스크린에 대응하는 용도
- print : 인쇄 용도
- projection : 프로젝터
- screen : 컴퓨터 스크린
- tty : 디스플레이 능력이 한정된 텔렉스, 터미널, 또는 수동 이동 장치등 고정 된 글자를 사용하는 미디어
- tv : 음성과 영상이 동시 출력 되는 장치
- embrossed : 페이지에 인쇄된 점자 표지 장치

위 타입에서 실제로 많이 쓰이는 미디어 타입은 all과 screen, print 입니다 . screen의 경우 대부분의 컴퓨터와 모바일 기기를 뜻합니다. handheld를 모바일 기기로 생각하시는 분들도 계시겠지만 모바일 기기는 handheld가 아닌 screen이라는 것을 꼭 확인 하셔야합니다. 위 문법에서 미디어 타입은 한 가지만 들어올 수 있는 것이 아닙니다. 조건을 여러개 정의하는 경우 and (둘 다 만족) 또는 ,(콤마-둘중 하나의 조건만 만족)로 구분하여 나열하면 됩니다.


#### 미디어 타입의 속성

미디어 쿼리문의 속성과 속성 값은 다음과 같습니다.

- width : 웹페이지의 가로 길이를 판단합니다.
- height : 웹페이지의 세로 길이를 판단합니다.
- device-width : 단말기의 물리적인 가로길이를 판단합니다. 즉, 기기의 실제 가로 길이를 판단합니다.
- device-height : 단말기의 물리적인 세로길이를 판단합니다. 즉, 기기의 실제 세로 길이를 판단합니다.
- orientation : width와 height을 구하여 width 값이 길면 landscape로, height 값이 길면 portrait로 판단합니다.
- aspect-ratio : width/height 비율을 판단합니다.
- device-aspect-ratio : 단말기의 물리적인 화면 비율을 판단합니다.
- color-index : 단말기에서 사용하는 최대 색상수를 판단합니다.
- monochrom : 흑백 컬러만을 사용하는 단말기에서 흰색과 검은색 사이의 단계를 판단합니다.
- color : 단말기에서 사용하는 최대 색상 수의 비트 수를 판단합니다. 자연수를 쓰지만 2의 지수를 뜻합니다. (ex-1은 2, 2는 4, 3은 8...)
- resolution : 지원하는 해상도를 판단합니다. 값으로 dip(인치당 도트 수)나 dpcm(cm당 도트 수)를 사용합니다. resolution 같은 기능이 필요한 이유는 아이폰3 와 아이폰 4같이 화면의 크기는 같지만 지원하는 해상도가 다른 기기의 경우를 판단할 때 쓰면 좋습니다.


가장 많이 활용되는 속성으로는 min- 또는 max- 를 붙여서 최소값과 최대값으로 구분합니다.
- max-width: 최대 너비를 설정. 최대로 max-width값 까지 허용하겠다는 의미로 값 이하인 경우에만 적용. (ex-모바일 영역)
- max-height: 최대 높이를 설정. 최대로 max-height값 까지 허용하겠다는 의미로 값 이하인 경우에만 적용. (ex-모바일 영역)
- min-width: 최소 너비를 설정. 최소로 min-width값 까지 허용하겠다는 의미로 값 이상인 경우에만 적용. (ex-모바일 영역을 제외한 데스트탑 영역)
- min-height: 최소 높이를 설정. 최소로 min-width값 까지 허용하겠다는 의미로 값 이상인 경우에만 적용. (ex-모바일 영역을 제외한 데스트탑 영역)



적용한 예는 다음과 같습니다.
```css
@media only screen and (max-width:400px) {...}  
```

#### 해상도(resolution break point)
반응형 웹 디자인을 제작하기 위한 미디어쿼리 해상도 분기점 리스트 입니다. 국내에도 다양한 해상도를 지닌 디바이스들이 존재하지만 현 디바이스 시장에서 가장 많이 사용되는 제품을 주로 하여, 해상도 분기점을 사용하는 편입니다. 꼭 위의 분기점들이 완벽하게 모든 기기들을 지원한다고 할 수는 없습니다. 그러나 css3 속성인 '미디어쿼리'를 지원하고 'viewport'를 사용한다면 현 시장에서 대중적으로 사용되는 디바이스에는 전부 지원이 가능한 분기점 리스트 입니다. https://sitemagic.org/sites/cms-guide/Understanding-resolution-breakpoints.html 사이트를 참고 하였습니다.

| Resolution breakpoint	| Screen width |
|-----------------------|--------------|
| Mobile| Below or equal to 500px |
| Tablet| Below or equal to 900px |
| Desktop | Greater than 900px |
| Desktop 1280 HD |	Greater than or equal to 1280px |
| Desktop 1600 UXGA | Greater than or equal to 1600px |
| Desktop 1980 FHD | Greater than or equal to 1980px |
| Desktop 2560 UWHD | Greater than or equal to 2560px |
| Desktop 2800 QSXGA | Greater than or equal to 2800px |
| Desktop 3440 UWQHD | Greater than or equal to 3440px |
| Desktop 4096 4K |	Greater than or equal to 4096px |

##### 적용 예 
반응형 웹을 만들때 스타일을 작성하는 기준으로 모바일을 우선할것인지, 데스크탑을 우선할 것인지가 먼저 고려하여 스타일을 작성합니다.

```css
/* 이곳에 모바일에 적용될 스타일을 먼저 작성합니다. */

@media screen and (min-width: 900px) {
   /* 최소 width가 900px일 때, 즉 width가 900px이상 화면(데스크탑)에서 사용될 스타일을 여기에 작성합니다. */
}
``` 

```css
/* 이곳에 데스크탑에서 사용될 스타일을 먼저 작성합니다. */

@media screen and (max-width: 500px) {
    /* 최대 width가 500px일 때, 즉 width가 500px이하 화면(모바일)에 사용될 스트일 시트를 여기에 작성합니다. */
}
```
 
아래 코드는 Andy Clarke라는 사람이 작성한 기기별 미디어 쿼리입니다. 분류는 크게 데스크탑 브라우저, iPhone, iPad, 스마트 폰(저 해상도와 고 해상도)로 구분되어 있습니다. 참고해서 보시면 좋습니다.

```css
/* 스마트폰 가로+세로 */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px){
}

 /* 스마트폰 가로 */
@media only screen and (min-width : 321px) {
}

 /* 스마트폰 세로 */
@media only screen and (max-width : 320px) {
}

/* iPhone4와 같은 높은 크기 세로 */
@media
only screen and (-webkit-min-device-pixel-ratio : 1.5),  
only screen and (min-device-pixel-ratio : 1.5) {  
}

/* iPhone4와 같은 높은 해상도 가로 */
@media only screen and (min-width : 640px) {
}

/* iPad 가로+세로 */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
}

/* iPad 가로 */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
}

/* iPad 세로 */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
}

/* 데스크탑 브라우저 가로 */
@media only screen and (min-width : 1224px) {
}

/* 큰 모니터 */
@media only screen and (min-width : 1824px) {
}
```

----
해당 내용은 다음 글을 참고 하였습니다.
- https://www.w3schools.com/cssref/css3_pr_mediaquery.asp
- http://www.nextree.co.kr/p8622/
- https://junistory.blogspot.com/2017/06/n.html