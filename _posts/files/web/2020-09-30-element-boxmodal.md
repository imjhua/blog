---
layout: post
title: 엘리먼트의 크기
categories: Web
---

엘리먼트의 크기를 나타내는 속성들이 몇가지 있습니다. 엘리먼트의 크기 또한 엘리먼트를 구성하는 박스모달을 기준으로 차이가 있습니다.

## 엘리먼트의 박스모달

엘리먼트의 박스모달은 텍스트를 포함한 컨텐츠 + 패딩 + 보더 + 마진 으로 구성됩니다. 박스모달의 영역들을 기준으로 하여 엘리먼트의 크기가 달라질 수 있습니다. 컨텐츠라고 할때, 켄텐츠영역은 패딩과 border(테두리)는 포함하지 않습니다.

### 달라지는 기준

#### 패딩만 포함

margin값과 border값이 제외된, padding값까지만 적용된 내부의 실제 크기를 가져옵니다. 패딩을 포함하고 있기때문에 패딩값이 달라지면 크기도 달라집니다.

- clientWidth & clientHeigh

#### 마진만 제외

패팅 & 보더 & 스크롤을 포함하며 일반적으로 많이 사용됩니다. 스크롤이 있는경우 스크롤을 포함하며, 스크롤의 크기는 브라우저마다 다릅니다. 크롬 약 17

- offsetWidth & offsetHeight

#### 스크롤로 감싸진 영역의 크기

스크롤이 존재하는 경우 스크롤로 감싸진 영역의 크기입니다. 패팅 & 보더를 포함합니다.

- scrollWidth & scrollHeight

일반적으로 width와 height는 엘리먼트의 컨텐츠의 크기를 지정합니다. 패딩과 보더를 포함하여 크기를 계산하는 것이 엘리먼트의 크기를 예측하기 쉽기 때문에 패딩과 보더를 포함하여 엘리먼트 크기를 계산 할 수 있도록 css 속성을 사용하기도 합니다.

## 레이아웃 크기와 렌더링 크기

### getBoundingClientRect()

대부분의 경우엔 getBoundingClientRect()은 마진만을 제외(패딩 보더 포함)한 offsetWidth, offsetHeight와 거의 같은 값을 리턴합니다. 하지만, transform이 적용되어 있다면 조금 달라집니다.

offsetWidth와 offsetHeight 속성은 엘리먼트의 레이아웃 크기를 리턴하는 반면,getBoundingClientRect()는 렌더링된 크기를 반환합니다. 이게 어떤 차이냐면 실제 엘리먼트의 레이아웃크기와 렌더링된 화면의 페인팅픽셀의 범위에 차이가 있다는 것입니다.

엘리먼트에 다음과 같은 속성이 적용되어 있습니다.

```css
 {
  width: 100px;
  transform: scale(0.5);
}
```

- 엘리먼트 크기: 레이아웃은 100 -> offsetWidth은 100
- 렌더링된 크기: 페인팅(확대) 50 -> getBoundingClientRect()는 50

최종 렌더링된 값을 가져오고 싶다면, offsetWidth 대신 getBoundingClientRect()를 사용하면 됩니다.

### Canvas의 크기

width 및 height 속성을 지정하지 않으면 캔버스의 처음 너비는 300 픽셀이고 높이는 150 픽셀입니다. 요소는 CSS에 의해 임의로 크기를 정할 수 있지만 렌더링하는 동안 이미지는 레이아웃 크기에 맞게 크기가 조정됩니다. CSS 크기 지정이 초기 캔버스의 비율을 고려하지 않으면 왜곡되어 나타납니다.

css로 영역을 늘리는 것은 페인팅 픽셀을 조정하는 것이다. 실제 물리적인 레이아웃의 크기가 아니므로 화질이 깨질수 있습니다. css로 무리하게 크기를 지정할할 때 확대 혹은 축소합니다.

물리적인 레이아웃의 크기는 10 _ 15 밖에 되지 않습니다. 이를 400 _ 300으로 늘려버리면 흐릿하게 보입니다.

```html
<style>
  #c {
    width: 400px;
    height: 300px;
  }
</style>
<canvas id="c" width="10" height="15"></canvas>
```

반대로 선명한 화면을 위해서 레이아웃크기를 키우고 css를 통해 크기를 줄이면 보다 선명해집니다.

```html
<style>
  #c {
    width: 40px;
    height: 30px;
  }
</style>
<canvas id="c" width="100" height="150"></canvas>
```

## box-sizing

박스의 크기를 화면에 표시하는 방식을 변경하는 속성입니다. 따라서 테두리가 있는 경우에는 테두리의 두께로 인해서 원하는 크기를 찾기가 어렵습니다.

### content-box

기본값으로 패딩과 보더를 제외한 컨텐츠의 크기입니다.

### border-box

테두리를 기준으로 크기를 정합니다. 마진을 제외한 패딩과 테두리를 포함한 크기를 지정할 수 있기 때문에 예측하기가 더 쉽습니다. 최근엔 모든 엘리먼트에 이 값을 지정하는 경우가 늘고 있습니다.

## 정리

- 패딩만 포함: clientWidth & clientHeigh
- 마진만 제외: offsetWidth & offsetHeight
- 스크롤로 감싸진 영역: scrollWidth & scrollHeight

엘리먼트의 원하는 크기를 얻으려면 테두리나 안쪽 여백을 고려해야 합니다. width와 height를 정의하더라도, 패딩과 보더에 따라 엘리먼트의 크기가 달라지기 때문에 에측가능하기 위해서는 패딩과 보더까지를 포함(마진만 제외)하도록 하면 좋습니다.

box-sizing속성을 통해 border-box로 지정하면 패딩과 테두리를 포함(마진제외)한 크기를 지정하여 크기를 예측할 수 있다.

content-box는 기본 CSS 박스 크기 결정법을 사용합니다. 요소의 너비를 100 픽셀로 설정하면 콘텐츠 영역이 100 픽셀 너비를 가지고, 테두리와 안쪽 여백은 이에 더해집니다.
border-box는 테두리와 안쪽 여백의 크기도 요소의 크기로 고려합니다. 너비를 100 픽셀로 설정하고 테두리와 안쪽 여백을 추가하면, `콘텐츠 영역이 줄어들어 총 너비 100 픽셀`을 유지합니다. 대부분의 경우 이 편이 크기를 조절할 때 쉽습니다.
구문

참고) 마진만 제외한 엘리먼트 크기는? offsetWidth & offsetHeight

그리고.. 물리적인 레이아웃의 크기와 렌더링크기의 차이는?

- clientWidth 실제 크기 요소가 차지하는 실존. 존재. 레이아웃상의 물리적 크기
- getBoundingClientRect는 변화를 고려하여 렌더링 해서 화면에 그려지는 영역을 담당한다. 요소가 화면에서 차지하는 공간의 양.
- canvas의 기본은 300 \* 150. CSS 크기 지정이 초기 캔버스의 비율을 고려하지 않으면 왜곡되어 나타난다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/CSS/box-sizing
- https://opentutorials.org/course/2418/13405
- https://ohgyun.com/571
- https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Basic_usage
