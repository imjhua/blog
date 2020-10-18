---
layout: post
title: 백그라운드 이미지 채우기
categories: Web
---

영역의 배경에 이미지를 적용하는 방법으로 background-size를 사용합니다. 요소를 가득 채우는 두가지 값이 존재하는데요. 이 차이를 알아봅니다.

## 배경 채우기

배경을 채우는데 cover와 contain이 존재합니다. 두 값의 차이는 비율입니다.

- contain: 원본비율
- cover: 중앙비율

contain의 경우는 이미지 전체가 보여지도록 설정이 됩니다. 이때 div의 크기에 따라서 이미지가 전체에 꽉 들어차지 못할수도 있습니다. 반면 cover는 div 영역 안에 백그라운드 이미지가 빈 틈 없이 매워지게 하는 가장 효과적인 방법입니다.

고정된 이미지를 어떤 영역에 채울때 사이즈가 꼭 맞아떨어질 수는 없을 것입니다. 경우에 따라서 이미지를 잘라야하는 경우도 존재할텐데요. 보통은 이미지 위치(position)를 가운데 영역으로 지정하여 사이드부분을 제외하도록 합니다.

```css
background: url(../images/img01.jpg) no-repeat center center/cover;
```

참고) center/cover은 X축center & Y축cover 위치를 뜻함.

## 정리

이미지 사이즈 그대로를 배경에 넣으면 contain을, 꽉 채우고자 하는 경우 cover를 사용합니다!

---

해당 내용은 다음 글을 참고 하였습니다.

- https://rgy0409.tistory.com/2994
