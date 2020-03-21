---
layout: post
title: SASS / SCSS / SCSS 
categories: HTML
---

Sass(Syntactically Awesome StyleSheets)는 CSS pre-processor로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장(extension)입니다. CSS의 간결한 문법은 배우기 쉬우며 명확하여 프로젝트 초기에는 문제가 없이 보이지만 프로젝트의 규모가 커지고 수정이 빈번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 단점도 가지고 있습니다. Sass는 '문법적으로 멋진 스타일시트'를 뜻으로 CSS 전처리기 중 하나입니다. 그렇다면 SCSS는 무엇일까요?

## CSS Pre-Preprocessor(전처리기)란?

웹에서는 CSS만 동작합니다. HTML, CSS를 다루는 분이라면 한 번은 들어봤을 Sass, Less 등이 있습니다. 이것들은 모두 CSS 전(예비)처리기 입니다. Sass, Less, Stylus 같은 전처리기(이하 ‘전처리기’로 표기)는 직접 동작시킬 수 없습니다. 보통 CSS Pre-Preprocessor 라고 부릅니다. CSS가 동작하기 전에 사용하는 기능으로, 웹에서는 분명 CSS가 동작하지만 우리는 CSS의 불편함을 이런 확장 기능으로 상쇄할 수 있습니다. Sass는 기초 언어에 힘과 우아함을 더해주는 CSS의 확장입니다.

CSS pre-processor 로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐 만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게해줍니다.

## SASS(Syntactically Awesome StyleSheets)

'문법적으로 멋진 스타일시트'를 뜻하는 SASS, CSS 전처리기 중 하나입니다. '전처리기'라는 단어가 붙은 만큼, SASS만이 이해할 수 있는 문법 체계가 있을 것이고 .sass (or .scss) 파일에 문법에 맞게 파일을 작성한다면 SASS 컴파일러가 브라우저에서 사용할 수 있는 CSS 형태로 변환할 수 있습니다.

이러한 CSS의 태생적 한계를 보완하기 위해 Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공합니다.

- 변수의 사용
- 조건문과 반복문
- Import
- Nesting
- Mixin
- Extend/Inheritance

### 장점

CSS와 비교하여 Sass는 아래와 같은 장점이 있습니다.

- CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다.
- 스킬 레벨이 다른 팀원들과의 작업 시 발생할 수 있는 구문의 수준 차이를 평준화할 수 있다.
- CSS에는 존재하지 않는 Mixin 등의 강력한 기능을 활용하여 CSS 유지보수 편의성을 큰 폭으로 향상시킬 수 있다.

## SASS, SCSS 차이점

SASS가 처음 출시됐을 때에는, 문법이 CSS 문법과 많이 달랐습니다. 당시 일부 개발자들이 새 문법에 적응하는데 많은 어려움을 겪었기 때문에 SASS 버전 3 이상부터는 .scss 문법으로 변경이 됩니다. SCSS는 CSS 문법에 SASS 기능을 추가한 형태의 문법이기 때문에 익히기가 쉽습니다.

더 쉽고 간단한 차이는 {}(중괄호)와 ;(세미콜론)의 유무입니다.

### Sass 예

- Sass는 선택자의 유효범위를 ‘들여쓰기’로 구분합니다.
- Sass는 =와 + 기호로 Mixins 기능을 사용합니다.

```
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px
```

```
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

.box
  +border-radius(10px)
```

### SCSS 예

- SCSS는 {}로 범위를 구분합니다.
- SCSS는 @mixin과 @include로 기능을 사용했습니다.

```
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}
```

```
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```

## SASS 활용

SASS 활용을 위해선 컴퓨터에 SASS 컴파일러가 필요합니다.

### Ruby Sass

- 가장 기본적인 컴파일러입니다. 하지만 2019년 3월 쯤에 deprecate 될 예정입니다.
- 대신에 Dart Sass 컴파일러를 권장하고 있습니다.
- Ruby 언어 사용자가 아니면 환경을 구성하는데 조금 어려울 수 있습니다.
- 환경 구성 이후에는 비교적 쉬운 편입니다.

### LibSass

- C++ 언어로 구현되었습니다.
- 다양한 언어에서 Sass 라이브러리를 사용할 수 있습니다.
- 저레벨 언어로 구현되었기 때문에 빠르고 간편합니다.
- 반대로 새로운 특징을 추가하는 건 까다로울 수 있습니다.
- 참고) node-sass는 Node.js를 컴파일러인 LibSass에 바인딩한 라이브러리 입니다.

### Dart Sass

