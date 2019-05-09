---
layout: post
title: React 생명주기(LifeCycle) 
tags:
 - react-life-cycle
categories: React
---

## 소개
리엑스에는 컴포넌트들의 생명주기가 존재합니다.

- 컴포넌트 생성 전/후
- 프롭또는 데이터 변경으로 업데이트 전/후
- 컴포넌트가 사라지기 전

각각의 생명주기와 그 생명주기 API를 이용하여 오버라이딩하는 방법에 대해 알아 봅니다.

## Life Cycle
- (counstructor)
- ComponentWillMount
- (render)
- ComponentDidMount
- ComponentwillReceiveProps(nextProps)
- shouldComponentUpdate(nextProps, nextState)
- ComponentWillUpdate
- (render)
- ComponentDidUpdate(prevProps, prevState)
- ComponentWillUnMount

### counstructor
컴포넌트가 처음 만들어 질때 실행됩니다. 기본 state를 설정할 수 있습니다.

### ComponentWillMount
컴포넌트가 DOM위에 만들어지기 전에 실행 됩니다. 따라서 DOM을 처리할 수 없습니다.

### ComponentDidMount
첫 렌더링 후 실행됩니다. 이 안에서 다른 js프레임웍 연동 및 setTimeout, setTinterval 및 Ajax를 사용합니다.

### ComponentwillReceiveProps(nextProps)
props를 받을 떄 실행됩니다. props에 따라 state를 업데이트 할떄 사용하면 유용합니다. 이 안에서 setState할 수 있습니다.

### shouldComponentUpdate(nextProps, nextState)
props/state가 변경되었을때 리 렌더링을 할지 말지를 결정합니다. 실제로 사용할때는 필요한 비교를 하고 ㄱ밧을 반환해야 합니다.
ex) return nextProps.id !== this.props.id (이때 JSON.stringify를 사용하여 열 field를 ㅕㄴ하게 비교 할 수 있습니다.)

### ComponentWillUpdate
컴포넌트 업데이트 전 실행됩니다. setState는 절대로 사용하면 안됩니다. 무한 루프에 빠질수 있습니다.

### ComponentDidUpdate
컴포넌트 리렌더링을 마친 후 실행됩니다. setState는 절대로 사용하면 안됩니다. 무한 루프에 빠질수 있습니다.

### ComponentWillUnMount
컴포넌트가 DOM에서 사라진 후 실행됩니다.


## 정리
생명주기를 사용하면 기능 구현할때 유용하게 사용될 수 있습니다. 꼭 숙지하도록 합시다!

----
해당 내용은 다음 글을 참고 하였습니다.
- url