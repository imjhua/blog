---
layout: post
title: 리액트 테스팅 튜토리얼
categories: React
categories: TODO
---

: 테스트 프레임워크와 컴포넌트 테스트 방법

탄탄한 애플리케이션을 만들기 위해 테스트를 작성하는 것은 소프트웨어 개발을 하면서 아주 중요한 부분입니다. 테스트는 애플리케이션이 어느 정도 확실한 수준까지 동작하고 있는지 자동으로 확인할 수 있는 도구가 됩니다. 그 수준은 질과 양, (커버리지) 그리고 테스트의 종류(단위 테스트, 통합 테스트, E2E 테스트)에 따라 결정됩니다. — 역주: 앞으로는 E2E(End-to-End) 테스트를 전체 테스트라고 명명하겠습니다. 더 적절한 표현에 관한 의견은 댓글로 남겨주세요.


미리 말씀드린대로 이 글은 리액트 애플리케이션에 각기 다른 테스트 라이브러리를 어떻게 설정하고 적용하는지 보여드립니다. 대략적으로 테스팅 피라미드 를 따라가게 될 겁니다. 여기서 테스팅 피라미드를 따라간다는 것은 대부분은 단위 테스트를 작성하고, 이어서 어느 정도의 통합 테스트를 작성한 뒤에 몇 가지 전체 테스트를 작성한다는 뜻입니다. 하지만 리액트 애플리케이션은 주로 함수를 사용하기보다 컴포넌트를 사용하기 때문에 테스트할 때 다른 접근 방식이 있습니다. “통합 테스트를 주로 작성하고 단위 테스트는 그리 많이 작성하지 않는” 전략입니다. 이 방법은 튜토리얼 뒤에서 다시 설명하겠습니다.



대체 단위, 통합, 전체 테스트가 뭘까요? 일반적으로 단위 테스트란 애플리케이션 일부(주로 컴포넌트)를 독립적으로 테스트하는 것이고, 통합 테스트란 서로 다른 부분(각기 다른 컴포넌트들)이 모여 특정 상황에서 잘 엮여서 작동하는지 확인하는 것입니다. 통합 테스트의 예로 특정 컴포넌트의 모든 필수 속성값(Props)이 자손 컴포넌트에 제대로 전달되었는지 확인하는 경우가 있습니다. 마지막이자 중요한 전체 테스트는 애플리케이션을 브라우저 환경에서 테스트하는 것입니다. 이메일 주소를 넣고 비밀번호를 입력한 뒤에 백엔드 서버로 Form을 제출하는 회원 가입 과정 전체를 흉내내볼 수도 있습니다.

이 튜토리얼의 또 다른 목표는 여러분들에게 너무 복잡하지도 않으면서 전반적으로 적용할 수 있는 몇 가지 일반적인 테스트 패턴과 모범 사례를 알려드리는 것입니다. 매번 테스트 자체를 어떻게 작성해야 하는지 고민하지 않고 리액트 컴포넌트를 효율적으로 테스트 하는데 도움이 될 겁니다. 따라서 대부분의 테스트는 컴포넌트 전반에 걸쳐 적용할 수 있는 공통 패턴을 따릅니다. 이러한 테스트 패턴은 TDD(테스트 주도 개발) 방법을 적용하게 되면 더욱 흥미로워집니다. 테스트를 먼저 작성하고 컴포넌트를 그 뒤에 작성하게 되지요. 결과적으로 이 가이드가 리액트 테스트의 몇가지 모범 사례를 제시해주고, 리액트 테스트 프레임워크의 생태계를 이해하며 각각의 도구를 어떻게 설정하고 사용하는지 알려드리고자 합니다.



https://github.com/vlpt-playground/react-test-tutorial/tree/redux
https://www.robinwieruch.de/react-testing-tutorial/
https://rinae.dev/posts/write-mostly-integration-test-kr
https://github.com/adhrinae/react-testing-tutorial-kr/blob/master/translations/ch09.md

----
해당 내용은 다음 글을 참고 하였습니다.
- https://rinae.dev/posts/react-testing-tutorial-kr
- https://velopert.com/3587
- https://velopert.com/3591