---
layout: post
title: Skeleton screen(스켈레톤 스크린)
categories: Web
---

페이지에서 요청하는 데이터를 기다리는 동안 로딩중의 상태를 나타내는 다양한 방법들이 있습니다. 스피너 기법이나, 프로그래스바 스켈레톤 스크린을 보여줌으로써 사용자가 대기중의 상태를 알려줌과동시에 빠르게 로드되고 있다는 것을 전달하기 위함입니다. 스켈레톤이란, CSS코드의 뼈대 또는 프레임 역할을 하는 파트라는 의미로 흔히 사용됩니다.

## 스켈레톤 스크린

skeleton은 뼈대를 의미하는 단어입니다. 데이터를 받고 있는 로딩중의 상태를 나타내기 위하여 로딩 스켈레톤 스크린을 노출합니다. 페이스북이나 유튜브의 첫 화면을 보면, 아주 잠깐 프레임을 그려주는 빈 페이지를 확인할 수 있습니다.

## 구현해보자 (only CSS)

그럼 이러한 UI는 어떤 방법으로 구현할 수 있을까요? CSS의 linear-gradient 속성을 활용하여 이를 구현할 수 있습니다. 필요에 따라 자식엘리먼트가 없는 경우에만 적용하기 위해 :empty선택자를 사용하기도 합니다.

### linear-gradient

linear-gradient() CSS 함수는 두 개 이상의 색이 직선을 따라 점진적으로 변화하는 이미지를 생성합니다. 기본적으로 방향은 위에서 아래(to bottom)입니다. 함수의 결과는 image의 특별한 종류인 gradient자료형입니다. 따라서 gradient는 image의 한 종류로서 image를 사용하는 곳에만 적용할 수 있습니다. linear-gradient()를 background-color 등 color 자료형을 받는 속성에는 사용할 수 없습니다.

- 사용법: linear-gradient([driection], #color1, #color2) (2개 이상의 색상은 필수)
  참고) driection는 생략 가능 하며, 사용시 top, left, right deg 등 다양한 인자를 사용하여 위치 혹은 그라데이션 각도 변경이 가능하다.

```css
.element {
  width: 300;
  height: 400;
  background: linear-gradient(0, blue, black);
}
```

두 번째 값이 투명할 경우에는 첫 번째 색으로만 표현됩니다.

```css
.element {
  background: linear-gradient(yellow 50%, transparent 0);
}
```

#### background-image에 드로잉

하나의 div에 background-image로 도형을 드로잉해 볼 수 있습니다. 또한 background-image를 직접 사용하여 여러개의 배경 이미지(중첩)로 활용 할 수 있습니다. 이는 CSS3(IE8 이하 버전에서는 사용할 수 없다.)에서 지원하는 기능으로 첫 번째로 지정한 배경이 가장 앞에 보이고 나중에 지정한 배경이 뒤에 보입니다. 배경 색상(color)는 맨 마지막에만 지정할 수 있습니다. ,(쉼표)로 구분하여 배경이미지를 지정합니다.

주의) multi background의 경우에 쌓임맥락은 z-index와 약간 다르다는 점입니다. 하나의 요소 안에서 이루어지기 때문에 먼저 선언할수록 위쪽으로 쌓이게 됩니다. 따라서 지금까지 만든 도형보다 위쪽에 레이어를 선언해주어야 합니다.

참고) 위치를 각자 지정해 주지 않으면 배경이미지가 겹쳐 보이기 때문에 배경이미지들의 위치(position)또는 크기(size)를 마찬가지 ,(쉼표)로 구분하여 지정해 주어야 한다.

```css
.element {
  width: 300;
  height: 400;

  background-image: linear-gradient(lightgrey 15px, transparent 0),
    linear-gradient(lightgrey 15px, transparent 0), linear-gradient(lightgrey
        15px, transparent 0);

  /* 위치를 각자 지정해 주지 않으면 배경이미지가 겹쳐 보인다. */
  /* 좌측에서 5px만큼 y축으로 5px(선굵기-간격[15px-20px])씩 띄움 */
  background-position: 5px 10px, 5px 30px, 5px 50px;
  /* gradient의 size가 아닌, gradient 기준으로 width height 만한 사각형을 만든다고 생각 하자 */
  background-size: 100px 100px, 150px 100px, 150px 100px;
  background-repeat: repeat-y;
}
```

#### background-image의 크기를 이용한 반복 적용

background-image의 사용법은 조금 햇갈릴 수 있는데, 이 값은 gradient 자체의 width와 height가 아닌 gradient 부터 시작하는 사각형을 준다고 생각하면 됩니다. 이러한 사각형들을 반복적(background-repeat: repeat-y;)으로 적용하여 여백을 설정하고 싶을 때 사용하는 방법입니다. width heigth 값은 gradient 선의 속성이 아님을 유의해야 합니다.!

### 애니메이션 적용

빛이 지나가는 듯한 움직임(이또한 linear-gradient영역!)을 위해 흰색 그라데이션(하이라이트 영역)의 이미지와 keyframe animation을 추가하면 효과를 표현할 수 있습니다. 첫번째 영역과 동일한 시작점을 가지는 highlight를 위한 linear-gradient를 추가하고, 애니메이션을 적용하여 해당 위치가 변경되도록 합니다. z-index와는 다른 multi background의 경우에 쌓임맥락에 따라 하이라이트 되는 영역은 지금까지 만든 도형보다 위쪽에 레이어를 선언해주어야 합니다.

```css
.element {
  width: 300px;
  height: 100px;
  background-image: 
    /* highlight */ linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 40%,
      rgba(255, 255, 255, 0) 70%
    ), linear-gradient(lightgrey 15px, transparent 0);
  background-position: 5px 10px, 5px 10px;
  background-size: 100px 15px;
  background-repeat: no-repeat;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 10px, 5px 10px;
  }
}
```

## 정리

단 하나의 태그에서 CSS 만으로 그려질 수 있다는 점에서 코드가 간단하며 변형 및 확장이 용이합니다. 또한 background-image 속성은 렌더링 시, layout 변동 없이 paint, composite 과정만 거치기 때문에 성능적으로도 이점있습니다. 이를 응용하면 CSS를 활용한 패턴 제작 및 로딩아이콘, 차트 등의 다양한 드로잉도 시도해 볼 수 있습니다.

단점으로는 background-image 속성의 브라우저 범위는 Multiple backgrounds 는 IE9이상, Gradients는 IE10 이상으로, 대응 범위를 확인하여 문법을 작성해야 하며 -webkit-, -moz-, -ms- and -o-의 벤더 프리픽스를 필요로 합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/CSS/linear-gradient
- https://unordinarydays.tistory.com/184
- https://wit.nts-corp.com/2018/11/19/5371
- https://codepen.io/viktorstrate/pen/yoBRLy
- https://ideveloper2.tistory.com/168
- https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Background_and_Borders/Using_CSS_multiple_backgrounds
- https://css-tricks.com/stacking-order-of-multiple-backgrounds/
