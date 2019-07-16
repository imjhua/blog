---
layout: post
title: Apollo Client
categories: JavaScript
categories: TODO
---


https://d2.naver.com/helloworld/4245995


Apollo Client를 사용한 컴포넌트 렌더링
Apollo Client는 GraphQL 기반의 라이브러리로, 클라이언트 애플리케이션의 GraphQL과 데이터 교환을 돕는다. React에서 사용하는 Apollo Client를 특별히 React Apollo라고 부른다.

GraphQL은 서버 API를 통해 정보를 주고받기 위해 사용하는 질의 언어(query language)이다. GraphQL API는 보통 하나의 엔드포인트를 사용하며, 요청 시 사용하는 질의문에 따라 응답의 구조가 달라진다.

"Redux를 사용한 컴포넌트 렌더링"에서 설명한 <Card/> 컴포넌트 렌더링에 필요한 데이터를 GraphQL을 사용해 가져오는 쿼리는 다음 예와 같이 작성할 수 있다. 다음의 쿼리를 통해 <CardDetail/> 컴포넌트는 fetch 작업을 진행하는 HOC(higher-order component)와 연결된다.