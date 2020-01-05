---
layout: post
title: MongoDB find() 활용과 update()
categories: DB
---

find() 메소드만 사용하면 criteria 에 일치하는 모든 document 들을 전체 다 출력해주기 때문에 데이터 양이 많은 경우 효율적이지 않을 수 있습니다. 결과값을 프로젝션(projection)으로 필터링 할 수는 있지만 개수나 정렬 등을 할 수는 없습니다. 이를 위해 find() 메소드를 활용하는 sort(), limit(), skip() 에 대해 알아보겠습니다.



## find() 메소드
find() 메소드를 사용했을 시 cursor 형태의 결과값을 반환합니다. 이 객체는 sort limit, skip 메소드를 가지고 있는데, find() 메소드를 더욱 더 활용하기 위해 필요한 sort(), limit(), skip() 메소드에 대해 배워보겠습니다. 이 메서드들 모두 cursor 객체를 반환하기 때문에 중첩해서 사용 가능합니다.


메소드의 리턴 값은 cursor 객체입니다. cursor 객체는 sort() 메소드, limit() 메소드, skip() 메소드 등을 가지고 있어 조회된 데이터를 핸들링 할 수 있습니다. 

### sort()
데이터를 정렬할 때 사용됩니다. 매개변수로는 어떤 KEY 를 사용하여 정렬 할 지 알려주는 document 를 전달합니다.  이 값을 1로 설정하면 오름차순으로, -1로 하면 내림차순으로 정렬합니다.

```
> db.orders.find().sort( { "_id": 1 } )
{ "_id" : 1, "item" : { "category" : "cake", "type" : "chiffon" }, "amount" : 10 }
{ "_id" : 2, "item" : { "category" : "cookies", "type" : "chocolate chip" }, "amount" : 50 }
{ "_id" : 3, "item" : { "category" : "cookies", "type" : "chocolate chip" }, "amount" : 15 }
{ "_id" : 4, "item" : { "category" : "cake", "type" : "lemon" }, "amount" : 30 }
{ "_id" : 5, "item" : { "category" : "cake", "type" : "carrot" }, "amount" : 20 }
{ "_id" : 6, "item" : { "category" : "brownies", "type" : "blondie" }, "amount" : 10 }
```

### limit()
출력할 데이터 갯수를 제한할 때 사용됩니다. 

```
> db.orders.find().limit(3)
{ "_id" : 1, "item" : { "category" : "cake", "type" : "chiffon" }, "amount" : 10 }
{ "_id" : 2, "item" : { "category" : "cookies", "type" : "chocolate chip" }, "amount" : 50 }
{ "_id" : 3, "item" : { "category" : "cookies", "type" : "chocolate chip" }, "amount" : 15 }
```

### skip()
출력 할 데이터의 시작부분을 설정할 때 사용됩니다. value 값 갯수의 데이터를 생략하고 그 다음부터 출력합니다.

```
> db.orders.find().skip(2)
{ "_id" : 3, "item" : { "category" : "cookies", "type" : "chocolate chip" }, "amount" : 15 }
{ "_id" : 4, "item" : { "category" : "cake", "type" : "lemon" }, "amount" : 30 }
{ "_id" : 5, "item" : { "category" : "cake", "type" : "carrot" }, "amount" : 20 }
{ "_id" : 6, "item" : { "category" : "brownies", "type" : "blondie" }, "amount" : 10 }
``` 

## update()
Collection 안의 document(들)을 수정합니다. 이 메소드를 통하여 특정 field 를 수정 할 수도 있고 이미 존재하는 document를 대체(replace) 할 수도 있습니다. update() 메소드의 기본 옵션으로는 단 하나의 document를 수정합니다. MongoDB에서는 update() 메소드를 통하여 데이터를 수정 할 수 있습니다. 이 메소드의 구조는 다음과 같습니다.
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

### $set
특정 field를 업데이트 합니다.
```
> db.people.update( { name: "Abet" }, { $set: { age: 20 } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### document replace 
새로운 document 로 replace 할 때, _id는 바뀌지 않고 데이터를 전체 변경할 수 있습니다.
```
> db.people.update( { name: "Betty" }, { "name": "Betty 2nd", age: 1 })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### $unset
특정 fidle에 true(1) 값을 설정하여 제거 할 수 있습니다. score: 1 의 1 은 true 의 의미입니다.
```
> db.people.update( { name: "David" }, { $unset: { score: 1 } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```


### upsert: true
criteria에 해당되는 document가 존재하지 않는다면 새로 추가하기

```
> db.people.update( { name: "Elly" }, { name: "Elly", age: 17 }, { upsert: true } )
WriteResult({
        "nMatched" : 0,
        "nUpserted" : 1,
        "nModified" : 0,
        "_id" : ObjectId("56c893ffc694e4e7c8594240")
})
```

### multi: true
여러 document의 특정 field를 수정하기

```
> db.people.update(
... { age: { $lte: 20 } },
... { $set: { score: 10 } },
... { multi: true }
... )
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 0 })
```

### $push
배열 에 값을 추가합니다.

```
> db.people.update(
... { name: "Charlie" },
... { $push: { skills: "angularjs" } }
... )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### $push & $each & $sort
배열에 값을 여러개 추가하면서 오름차순으로 정렬합니다. $sort 값을 내림차순으로 정렬하려면 -1 로 하면 됩니다.

```
> db.people.update(
... { name: "Charlie" },
... { $push: {
...     skills: {
...         $each: [ "c++", "java" ],
...         $sort: 1
...     }
...   }
... }
... )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```


### $pull
배열에서 값을 제거 합니다.

```
> db.people.update(
... { name: "Charlie" },
... { $pull: { skills: "mongodb" } }
... )
```

### $pull & $in
배열에서 값을 여러개 제거합니다.

```
> db.people.update(
... { name: "Charlie" },
... { $pull: { skills: { $in: ["angularjs", "java" ] } } }
... )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
``` 


----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/516