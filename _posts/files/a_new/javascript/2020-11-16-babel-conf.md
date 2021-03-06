---
layout: post
title: Babel conf
categories: JavaScript
---

Babel을 구성하는 두가지 방법에 대해 알아봅니다.

<hr />

<!-- vscode-markdown-toc -->

- [구성 파일 유형](#구성-파일-유형)
- [설정 적용](#설정-적용)
- [프로젝트 전체에서 구성하는 경우](#프로젝트-전체에서-구성하는-경우)
- [프로젝트 한 부분에만 적용하는 경우](#프로젝트-한-부분에만-적용하는-경우)
- [추천하는 바는](#추천하는-바는)
- [트러블 슈팅](#트러블-슈팅)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='구성-파일-유형'></a>구성 파일 유형

Babel에는 두 가지 병렬 구성 파일 형식이 있으며 함께 또는 독립적으로 사용할 수 있습니다.

## <a name='설정-적용'></a>설정 적용

- 프로젝트 전체 구성: babel.config.json
- 파일 기준 구성: .babelrc.json
- 또..) 파일은 아니지만 package.json에 babel 키를 추가 하여 구성

## <a name='프로젝트-전체에서-구성하는-경우'></a>프로젝트 전체에서 구성하는 경우

babel.config.json 을 사용합니다.

## <a name='프로젝트-한-부분에만-적용하는-경우'></a>프로젝트 한 부분에만 적용하는 경우

.babelrc.json 을 사용합니다.

## <a name='추천하는-바는'></a>추천하는 바는

babel.config.json형식을 사용하는 것이 좋습니다. 바벨 자체가 그것을 사용하고 있습니다.

## <a name='트러블-슈팅'></a>트러블 슈팅

node모듈 바벨링 안되는 문제로 바벨 7이슈(https://github.com/babel/babel/issues/8672)가 있습니다. 프로젝트내에서 영향을 주는 바벨 설정 파일 문제입니다. 바벨 설정파일이 2가지 방법에 따라 영향이 가는 범위가 달라집니다.

- Project-wide configuration: babel.config.json files, with the different extensions
- File-relative configuration: .babelrc.json files, with the different extensions package.json files with a "babel" key

프로젝트에서는 바벨 공식문서에서 설정 파일명에 대한 가이드에 맞춰 root에서는 babel.config.js 파일명으로 적용하고 안에서 별도 서브 패키지구조에 바벨설정이 필요한경우 .babelrc.json로. 설정하도록 합니다.

참고) https://babeljs.io/docs/en/config-files

```
# root project
.babelrc
packages/
  mod1/
    package.json
    src/index.js
  mod2/
    package.json
    src/index.js
```

```
# sub project
packages/
  mod/
  package.json.
  babelrc.json
index.js
babel.config.js
package.json
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://babeljs.io/docs/en/configuration
- https://babeljs.io/docs/en/config-files
