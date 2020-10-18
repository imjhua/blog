---
layout: post
title: DDL? DML? DCL?
categories: Programming
---

DB에서는 모든 작업을 SQL문을 이용해 작업을 합니다. 데이터를 가져오고 변경하는 작업 말고도 백업 및 객체생성, 스케쥴, 시스템 설정 등 다양한 시스템적인 부분도 SQL문으로 명령할 수 있습니다. 우리가 사용하는 툴도 이러한 명령어를 GUI형태로 보여주는 것인데 SQL문도 다루는 객체나 용도에 따라 그룹핑 되어 나눌 수 있습니다.

그 종류가 DDL, DML, DCL이 있는데 오늘은 데이터베이스의 테이블을 직접적으로 정의 및 조작, 권한부여 및 트랜잭션 처리에 대해서 알아보겠습니다.

## SQL

SQL (Structured Query Language) 은 구조적인 질의 언어입니다. SQL질의 언어를 통해서 데이터베이스를 제어, 관리합니다. SQL 은 다음 언어로 나눌 수 있습니다

- DDL: 데이터 정의 언어
- DML: 데이터 조작 언어
- DCL: 데이터 제어 언어

### DDL(Data Definition Language)

데이터베이스를 정의하는 언어를 말하며 데이터를 생성하거나 수정, 삭제 등 데이터의 전체 골격을 결정하는 역할의 언어를 말합니다. 데이터 베이스 스키마를 정의 하거나 조작하기 위해 사용합니다. SCHEMA, DOMAIN, TABLE, VIEW, INDEX 를 다음 명령어로 정의, 변경, 삭제합니다.

- CREATE : 정의
- ALTER: 수정
- DROP : 삭제
- TRUNCATE : DROP 후 CREATE

* Oracle 11g 이전 버전과 MySQL은 DDL에 대해서 트랜잭션을 지원하지 않습니다.

### DML(Data Manipulation Language)

데이터 조작어, 정의된 데이터베이스에 입력된 레코드를 조회하거나 수정하거나 삭제하는 등의 역할을 하는 언어를 말합니다. 데이터를 조작 (조회, 추가, 변경, 삭제) 하기 위해 사용합니다. 사용자가 응용 프로그램과 데이터 베이스 사이에 실질적인 데이터 처리를 위해서 주로 사용합니다.

- SELECT : 조회
- INSERT : 추가
- DELETE : 삭제
- UPDATE : 변경

기본적인 위의 명령어 외에 LOCK, EXPLAIN, CALL 등도 DML에 포함 됩니다.

### DQL(Data Query Language)

일부에서는 DML에서 SELECT 만을 따로 분리해서 DQL (Data Query Language)나 간단히 QUERY 로 표현하기도 합니다.

### DCL(Data Control Language)

데이터베이스에 접근하거나 객체에 권한을 주는 등의 역할을 하는 언어를 말합니다. 데이터를 제어하는 언어입니다. 데이터의 보안, 무결성, 회복, 병행 수행제어 등을 정의하는데 사용합니다.

- COMMIT : 트랜잭션의 작업 결과를 반영
- ROLLBACK : 트랜잭션의 작업을 취소 및 원래대로 복구
- GRANT : 사용자에게 권한 부여
- REVOKE : 사용자 권한 취소

### TCL

일부에서는 DCL 에서 트랜잭션을 제어하는 명령인 COMMIT 과 ROLLBACK 만을 따로 분리해서 TCL (Transaction Control Language) 라고 표현하기도 합니다.

## 정리

- DDL: 데이터베이스 생성 및 변경, 제거
- DDM: 데이터베이스의 안의 값들을 입력, 변경, 수정 등
- DCL: 데이터베이스의 접속 권한 등을 수정

| 명칭 | 내용                                     | 종류                        |
| ---- | ---------------------------------------- | --------------------------- |
| DDL  | Data Definition Language 데이터 정의어   | CREATE ALTER DROP TRUNCATE  |
| DML  | Data Manipulation Language 데이터 조작어 | SELECT INSERT UPDATE DELETE |
| DCL  | Data Control Language 데이터 제어어      | GRANT REVOKE                |

---

해당 내용은 다음 글을 참고 하였습니다.

- https://parkbosung.tistory.com/11
- https://jayzzz.tistory.com/65
