---
layout: post
title: input에는 before & after로 컨텐츠를 꾸밀 수 있다? 없다?
categories: HTML
---

CSS 작업할때 요소를 직접 만들지 않고 기존요소에 ::before, ::after를 이용해서 처리할때가 있습니다. 하지만, 어떤 태그에서 작동이 안하는 경우가 있는데요. 이에 대해서 알아봅니다.

## 가상요소(Pseudo Element)

가상요소란 존재하지 않는 요소들 존재하는 것처럼하여 문서의 특정 부분에 선택이 가능하도록합니다. 보통은 가상요소를 활용하여 요소에 추가적인 스타일링을 할 수 있습니다. 요소의 컨텐츠 부분에 컨텐츠를 추가하거나 첫번째 글자 또는 드래그된 영역의 속성을 변경하는데 사용합니다.

- before, after, first-letter, selection, marker 등

### before & after

자주사용하는 가상요소입니다.

- ::before: 실제 내용 바로 앞에서 생성되는 자식요소
- ::after: 실제 내용 바로 뒤에서 생성되는 자식요소​

참고) 사용할때에는 content라는 속성이 꼭 필요합니다. 이는 HTML 문서에 정보로 포함되지 않은 요소를 CSS에서 새롭게 생성시켜줍니다.

## 대체요소(Replaced Element)

대체 요소(replaced element)란 자신의 표현 결과가 CSS의 범위를 벗어나는 요소로서, CSS 서식 모델과는 분리된 외부 객체인 요소입니다. 대체 요소는 자신의 콘텐츠가 현재 문서 스타일의 영향을 받지 않는 요소라고 할 수 있습니다.

- iframe, video,embed, img, option, audio, canvas, object

참고) img,input,embed 는 가상요소가 될수도있고 대체요소가 될 수 있습니다.

## input과 before 가상요소

input에는 다양한 타입들이 존재하는데 타입에 따라 가상요소가 적용되기도 하고 적용되지 않기도 합니다.

```html
<input type="button" />
<input type="checkbox" />
<input type="color" />
<input type="date" />
<input type="datetime-local" />
<input type="email" />
<input type="file" />
<input type="hidden" />
<input type="image" />
<input type="month" />
<input type="number" />
<input type="password" />
<input type="radio" />
<input type="range" />
<input type="reset" />
<input type="search" />
<input type="submit" />
<input type="tel" />
<input type="text" />
<input type="time" />
<input type="url" />
<input type="week" />
```

다음으로 스타일을 적용하여 확인할 수 있습니다.

```css
input {
  display: block;
  margin-bottom: 30px;
}
input::before {
  content: attr(type);
}
```

<iframe id="iframe" class="iframe"></iframe>

<script defer>
	const iframe = document.getElementById("iframe");
	const url = 'https://raw.githubusercontent.com/imjhua/animation/master/input-before';
	showIFrameDoc(iframe, url);
</script>

## 정리

디자인을 제어할 때 before, after 가상요소를 사용하여 보다 효율적으로 스타일을 줄 수 있습니다. 요소에 장식처럼 사용할 수 있는 하나의 방법인데 이는 원본 요소의 서식박스에 포함되므로 input, img나 br 등 대체 요소에 적용할 수 없습니다. 특히 input의 경우 타입에 따라 장식이 가능할수도 그렇지 않을 수도 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/CSS/::before
- https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements
- https://hasudoki.tistory.com/entry/input-image-등에서-before-를-사용할-수-없는-이유
