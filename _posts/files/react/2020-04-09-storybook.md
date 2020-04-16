---
layout: post
title: Storybook
categories: React
categories: TODO
---

Storybook v5.2 부터는 Component Story Format (CSF) 형식을 사용하여 문서를 작성합니다. (현재 기준 최신 버전 v5.2.3) -> 기존에는 API로 작성. 보다 깔끔함


이 방식이 아직도 작동하고있기 때문에 이 방식이 deprecated 된 것은 아닙니다. 다만, 최신버전의 Storybook에서는 이 API 말고 CSF 형식으로 작성되는 것이 권장됩니다. 왜냐구요? 그냥 훨씬 깔끔하고 편합니다!


## CSP( Component Story Format )
CSF를 사용할 땐 export default { } 코드를 사용하여 어떤 컴포넌트의 문서인지, 그리고 또 어떤 설정을 적용 할 건지 정의합니다. 그리고 export const storyName = ... 코드를 사용하여 새로운 스토리를 만듭니다.

## 코드

import React from 'react';
import { storiesOf } from '@storybook/react';
import Content from '../../containers/App/ContentNew';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const openList = [{ id: 'main', menuNo: 0, name: '메인' }];
const openIndex = 0;
const bookmarkList = ['main'];
const alert = null;

const menuInfo = { 0: { id: 'main', menuNo: 0, name: '메인' } };



const stories = storiesOf('App & Main | app', module);

stories.add('content', () => (
    <>
      <Content menuInfo={menuInfo} />
    </>
  ));

  stories.addDecorator(withKnobs);

// // Knobs for React props
// stories.add('with a button', () => (
//   <button disabled={boolean('Disabled', false)} >
//     {text('Label', 'Hello Storybook')}
//   </button>
// ));

  stories.add('with A', () => {
    // knobs 만들기
    const big = boolean('big', false);
    const name = text('name', 'Storybook');
    return <Content />;
  });


\
---

해당 내용은 다음 글을 참고 하였습니다.

- https://storybook.js.org/docs/formats/component-story-format/
- https://velog.io/@velopert/start-storybook
