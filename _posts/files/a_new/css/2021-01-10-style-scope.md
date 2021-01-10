---
layout: post
title: 범위를 가지는 style
categories: CSS
---

style 태그가 scoped 속성을 가지는 경우가 있습니다. 이는 현재 컴포넌트의 엘리먼트에만 적용된다는 의미입니다.

## 사용 예

전역스타일이 아닌 단일 컴포넌트내에서 스타일이 정의합니다. 이렇게 스타일이 적용이 되면 Shadow DOM에 있는 스타일 캡슐화와 유사하게 동작합니다.

```html
<style scoped>
  ... {
  }
</style>
```

## 정리

충돌을 일으킬 가능성이 거의 없이 내부 스타일을 더 쉽게 재정의 할 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://kr.vuejs.org/v2/style-guide/index.html
