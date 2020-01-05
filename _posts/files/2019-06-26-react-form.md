---
layout: post
title: Form 이벤트 처리하기
categories: React
categories: TODO
---
https://blog.coderifleman.com/2015/06/27/learning-react-3/

https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/

https://ko.reactjs.org/docs/uncontrolled-components.html

https://reactjs.org/docs/forms.html#the-select-tag

- https://orezytivarg.github.io/using-forms-in-react-redux-tips-and-tricks/


```js
import React from 'react';
import PropTypes from 'prop-types';

const Accounts = ({ accounts, selectedAccountNumber, onChange }) => {
  return (
    <select name="defaultSelect1" id="defaultSelect1" value={selectedAccountNumber} onChange={onChange}>
      {accounts.map((account, index) => {
        const { accountNumber, accountAlias, accountName } = account;
        return (
          <option key={index} value={accountNumber}>
            {accountAlias || accountName}
          </option>
        );
      })}
    </select>
  );
};

Accounts.propTypes = {
  banks: PropTypes.array,
  onClick: PropTypes.func,
};

export default Accounts;

```