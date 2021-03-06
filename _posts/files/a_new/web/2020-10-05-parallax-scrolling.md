---
layout: post
title: Parallax Scrolling(패럴랙스 스크롤링)
categories: Web
---

Parallax Scrolling(패럴랙스 스크롤링)은 스크롤을 할 때 개체마다 움직이는 속도를 다르게 하여 입체감을 주는 기법을 말합니다. 스크롤에 따른 원경과 전경을 구분해서 입체감과 원근감을 줄 수도 있고, 같은 심도의 개체들이 서로 다른 속도값을 갖게 해서 역동성을 줄 수도 있습니다. 패럴랙스 스크롤링에 대한 다양한 활용법을 알아봅니다.

<hr >

<!-- vscode-markdown-toc -->

- [소개](#소개)
- [효과](#효과)
  - [걸어가기](#걸어가기)
    - [배경](#배경)
    - [여러개의 겹쳐진 레이어](#여러개의-겹쳐진-레이어)
    - [중심이 되는 사람](#중심이-되는-사람)
  - [년도별 스크롤링](#년도별-스크롤링)
  - [핸드폰 액정을 통해 반전 이미지 보기](#핸드폰-액정을-통해-반전-이미지-보기)
- [시차 스크롤링 효과를 만드는 방법](#시차-스크롤링-효과를-만드는-방법)
  - [background-attachment](#background-attachment)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='소개'></a>소개

패럴럭스 스크롤링(parallax scrolling)은 사용자가 마우스를 스크롤할 때, 원거리에 있는 배경 이미지는 느리게 움직이게 하고, 근거리에 있는 사물 이미지는 빠르게 움직이도록 함으로써 입체감을 느낄 수 있게 만든 디자인 기법입니다. 하나의 이미지를 여러 개의 레이어(layer)로 분리한 후 스크롤에 반응하는 속도를 다르게 조정하는 방식으로 구현합니다. 1930년대부터 애니메이션 분야에 사용되던 기법이었으나, 웹 디자인 분야는 HTML5와 CSS3 기법이 도입됨으로써 사용이 가능해졌습니다.

## <a name='효과'></a>효과

### <a name='걸어가기'></a>걸어가기

X축으로 스크롤시 배경이 조금씩 지나가면서 앞에는 나무들을 비롯한 타인들이 천천히 지나갑니다. 걸어가는 사람은 고정되어 있지만 다리가 움직일 수 있습니다. 반대방향으로 스크롤을 하면 사람이 바라보는 방향이 달라지는 군요.

참고) http://ruth.realityla.com/

#### <a name='배경'></a>배경

- 여러배경이 div로 이어붙어져있다.

#### <a name='여러개의-겹쳐진-레이어'></a>여러개의 겹쳐진 레이어

배경 앞에 레이아웃 영역(나무와 사람)을 두어 속도감에 차이를 두면 입체감을 줄 수 있습니다. 예를 들면, 맨 앞에 있는 레이어는 중간에 있는 레이어보다 8배 빠르게 움직이고 있고, 중간 레이어는 구름이 있는 배경 레이어보다 2배 빠르게 움직인다.

- 뒤 배경은 빠르게 지나간다.
- 배경앞 레이아웃 영역은 그보다 천천히 지나간다.

#### <a name='중심이-되는-사람'></a>중심이 되는 사람

- 스크롤 방향으로 바라볼것
- 이동시마다 손과 다리가 움직일 것
- 이동은 spite이미지와 background의 position 값을 활용하기

### <a name='년도별-스크롤링'></a>년도별 스크롤링

컨텐츠를 스크롤(y축)할 때 마다 왼쪽 년도가 선택됩니다. 어느정도에 위치하고 있는지도 arrow로 나타납니다.

참고) https://mintdigital.com/

### <a name='핸드폰-액정을-통해-반전-이미지-보기'></a>핸드폰 액정을 통해 반전 이미지 보기

두개의 이미지가 겹쳐있는 상태에서 핸드폰 액정을 사이에 넣으면 반전(x-ray)이미지가 보입니다.

참고) https://www.beckett.design/

## <a name='시차-스크롤링-효과를-만드는-방법'></a>시차 스크롤링 효과를 만드는 방법

### <a name='background-attachment'></a>background-attachment

컨테이너 요소를 사용하고 특정 높이의 컨테이너에 배경 이미지를 추가합니다. 다음 background-attachment: fixed 를 설정하여 배경을 고정합니다. 다른 배경 속성은 이미지를 완벽하게 중앙에 배치하고 크기를 조정하는 데 사용됩니다.

```css
.parallax {
  /* The image used */
  background-image: url("img_parallax.jpg");

  /* Set a specific height */
  height: 500px;

  /* Create the parallax scrolling effect */
  /* scroll | fixed | local */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.wikipedia.org/wiki/%ED%8C%A8%EB%9F%B4%EB%9F%AD%EC%8A%A4_%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%A7%81
- https://noa-xyz.tistory.com/23
- http://ruth.realityla.com/
