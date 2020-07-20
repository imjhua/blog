---
layout: post
title: Canvas & SVG
categories: Web
---

HTML5 Canvas와 SVG 두 웹기술은 브라우저안에서 풍부한 그래픽을 만들어내는 것이나 이 두개는 근본적으로 서로 다릅니다. Canvas 요소와 SVG 요소는 거의 같은 결과물을 얻을 수 있는 비슷한 동작을 하는 요소입니다. 어떤 경우에는 Canvas 요소를 사용하는 것이 더 나으며, 어떤 경우에는 SVG 요소를 사용하는 것이 더 나은 경우가 있습니다.

## SVG

SVG는 확장 가능한 벡터(Vector) 그래픽을 의미합니다. SVG는 웹을 위한 벡터 기반, XML 형식의 그래픽을 정의하는 데 사용됩니다. 확대 하거나 크기를 변경해도 SVG 그래픽의 품질은 전혀 손상이 없습니다. 동영상으로 된 SVG의 모든 요소와 모든속성은 W3C의 권장사항에 포함 됩니다.

SVG는 XML을 기반으로 하여, 모든 요소가 SVG DOM 내에서 사용할 수 있음을 의미합니다. 또한 요소에 자바스크립트 이벤트 핸들러를 첨부 할 수도 있습니다. SVG에서 각각 그려진 모양은 하나의 개체(오브젝트)로 기억됩니다. SVG 객체의 특성이 변경되는 경우, 브라우저가 자동으로 형상을 다시 렌더링 할 수 있습니다.

### 장점

JPEG 혹은 GIF 등과 같은 다른 형식의 이미지와 구별되는 SVG의 장점은 다음과 같습니다.

- SVG 이미지를 생성한 후 텍스트 편집기로 편집 할 수 있습니다.
- SVG 이미지는 검색 색인, 스크립트 및 압축 할 수 있습니다.
- SVG 이미지는 확장 가능합니다.
- SVG 이미지는 해상도에 관계없이 고품질로 인쇄 할 수 있습니다.
- SVG 이미지는 품질의 손실없이 줌(Zoom: 크게보기/작게보기)이 가능합니다.

### 단점

- DOM이 복잡하면 렌더링도 복잡해져서 아무래도 느려집니다.

## Canvas

캔버스(Canvas)는 비트맵 그래픽을 표현합니다. Canvas는 픽셀에서 픽셀로 렌더링됩니다. 일단 캔버스의 그래픽이 브라우저로 전달되어 그려진 후에 그 정보들은 지워집니다. 따라서 그것의 위치를 변경해야하는 경우, 전체 장면은 그래픽이 적용되었을 수있는 모든 개체를 포함하여, 다시 그려야만 합니다. (코드를 수정하여 다시 브라우저로 전달하면 좀전의 그 그래픽 이미지는 삭제되고 새로운 그래픽이 표현 되는 방식 입니다.)

### 장점

- 동적인 화면 변화에 빠르게 렌더링 된다.

### 단점

- 텍스트 렌더링 기능이 미약하다.
- 이벤트 핸들러 지원이 없다.

## Canvas vs SVG

작업 환경에 따른 선택의 기준이 달라질 수 있습니다.

### 차이점

| Canvas | SVG |
| 자바스크립트로 2D 그래픽을 그려낸다 | XML의 2D 그래픽을 기술하는 언어 |
| 픽셀(pixel) 기반 | 모양(shape) 기반 |
| 해상도에 의존 | 해상도 독립적 |
| 비트맵 그래픽 표현 | 벡터 기반 그래픽 표현 |
| 단일 HTML 요소 | DOM의 일부분이 되는 다중 그래픽 요소 |
| 스크립트(script)를 통해서만 수정할 수 있음. | 스크립트(script) 및 CSS를 통해서도 수정할 수 있음. |
| 그래픽이 주작업인 게임에 적합함. | 렌더링 영역이 넓은 응용 프로그램(application)에 적합함(구글지도) |

#### 참고

| 비트맵(사진) | 벡터(그림) |
| 정사각형의 픽셀이 모여 만든 이미지 | 점과 점이 이루는 선분, 면에 수학적 연산으로 만들어짐 |
| 깨짐 (계단현상) | 깨지지않음 |
| 픽셀색이 다 달라 경계가 뚜렷X | 면으로 이루어져있어 뚜렷O |
| 사진보정, 합성, 복잡 작업 ex)영화 포스터 | 도형으로 만드는 작업 ex)로고, 캐릭터, 명함 등 |
| 사실 표현 가능, 색감풍부, 특수효과 사용가능 | 확대시 깨지지않아 대형 인쇄물 사용가능 |
| 사이즈, 해상도 등으로 변화. 사이즈 및 용량 커짐 | 크기 제약 없음. 용량 변하지 않음 |
| 포토샵, 페인터 등 | 일러스트레이터, 코렐, 플래시 |
| jpg, gip, png, bmp... | ai, swf, wmf ... |

### 렌더링 시간

렌더링(rendering)이란 프로그램을 사용하여 모델로부터 영상이나 화면을 만들어내는 과정을 가리킵니다. 따라서 렌더링 시간이란 코드를 실행하여 그 결과가 화면에 표시되는 시간을 의미합니다.

- svg 요소의 성능은 화면이 크거나, 픽셀 수가 적을 경우(<10k)에 좋습니다.
- canvas 요소의 성능은 화면이 작거나, 픽셀 수가 많을 경우(>10k)에 좋습니다.

## 작업 종류

- svg 요소는 고품질의 문서 작업이나 정적 이미지의 조작 작업 등에 잘 어울립니다.
- canvas 요소는 복잡하고 고성능의 애니메이션(animation) 작업이나 동영상 조작 등의 작업에 잘 어울립니다.

## Canvas & SVG 정리

- SVG: 디자인 및 요소별 커스터마이징 가능, 다양한 해상도에 적합, 정적인 데이터
- Canvas: 성능이 중요한 경우 활용, 빠른 대용량 데이터 처리에 적합, 동적인 데이터

---

해당 내용은 다음 글을 참고 하였습니다.

- http://tcpschool.com/html/html5_graphic_canvasVsSvg
- http://blog.naver.com/PostView.nhn?blogId=pjh445&logNo=220043315711
- https://techbug.tistory.com/207
- https://webisfree.com/2018-05-31/[html5]-canvas-%EC%9A%94%EC%86%8C%EC%9D%98-%EB%8F%84%ED%98%95%EC%97%90-%ED%81%B4%EB%A6%AD-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95