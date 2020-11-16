---
layout: post
title: 포트폴리오
categories: Resume
---

## webpack 구성

다만 이 방법은 실제 프로덕션 환경에서도 클라이언트 어플리케이션의 소스를 서빙하는 출처와 API 서버의 출처가 같은 경우에 사용하는 것이 좋다. 물론 로컬 개발 환경에서야 웹팩이 요청을 프록싱해주니 아무 이상이 없겠지만, 어플리케이션을 빌드하고 서버에 올리고 나면 더 이상 webpack-dev-server가 구동하는 환경이 아니기 때문에 프록싱이고 나발이고 이상한 곳으로 API 요청을 보내기 때문이다.

```js

    proxy: {
      '/display-api': {
        target: `http://${HOST}:${PORT}/${MOCKS_DIR}`,
        pathRewrite: function(path) {
          return `${path.replace('/display-api', '')}.json`;
        },
      },
      '/v1/11st/da/json/': {
        target: `http://${HOST}:${PORT}/${MOCKS_DIR}`,
        pathRewrite: function(path) {
          // 광고(adx) 관련 mock데이터는 adx dir로 그룹화
          return `${path.replace('/v1/11st/da/json', '/adx')}.json`;
        },
      },
    },

     before: function (app) {
      // delay simulation
      app.get('/display-api/mart/*', async function ({ next }) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
        next();
      });
    },
    proxy: {
      '/display-api/mart': {
        // error 상황 테스트시 /mocks/error 를 바라보도록 한다.
        target: `http://${HOST}:${PORT}/mocks`,
        bypass: function (req) {
          if (req.method === 'POST') {
            req.method = 'GET';
          }
        },
        pathRewrite: function (path) {
          let newPath = path.replace(/\?(.*)/g, '');
          newPath = newPath.replace('/display-api/mart', '');
          return `${newPath}.json`;
        },
      },
    },
  },
};
```

## 접근성

- tabindex
- opacity & visibility 제어

## 웹앱

## React

## ts

처음 Typescript를 사용했을 때 길어지는 코드를 보며 생산성이 저하된다는 생각을 했습니다. 그만큼 자바스크립트 코드는 짧고 간결했기 때문입니다. 하지만 typescript를 조금 더 사용해보며 런타임이 아닌 트랜스파일링 시점에서 에러를 잡아주고, 직관적으로 타입을 알 수 있는 코드는 장기적으로 생산성을 훨씬 올려준다는 것을 경험하게 되었습니다.

## 이슈사례

### 크로스브라우징

흔히 반응형에서.. 이미지의 비율을 유지하면서 크기 조정을 하는 방법은 이미지의 너비와 높이 둘 중 어느 하나를 auto 값을 유지한 채로 크기 조정을 하는 것이다. 흔히 반응형 이미지에 사용되는 방법은 아래와 같다.

```css
img { max-width: 100%; height: auto; }
```

또 이미지 크기를 100%로 하면? 가변적이게 되고 이것은 브라우저가 계산하지만 이 계산은 이미지가 로드 된 이후에나 가능하다. 그래서 이미지가 늦게 로드 될 수록 사용자는 영역이 움직이는 불편한 경험을 목격하게 된다.

IE10 이하에서는 동적으로 이미지 태그를 DOM에 추가할 때, 그 이미지 태그의 width 와height 속성에 이미지의 본래 크기가 자동으로 설정된다.

```html
// IE11, 크롬 등 최신 브라우저에서 결과
<img
  src="https://cdn.011st.com/11dims/resize/128x128/quality/75/11src/browsing/banner/2019/11/21/12937/2019112115432102791_0_1.png"
/>
// IE9, IE10 브라우저에서 결과
<img
  src="https://cdn.011st.com/11dims/resize/128x128/quality/75/11src/browsing/banner/2019/11/21/12937/2019112115432102791_0_1.png"
  width="128"
  height="128"
/>
```

이미지의 width, height style의 기본 값이 ‘auto’ 이다. 이미지 style.width 만 정해도 비율에 맞게 heigth가 자동으로 계산된다.
그러나, img 태그에 width, height 속성이 지정된 경우, 문제 발생! 속성을 지정하면 다음과 같이 CSS가 적용된다. 스타일 width만 주면? heigh는 AttributeStyle에 따라 자동계산이 아닌 초기 지정된 속성값으로 정해져버린다. 이게 IE10이하에서의 이슈를 낳는다!

```css
img[Attribute Style] {
  width: 646px;
  height: 431px;
}
```

- 속성: 크기 영역 (리플로우)?: HTMLImageElement의 속성으로 원본 이미지의 크기를 값으로 가지는 것을 권장
- 스타일: 픽셀영역 & 페인트 영역(리페인트)? Style은 화면에 표시될 영역의 크기
