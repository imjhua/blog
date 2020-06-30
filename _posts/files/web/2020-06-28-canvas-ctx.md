---
layout: post
title: Canvas API & 상태 정보 (ctx: Context)
categories: Web
---

Canvas의 그리는 API와 Canvas가 가지는 상태 정보를 알아보자.

## Canvas Context

canvas context 에 무언가 그릴 때는 상태 정보 스택을 이용합니다. 상태 정보는 canvas context 에 대한 데이터를 저장합니다. 상태 정보 스택에는 현재 영역의 선택 정보, 현재값, 회전, 이동, 변환등의 데이터를 담고 있습니다.

- 현재 영역 선택 정보
- 현재 값: globalApha, strokeStyle, textAlign, textBaseline, lineCap, lineJoin, lineWidth, miterLimit, fillStyle 등
- 회전, 이동 등의 변환 행렬 정보 (context.rotate / context.setTransform)

저장되지 않는 정보들도 있습니다. 캔버스를 그리는 형식인 비트맵과 그리기 정보는 담고 있지 않습니다.

- bitmap
- path 를 이용한 그리기 정보

### 패스를 이용한 그리기

canvas에서 path 를 이용하면 어떤 도형이든 그릴 수 있습니다. path는 여러 점을 잇는 선들로 이루어집니다.

- context.benginPath(): path 를 시작할때 사용합니다.
- context.closePath(): path를 끝낼 때 사용합니다.
- context.stroke(): 실제로 그리라는 명령.

참고) path 안에서 두 점을 연결한 것을 sub path 라고 하는데 sub path 의 마지막 점과 시작점을 연결하면 '닫혔다' 라고 합니다.

### 상태 정보의 저장과 복구

- context.save(): 현재 상태 정보를 스택에 저장합니다.
- context.restore(): 스택에 저장했던 가장 마지막 상태 정보를 캔버스에 다시 적용합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://moonausosigi.tistory.com/entry/03-HTML5-Canvas-선-path-원호-베지어-곡선-그리기 [MoonAuSosiGi's Lab]
