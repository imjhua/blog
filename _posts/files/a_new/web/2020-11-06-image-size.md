---
layout: post
title: 이미지 크기와 해상도 선명도의 차이는?
categories: Web
---

해상도에 따라서 스크린 사이즈는 비슷하지만 PPI가 달라집니다. PPI는 1인치당 픽셀이 몇개로 이루어져있는지를 나타내는 단뒤인데 이 값이 높을수록 선명하고 좋은 화질이며 해상도가 높다고 할 수 있습니다. 해당도가 높아지면 이미지는 압축되어 사이즈가 작게 보일 수 있는데요. 어떤 관련이 있는것일까요?

<hr >
<!-- vscode-markdown-toc -->

- [기본 개념](#기본-개념)
- [PPI와 DPI](#ppi와-dpi)
- [PPI(Pixels Per Inch)](<#ppi(pixels-per-inch)>)
- [DPI(Dots per inch)](<#dpi(dots-per-inch)>)
- [DPI 표](#dpi-표)
- [참고](#참고)
  - [이미지 확장자](#이미지-확장자)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='기본-개념'></a>기본 개념

- 바이트 단위로 측정되는 파일 크기 (킬로바이트, 메가 바이트 등)
- 측정 단위의 너비 x 높이 인 Dimension (디지털의 경우 픽셀, 인쇄의 경우 인치 또는 센티미터)
- 해상도: 인쇄의 경우 인치당 도트 수 (DPI) 또는 디지털의 경우 인치당 픽셀 (PPI)로 측정됩니다.
- 해상도 종류: 1024x768, 1280x960, 1920×1080

## <a name='ppi와-dpi'></a>PPI와 DPI

- PPI(Pixels Per Inch): 픽셀기준(디지털 해상도)
- DPI(Dots per inch): 점개수기준(프린터의 성능 등 출력물에 대한 해상도)

## <a name='ppi(pixels-per-inch)'></a>PPI(Pixels Per Inch)

- 10PPI면 정사각형의 한 면 1inch(2.54cm)에 10개의 픽셀이 있고, 총 10x10 = 100개의 픽셀로 이루어져 있다는 뜻.
- 20PPI면 정사각형의 한 면 1inch(2.54cm)에 20개의 픽셀이 있고, 총 20x20 = 200개의 픽셀로 이루어져 있다는 뜻.

더 높은 해상도는 20PPI입니다. 같은 면적(10PPI의 면적)에서 해상도가 높아지면(20x20) 이미지는 압축되어 사이즈가 작게 보입니다. 해상도가 낲은(10x10) 이미지의 경우 적은 픽셀수를 사용하기 때문에 같은 면적에 대해 작아보이게 됩니다. 즉, 같은 면적에서 해상도가 높아지면 이미지는 압축되어 사이즈가 작게 보입니다.

- mdpi: 중간밀도 1x
- hdpi: 고밀도 1.5x
- xhdpi: 초고밀도 2x
- xxhdpi: 초초고밀도 3x

## <a name='dpi(dots-per-inch)'></a>DPI(Dots per inch)

- 10dpi면 정사각형의 한 면 1inch(2.54cm)에 10개의 점이 있고, 총 10x10 = 100개의 점으로 이루어져 있다는 뜻.

## <a name='dpi-표'></a>DPI 표

"저밀도" 화면은 "중간 밀도" 또는 "고밀도" 화면에 비해 물리적 공간안의 픽셀 수가 더 적습니다. 아래는 디자이너가 알아야 하는 `dpi`기준으로하는 이미지 비율을 정리한 표입니다. 1x를 기본으로 디자인하고 각 환경별로 다음과 같은 배수가 필요합니다.

| Low density| 120dpi| 0.75x| ldpi |
| Medium density| 160dpi| baseline | mdpi |
| High density| 240dpi| 1.5x | hdpi |
| Extra High density| 320dpi| 2x | xhdpi |
| Extra Extra High density| 480dpi| 3x | xxhdpi |
| Extra Extra Extra High density| 480dpi |4x | xxhdpi |

## <a name='참고'></a>참고

### <a name='이미지-확장자'></a>이미지 확장자

- JPEG: 사진, 스크린숏, 다른 대부분의 이미지에서 JPEG를 사용하세요. JPEG는 손상되는 압축을 사용하는데 이는 파일 크기를 줄이기 위해 이미지 데이터를 희생시킨다는 것을 의미합니다. 최적의 품질 또는 파일 크기를 얻기 위해 품질 설정에서 다양하게 시도해볼 수 있습니다.
- PNG: 날카로운 기하학 모양을 포함하고 있다면 JPEG보다 깔끔하게 곡선과 선을 잘라낼 수 있으므로 PNG를 사용하세요. PNG는 손상 없는 압축을 사용합니다. 즉, PNG는 모든 이미지 데이터를 포함합니다. 파일 사이즈는 다른 포맷보다 더 커집니다.
- GIF: 애니메이션에 GIF를 사용해보세요. 하지만 렌더링하는 이미지의 색상을 제한하므로 스틸 이미지 포맷으로는 사용하지 마세요.

## <a name='정리'></a>정리

이미지크기와 선명도의 차이는? 토대가 되는 A4사이즈는 PPI가 DPI로써 선명도로만 영향을 주고, 디스플레이에서는 모니터 화면 자체에 픽셀이 고정되어 있기 때문에 웹이나 포토샵에서는 inch 당 픽셀 개수에 맞게 사진이 줄어들게 됩니다.

- PPI(Pixels Per Inch): 픽셀기준(디지털 해상도) 선명도
- DPI(Dots per inch): 점개수기준(프린터의 성능 등 출력물에 대한 해상도) 정밀도

같은 해상도라도 크기가 작은 모니터에서 더 선명하고, 큰 모니터로 갈수록 면적이 넓어지므로 선명도가 떨어지게 되는 것입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.shutterstock.com/blog/inches-to-pixels-resize-image-quality
