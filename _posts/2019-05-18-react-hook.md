---
layout: post
title: React Hooks를 사용 해 보자! 
tags:
 - react-hooks
categories: React
---

## 소개
Hooks는 리액트 v16.8 에 새로 도입된 기능으로서, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 그리고 렌더링 직후 작업을 설정하는 useEffect 등의 기능등을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해줍니다.


## 배경
react hooks 아이디어는 오래전에 등장하였습니다. Sebastian Markbåge이 react-future 리파지토리에서 함수 형태로 props state를 제어하는 함수형 컴포넌트를 제안했습니다. 리액트 팀이 이 아이디어를 기반으로 적용 방식에 대한 고민을 하고 안정성 테스트를 거쳐 hooks을 만들어 냈습니다.

처음 2018년 react Conf에서 2018년 나오싸습니다.
리엑트의 문제점 3가지
- Wrapping Hell

연결되는 컴포넌트 구조들로 인해 계층이 많이 생기고 컴포넌트를 관리하기 어려워지는 문제

너무 큰 컴포넌트가 복잡해지고 UI상에서 제어할 것들이 많아 지면서 컴포넌트가 지나치게 커지고 이를 분리하기 어려운 문제가 있습니다.

class를 컴포넌트로 상요해서 발생하는 문제로 this나 bind를 사용해서 코드를 작성하는 과정이 혼란을 발생시킨다고 말합니다.

Functional Component API
class 형태로 관리되던 컴포넌트를  function을 통해 만들수 있게 해주는 API입니다.

- useState(): state관리
- useEffect(): lifecycle관리

## 장점
- 가독성
- 

## 사용예




----
해당 내용은 다음 글을 참고 하였습니다.
- url