---
layout: post
title: TODO List만들기 
tags:
 - todo-list
categories: React
---

## 소개
TODO List를 만들어 봅시다.

## 시작
carete-react-app 으로 기본 리엑트 앱 프로젝트 생성 후, 컴포넌트 정의(컴포넌트 DOM 작성 / CSS 스타일 작성) -> 상태관리 및 Props로 필요한 값 전달 하는 순서로 컴포넌트를 작성합니다.

### create-react-app
```sh
$ yarn global add create-react-app
$ create-react-app todo-list
```

## App.js
기본 App 컨테이너를 다음과 같이 구성합니다.

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

export default App;
```

### 컴포넌트 구성

#### TodoListTemplate
가장 먼저 틀이 되는 컴포넌트를 구성합니다. 스타일링을 담당하는 템플릿을 함수형 컴포넌트로 작성합니다. 추가로 비구조화 할당으로 인자를 전달 받습니다. 여기서 form 은, 우리가 나중에 컴포넌트를 렌더링 할 때 사용 할 목적으로 children 을 사용하듯이 JSX 형태로 전달을 해줄겁니다. 이 방법은 여러 종류의 JSX 를 컴포넌트의 props 로 넣어주는데 유용합니다.

```js
import React from "react";
import "./TodoListTemplate.css";

const TodoListTemplate = ({ form, children }) => {
  return (
    <main className="todo-lsit-template">
      <div className="title"> 오늘의 할일 </div>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="todos-wrapper">
        {children}
      </section>
    </main>
  );
};

export default TodoListTemplate;
```

#### Form
이 컴포넌트는 인풋과 버튼이 담겨있는 컴포넌트입니다. 

```js
import React from "react";
import "./Form.css";

const Form = ({ value, onChange, onCreate, onKeyPress }) => {
  return (
    <div className="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form
```

#### TodoItemList
이 컴포넌트는 우리가 곧 이어 만들 TodoItem 컴포넌트 여러개를 렌더링해주는 역할을 합니다. 이 컴포넌트의 목적은 리스트를 렌더링하는 것입니다. 특히 보여주는 리스트가 동적인 경우에는 함수형이 아닌 클래스형 컴포넌트로 작성하여 성능 최적화를 할 수 있도록 합니다.


```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todos, onToggle, onRemove } = this.props;

    return <div>TodoItemList</div>;
  }
}

export default TodoItemList;

```

#### TodoItem
이 컴포넌트의 영역이 클릭되면 체크박스가 활성화되며 중간줄이 그어지고, 좌측의 엑스가 클릭되면 삭제됩니다.

```js
import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component {
  render() {
    const { test, checked, id, onToggle, onRemove } = this.props;

    return (
      <div
        className="todo-item"
        onClick={() => {
          onToggle(id);
        }}
      >
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div className={`todo-test-${checked && "checked"}`}>
          <div>
            {text}
          </div>
        </div>
        {checked && <div className="check-mark" />}
      </div>
    );
  }
}

export default TodoItem;

```





----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/3480