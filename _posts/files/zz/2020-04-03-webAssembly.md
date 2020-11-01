---
layout: post
title: WebAssembly
categories: Programming
categories: TODO
---
Web Assembly (이하 WASM)는 C/C++과 같은 언어를 컴파일 하여 브라우저에서 빠르게 실행되는 이진형식으로 바꾸는 기술입니다. 플러그인 설치 없이, 브라우저에서 네이티브에 가까운 성능을 보여주는 기술입니다. WASM는 C/C++/RUST와 같은 고성능의 언어를 컴파일 하여 브라우저상에서 직접 사용할 수 있도록 고안되었습니다. 또한, 클라이언트와 서버 앱을 웹상에서 배포할 수도 있습니다.
즉, WASM는 Javascript 기술을 더 높은 수준의 기술로 연결해줍니다. React 앱에서 Rust로 개발한 이미지처리 라이브러리를 사용할 수 도 있습니다. WASM는 이를 가능하게 해줍니다.

서비스의 핵심은 언제나 성능입니다. 하지만, 데이터가 많이 쌓이면서 좋은 성능을 발휘하기는 점점 더 어려워집니다. 이때가 바로 C++/Rust 저수준의 라이브러리가 필요한 시점입니다. 머지않아 대기업들도 WASM를 도입하고, 활용폭은 커질 것입니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@chrisjune_13837/2020%EB%85%84-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%EA%B8%B0%EC%88%A0-%ED%8A%B8%EB%A0%8C%EB%93%9C-1d6f60b38361