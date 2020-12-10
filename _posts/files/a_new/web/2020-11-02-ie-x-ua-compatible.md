---
layout: post
title: IE의 x-ua-compatible
categories: Web
---

meta태그의 x-ua-compatible 를 보신적이 있나요? 이는 IE브라우저에서만 동작하는 지시문입니다. 웹 개발자가 어느 표준인지 선택하도록 하는 개념을 도입했습니다.

<hr >

<!-- vscode-markdown-toc -->

- [문서 호환성 document compatibility](#문서-호환성-document-compatibility)
  - [x-ua-compatible 적용](#x-ua-compatible-적용)
  - [!DOCTYPE html](#!doctype-html)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='문서-호환성-document-compatibility'></a>문서 호환성 document compatibility

문서의 호환성 모드를 지시합니다. IE는 버전마다 페이지를 번역하고 렌더링 하는 방법이 다른데요. 그렇기때문에 이를 번역하고 표시하는 방법을 선택할 수 있도록 했습니다. Quirks mode비표준 모드가 기본값이며, 구버전의 브라우저로 보는 것처럼 페이지를 표시합니다. Standards mode표준 모드(또는 strict mode엄격 모드)는 업계의 표준을 지원하도록 표시합니다.

### <a name='x-ua-compatible-적용'></a>x-ua-compatible 적용

```html
<meta http-equiv="x-ua-compatible" content="IE=edge" />
```

여기서 content="IE=edge"는 IE브라우저에서, 각 버전(edge mode, IE 버전들) 중 가장 최신 표준 모드를 선택하는 문서 모드를 설정하는 역할을 합니다.(IE6부터 IE11까지)

### <a name='!doctype-html'></a>!DOCTYPE html

참고로! 문서 유형 (document type) 선언과 함께 사용해야 유효합니다.

```html
<!DOCTYPE html> /*가장 최신의 웹표준을 지원하는 HTML5 DOCTYPE을 추천함 */
```

HTML은 버전 별로 지원하는 태그가 조금씩 다릅니다. (HTML 태그 종류와, Document Type 별 지원 태그 목록) 그래서, HTML이 어떤 버전으로 작성되었는지 미리 선언해 웹브라우저가 내용을 올바로 표시할 수 있도록 해주어야 합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://aboooks.tistory.com/357
- https://aboooks.tistory.com/40
