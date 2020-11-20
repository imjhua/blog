---
layout: post
title: 동기/비동기 & 블로킹/논블로킹
categories: JavaScript
---

동기와 비동기 그리고 블로킹과 논블로킹 비슷하지만 모두 다른 개념입니다. 호출 및 처리 방식에 대한 각자의 관심사로 구분해봅니다.

<hr />

<!-- vscode-markdown-toc -->

- [동기 / 비동기](#동기-/-비동기)
- [블로킹 / 논블로킹](#블로킹-/-논블로킹)
- [조합해보기](#조합해보기)
  - [NonBlocking & Sync](#nonblocking-&-sync)
  - [Blocking & Async](#blocking-&-async)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='동기-/-비동기'></a>동기 / 비동기

동기와 비동기의 차이는 코드 실행이후 다음 코드가 언제 실행되는지의 차이 입니다. 요청후 다음을 바로 실행하는지, 요청 이후 응답을 받고 다음을 실행을 하는지에 따라 구분 될 수 있습니다. 호출하는 함수가 실행함수의 작업완료 여부를 신경쓰는지 쓰지 않는지 차이가 있습니다.

- 동기(Synchronous): 요청을 하는 시기와 응답을 받는 시기가 일치한다. 어떤 요청이 들어오면 응답이 완료 될 때까지 프로그램이 기다리고(정지됨), 응답을 받게되면 다음을 실행을 실행한다.
- 비동기(Asynchronous): 요청과 응답 결과가 동시에 일어나지 않는다. 어떤 요청이 들어오면 응답을 기다리지 않고 다음을 바로 실행한다.

## <a name='블로킹-/-논블로킹'></a>블로킹 / 논블로킹

동기와 비동기 이야기가 나오면 꼬리처럼 달라붙는 또 다른 키워드가 블로킹과 논블로킹입니다. 블로킹의 여부는 작업이 실행되는 동안 요청한 곳으로 제어권을 넘기는지, 넘기지않는지로 구분 될 수 있습니다.

- Blocking: 호출된 함수가 자신의 작업을 모두 끝낼때까지 제어권을 가지고 있어 호출한 함수가 대기하도록 만든다. 호출되는 함수가 바로 리턴하지 않는다.
- NonBlocking: 호출된 함수가 바로 return 해서 호출한 함수에게 제어권을 주어 다른 일을 할 수 있게 한다. 호출되는 함수는 바로 리턴한다.

## <a name='조합해보기'></a>조합해보기

### <a name='nonblocking-&-sync'></a>NonBlocking & Sync

NonBlocking 은 바로 return을 해서 제어권을 주고, Sync 는 작업완료여부를 호출한 쪽에서 신경 씁니다. 결론적으로 요청하면 실행함수는 바로 반환(제어권 줌)이 되고 다른일을 수행할 것입니다. 제어권을 받은 요청은 함수의 완료 여부를 기다립니다. 완료되었는지 계속 물어보는 일을 추가로 수행하는것이 NonBlocking & Sync 입니다.

### <a name='blocking-&-async'></a>Blocking & Async

요청받은 Blocking 은 작업이 완료될때까지 제어권을 가지고 있고, Async 는 작업완료여부는 요청한 쪽에서 신경을 쓰지 않습니다. 요청은 제어권이 없는 상태이며 요청한 작업의 완료와 상관없이 다음이 실행될 것입니다.

보통 NonBlocking & Async 방식을 쓰는데 그 과정중 하나라도 Blocking 이 포함이되면 의도치않게 Blocking & Async 로 작동한다고 합니다.

## <a name='정리'></a>정리

- Blocking/NonBlocking은 호출한 입장에서의 호출되는 함수가 바로 리턴하는지 하지않는지/하는지
- Sync/Async는 처리되는 방식은 함수완료여부를 신경쓰는지/쓰지않는지

풀어보면 다음과 같습니다.

- Blocking: 호출되는 함수가 바로 리턴하지 않는다.
- NonBlocking: 호출되는 함수는 바로 리턴한다.
- Synchronous: 호출하는 함수는 작업 완료 여부를 신경쓴다.
- Asynchronous: 호출하는 함수는 작업 완료 여부를 신경쓰지 않는다.

NonBlocking & Async 방식이 가장 효율적입니다!

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ooeunz.tistory.com/89
- https://heecheolman.tistory.com/48
