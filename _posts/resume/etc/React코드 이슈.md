---
layout: post
title: React 코드 이슈
categories: Resume
---

- 리엑트, 페이지 이동시 초기화가 필요한 영역 처리

## 상태 변경에 따른 useEffect

```js
const isNationWideBranchNo = deliveryTimetables[0]?.timetables.some(
  ({ isShippingAddressBranch, branchNo }) =>
    isShippingAddressBranch && branchNo === NATIONWIDE_BRANCH_NO
);

// 문제는 연속으로 isNationWideBranchNo 동일한 값이면 상태변화가 일어나지 않으므로
// 의존성 배열에서 캐치가 안된다. deliveryTimetables는 변하더라도..
// deliveryTimetables 를 같이 넣어줘야 함 -> useEffect에서 안쓰는 변수임..
// isNationWideBranchNo를 useEffect에서 변수로 할당하여 안에서 체크하도록 변경
// 그런데 저 변수는 다른곳에서도 쓰인다..?
//
useEffect(() => {
  setTimeout(() => {
    if (isNationWideBranchNo) {
      alert("GS 리테일 전국 택배몰에서 배송됩니다.");
    }
  }, 100);
}, [isNationWideBranchNo]);
```
