---
layout: post
title: first-child 와 first-of-type
categories: CSS
---

요소들의 첫번째 엘리먼트를 선택하기위해 사용하는 셀렉터로 first-child 와 first-of-type 이 있습니다. 비슷해보이지만 다르고 이들이 가지는 특성이 있는데요. 함께 알아보겠습니다.

## first-child 와 first-of-type

두가지 셀렉터모두 형제요소들의 첫번째 요소를 선택하는데요. 첫번째 요소를 지정하는 기준에 차이가 있습니다. 단순히 같은 레벨의 요소라고 보면 잘못 사용하기 쉽습니다. 형재요소란, 태그 또는 클래스명 등과 같은 것으로 구분하는 것이 아닌, 단순히 같은 레벨의 요소를 의미합니다. 따라서 해당 셀럭터는 특정 태그와 클래스로 그룹화 할 수 없습니다.

### first-child

형제 요소의 그룹중 첫번째 요소를 나타냅니다.

```html
<div>
  <p>A: This text is selected!</p>
  <p>B: This text isn't selected.</p>
</div>

<div>
  <h2>AA: This text isn't selected: it's not a `p`.</h2>
  <p>BB: This text isn't selected.</p>
</div>
```

```css
p:first-child {
  color: lime;
}
```

이때 선택되는 p는 A: 문자열을 포함하는 p 입니다.

### first-of-type

형제 요소의 그룹중 해당 타입의 첫번재 요소를 나타냅니다. 해당타입이라고 하는 것은

```html
<h2>Heading</h2>
<p>A: Paragraph 1</p>
<p>B: Paragraph 2</p>
```

```css
p:first-of-type {
  color: red;
}
```

이때 선택되는 p는 A: 문자열을 포함하는 p 입니다.

## 코드 예

하고자 하는 것은 fixed된 마지막 dt의 바로 다음 dd에 padding을 주고 싶다. Beanstalk문자열을 가지는 dd는 어떻게 선택할 수 있을까?

```html
<dl>
  <dt class="fixed">A</dt>
  <dd>Airplane</dd>
  <hr />
  <dt class="fixed">B</dt>
  <dd>Beanstalk</dd>
  <hr />
  <dt>C</dt>
  <hr />
  <dt>D</dt>
  <hr />
  <dt>E</dt>
</dl>
```

다음과 같이 first-child 와 first-of-type 셀렉터로는 선택할 수 없는것이다. 이유는? 형재요소들에서 첫번째는 선택하기 때문에..

```js
document.querySelectorAll('dt.fixed')
NodeList(2) [dt.fixed, dt.fixed]0: dt.fixed1: dt.fixedlength: 2__proto__: NodeList
document.querySelectorAll('dt.fixed:last-of-type')
NodeList []
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child
- https://developer.mozilla.org/en-US/docs/Web/CSS/:first-of-type