- Dart 언어로 구현되었습니다.
- 공식 문서 : https://github.com/sass/dart-sass/blob/master/README.md
- 명령줄만으로 굉장히 간단하게 Dart 가상 머신을 이용하여 sass 파일을 컴파일 할 수 있습니다.
- 자바스크립트 라이브러리 형태로 이용할 수 있습니다.
- 소개글 : http://sass.logdown.com/posts/1022316-announcing-dart-sass
  └ 기존의 Ruby Sass, 그리고 LibSass의 단점을 보완하고자 새로 만들어진 컴파일러입니다.
  └ Dart 가상 머신을 사용합니다.
  └ 큰 용량의 스타일 시트를 변환할 때 Ruby Sass보다 5~10배 빠르고, LibSass보다 1.5배 느립니다.
  └ LibSass보다 쉽고, 어느 정도는 Ruby보다 더 큰 규모의 프로젝트를 수행할 수 있습니다.

### GUI 컴파일러

- 그 외에도 프로그램을 이용하여 컴파일 할 수도 있습니다.
- 아래 사이트가 도움이 좀 될 겁니다.
- https://1stwebdesigner.com/best-css-tools/




## 사용
### 가져오기(Import)
@import로 외부에서 가져온 Sass 파일은 모두 단일 CSS 출력 파일로 병합됩니다. 또한, 가져온 파일에 정의된 모든 변수 또는 Mixins 등을 주 파일에서 사용할 수 있습니다. Sass @import는 기본적으로 Sass 파일을 가져오는데, CSS @import 규칙으로 컴파일되는 몇 가지 상황이 있습니다.

- 파일 확장자가 .css일 때
- 파일 이름이 http://로 시작하는 경우
- url()이 붙었을 경우
- 미디어쿼리가 있는 경우
- 위의 경우 CSS @import 규칙대로 컴파일 됩니다.

```
@import "hello.css";
@import "http://hello.com/hello";
@import url(hello);
@import "hello" screen;
```

### 중첩
```
.section {
  width: 100%;
  .list {
    padding: 20px;
    li {
      float: left;
    }
  }
}
```

### 상위 선택자 참조
```
.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child {
      margin-right: 0;
    }
  }
}

.fs {
  &-small { font-size: 12px; }
  &-medium { font-size: 14px; }
  &-large { font-size: 16px; }
}
```

### 중첩 벗어나기
```
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
  @at-root .box {
    width: $w;
    height: $h;
  }
}


/* 변수 유효범위 
 .list 안에 있는 특정 변수를 범위 밖에서 사용할 수 없기 때문에, 
  위 예제 처럼 @at-root 키워드를 사용해야 한다. */

.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
}

// Error
.box {
  width: $w;
  height: $h;
}


```

### 중첩된 속성
font-, margin- 등과 같이 동일한 네임 스페이스를 가지는 속성들을 다음과 같이 사용할 수 있습니다.

```
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  };
  margin: {
    top: 10px;
    left: 20px;
  };
  padding: {
    bottom: 40px;
    right: 30px;
  };
}
```





### !global (전역 설정)
!global 플래그를 사용하면 변수의 유효범위를 전역(Global)로 설정할 수 있습니다.
```
.box1 {
  $color: #111 !global;
  background: $color;
}
.box2 {
  background: $color;
}

```

### !default (초깃값 설정)
!default 플래그는 할당되지 않은 변수의 초깃값을 설정합니다.
즉, 할당되어있는 변수가 있다면 변수가 기존 할당 값을 사용합니다.

```
$color-primary: red;

.box {
  $color-primary: blue !default;
  background: $color-primary;
}

```



### 확장(Extend)
특정 선택자가 다른 선택자의 모든 스타일을 가져야하는 경우가 종종 있습니다. 이럴 경우 선택자의 확장 기능을 사용할 수 있습니다.

```
.btn {
  padding: 10px;
  margin: 10px;
  background: blue;
}
.btn-danger {
  @extend .btn; /* 다중선택자로 변환됨 .btn, .btn-danger*/
  background: red; 
}
```



### 함수
자신의 함수를 정의하여 사용할 수 있습니다.

```
$max-width: 980px;

@function columns($number: 1, $columns: 12) {
  @return $max-width * ($number / $columns)
}

.box_group {
  width: $max-width;

  .box1 {
    width: columns();  // 1
  }
  .box2 {
    width: columns(8);
  }
  .box3 {
    width: columns(3);
  }
}
```

### 조건식 if (함수)
조건의 값(true, false)에 따라 두 개의 표현식 중 하나만 반환합니다. 조건부 삼항 연산자(conditional ternary operator)와 비슷합니다.

```
$width: 555px;
div {
  width: if($width > 300px, $width, null);
}
```

### @if 지시어
```
$bg: true;
div {
  @if $bg {
    background: url("/images/a.jpg");
  }
}
```

### @each
List와 Map 데이터를 반복할 때 사용합니다. for in 문과 유사합니다.

```
// List Data
$fruits: (apple, orange, banana, mango);

.fruits {
  @each $fruit in $fruits {
    li.#{$fruit} {
      background: url("/images/#{$fruit}.png");
    }
  }
}
```


---

해당 내용은 다음 글을 참고 하였습니다.

- https://velog.io/@velopert/react-component-styling
- https://heropy.blog/2018/01/31/sass/
