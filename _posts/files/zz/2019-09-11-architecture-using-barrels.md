---
layout: post
title: Architecture using Barrels
categories: React
---

대규모 응용 프로그램을 스캐 폴딩(scaffolding) 할 때는 import 문을 상당히 많이 리팩토링해야합니다. 배럴은 여러 모듈에서 하나의 편리한 모듈로 내보내기를 롤업하는 방법입니다. 배럴 자체는 다른 모듈의 선택된 내보내기를 다시 내보내는 모듈 파일입니다.


## Barrel
ES2015 모듈을 사용하여 하나 이상의 항목을 내보내는 파일이 있습니다. 배럴(Barrel) 파일은 하나의 편리한 단일 위치에서 이러한 파일의 전부 또는 일부 를 다시 내보내는 방법입니다. 배럴 파일의 이름은 인덱스 규칙으로, 대부분의 모듈 로더는 기본적으로 인덱스(index)를 찾기 때문에 경로에서 파일 이름을 생략 할 수 있도록 합니다. 

### 사용법
라이브러리에서 다음 클래스 구조가 있습니다.
```js
// demo/foo.js
export class Foo {}

// demo/bar.js
export class Bar {}

// demo/baz.js
export class Baz {}
```

배럴이 없으면 소비자는 세 가지 수입 명세서가 필요합니다.
```js
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import { Baz } from '../demo/baz';
```

demo/index.js 다음을 포함 하는 배럴 을 추가 할 수 있습니다 .
```js
// demo/index.js
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export * from './baz'; // re-export all of its exports
```

이제 소비자는 배럴에서 필요한 것을 가져올 수 있습니다.
```js
import { Foo, Bar, Baz } from '../demo'; // demo/index.js is implied
```

내보내기 대신 * 모듈을 이름으로 내보내도록 선택할 수 있습니다.
```js
// demo/foo.js
export class Foo {}

// demo/bar.js
export class Bar {}

// demo/baz.js
export function getBaz() {}
export function setBaz() {}
```

데모에서 getBaz / setBaz을 내보내지 않으려면 변수를 이름으로 가져 와서 아래 표시된 것처럼 해당 이름을 내보내 변수에 넣을 수 있습니다.

```js

// demo/index.js
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports

import * as baz from './baz'; // import as a name
export { baz }; // export the name
```

이제 소비자는 다음과 같습니다.
```js
import { Foo, Bar, baz } from '../demo'; // demo/index.js is implied
// usage
baz.getBaz();
baz.setBaz();
// etc. ...
```


### 단점
배럴 파일이 너무 많으면 생산성이 떨어지고, 순환 종속성 문제가 발생하여 때로는 해결하기가 까다로울 수 있습니다.

## 정리
배럴을 사용하여, 아키텍처를 잡아 많은 것을 정리할 수 있습니다. 코드를 단순화 하는데 도움이 됩니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- https://basarat.gitbooks.io/typescript/docs/tips/barrel.html
- https://medium.com/@adrianfaciu/barrel-files-to-use-or-not-to-use-75521cd18e65