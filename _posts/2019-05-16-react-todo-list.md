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


### 상태관리
상태관리가 필요한 컴포넌트는 두개 입니다. Form에서 입력받는 데이터에 따라 TodoItemList가 변경되는 것이지요. 두 컴포넌트간에 데이터전달이 이루어 지지만 실제로 컴포넌트끼리 상태를 주고 받으면 안됩니다! 항상 컨테이너컴포넌트를 통해 상태를 주고 받아야 합니다. 오직 뷰만을 담당하는 컴포넌트와, 상태 관리를 담당하는 컴포넌트를 분리해야 합니다.

#### 컨테이너 컴포넌트

```js
import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";

class App extends Component {
  constructor(props) {
    super(props);

    this.id = 3;
    this.state = {
      input: "",
      todos: [
        { id: 0, name: "안녕!", checked: false },
        { id: 1, name: "나는", checked: true },
        { id: 2, name: "지해다", checked: false }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = e => {
    let {value} = e.target;

    this.setState({
      // input: e.target.value
      input: value  // e의 target으로 부터 value를 비구조화 할당 하였다.
    });
  };

  handleCreate = () => {
    const { input, todos } = this.state;

    this.setState({
      input: "",
      todos: todos.concat({ id: this.id++, name: input, checked: false })
    });
  };
  

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  render() {
    const { input } = this.state;
    const { handleChange, handleCreate, handleKeyPress } = this;
    return (
      <div>
        <TodoListTemplate
          form={
            <Form
              value={input}
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              onCreate={handleCreate}
            />
          }
        >
          <TodoItemList />
        </TodoListTemplate>
      </div>
    );
  }
}

export default App;

```

handleCreate를 보면 concat 을 사용하여 배열안에 데이터를 추가했습니다. 자바스크립트로 보통 배열안에 새 데이터를 집어넣을땐 주로 push 를 사용하지만 리액트 state 에서 배열을 다룰 때는 절대로 push 를 사용하면 안됩니다. 그 이유는, push 를 통하여 데이터를 추가하면 배열에 값이 추가되긴 하지만 가르키고 있는 배열은 똑같기 때문에 비교를 할 수 없습니다. 나중에 최적화를 하게 될 때, 배열을 비교하여 리렌더링을 방지를 하게 되는데요, 만약에 push 를 사용한다면 최적화를 할 수 없게 됩니다. concat 의 경우엔 새 배열을 만들기 때문에 괜찮습니다.


또한 render에서 this를 비구조화 할당함으로서, this.handleChange, this.handleCreate, this.handleKeyPress 이런식으로 계속 this 를 붙여줘야하는 작업을 생략 할 수 있습니다. 


#### TodoItemList
다음 전개연산자를 활용한 비구조화 할당을 적요하여 todo 프로퍼티를 맵핑합니다.
```js

// TodoItemList.js

import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(todo =>
      <TodoItem {...todo} onToggle={onToggle} onRemoeve={onRemove} />
    );

    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default TodoItemList;

```

#### 토글 & 삭제 
handleRemove 에서는 자바스크립트 배열의 내장함수인 filter 를 사용했습니다. 즉, 파라미터로 받아온 id 를 갖고있지 않는 배열을 새로 생성해낸것이죠. 이를 통하여 우리가 지정한 id 를 배제한 배열이 재탄생합니다. 이것을 todos 로 설정해주면, 원하는 데이터가 사라집니다.

```js
//Appjs

  handleToggle(id){
    console.log('handleToggle')
    const {todos} = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] ={
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }


  handleRemove(id) {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }


```


## 정리
App에서는 인풋의 값인 input 값과, 이를 변경하는 onChange 함수와, 새 아이템을 생성하는 onCreate 함수를 props 로 Form 에게 전달해줍니다. Form 은 해당 함수와 값을 받아서 화면에 보여주고, 변경 이벤트가 일어나면 부모에게서 받은 onChange 를 호출하여 App 이 지닌 input 값을 업데이트 합니다. 그렇게 인풋 값을 수정하여 추가 버튼을 누르면, onCreate 를 호출하여 todos 배열을 업데이트 합니다. todos 배열이 업데이트 되면, 해당 배열이 TodoItemList 컴포넌트한테 전달이 되어 화면에 렌더링 됩니다.

이런식으로, 컴포넌트끼리 데이터를 주고 받는것이 아닌 부모컴포넌트인 App을 통해 컴포넌트간의 필요한 값을 업데이트 하고, 리렌더링 하는 방식으로 프로젝트가 개발됩니다.

문제는!? 이러한 구조는, 부모 컴포넌트에서 모든걸 관리하고 아래로 내려주는 것익 때문에, 매우 직관적이기도 하고, 관리하는 것도 꽤 편하지만 문제는 앱의 규모가 커졌을 때 입니다. 보여지는 컴포넌트의 개수가 늘어나고, 다루는 데이터도 늘어나고, 그 데이터를 업데이트 하는 함수들도 늘어나겠죠. 그렇게 가다간 App 의 코드가 엄청 나게 길어지고 이에 따라 유지보수 하는 것도 힘들 것입니다.

이럴 경우, 우리는 데이터 관리를 위해 리덕스(Redux)를 사용합니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/3480