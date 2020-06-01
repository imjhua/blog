---
layout: post
title: ShellScript 기초
categories: Promramming
categories: TODO
---

Shell쉘? ShellScript쉘 스크립트? 리눅스의 쉘은 명령어와 프로그램을 실행할 때 사용하는 인터페이스 입니다. 쉘명령어는 unix콘솔창에 직접 입력하여 실행하는 명령어이며 이를 통해 프로그램을 실행합니다. 쉘 스크립트는, 스크립트 파일로써 쉘명령어들로 작성됩니다. 쉘 스크립트를 알아보겠습니다.!

## 쉘스크립트

쉘은 커널(Kernel)과 사용자간의 다리역할을 하는 것으로 사용자로부터 명령을 받아 그것을 해석하고 프로그램을 실행하는 역할을 합니다.

### 종류

쉘의 종류는 많습니다.

- Bourne Shell: 유닉스 셸의 오리지날. sh
- Bourne-Again Shell: 현재 리눅스의 표준 셸. bash
- C Shell: csh
- Korn Shell: 유닉스에서 가장 많이 사용됨. Ksh

참고) bash는 리눅스뿐만 아니라 GNU 운영체제, 맥 OS X 등 다양한 운영체제에서 사용 중입니다.

### 쉘의 확인

현재 자신이 사용하는 셸이 무엇인지 알아보려면 여러 방법이 있습니다. 다음 명령어로 쉘을 확인 해 봅니다.

```sh
$ echo $SHELL # /bin/bash
$ env | grep SHELL
```

### 쉘 변경

다음 명령어로 변경가능한 쉘 목록을 확인 후 쉘을 바로 입력하면 일시적으로 쉘 환경을 사용 할 수 있습니다.

```sh
$ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh


$ /bin/sh
sh-3.2$ exit
exit
```

## 쉘 스크립트의 파일구조

### 문서의 시작

특정 쉘을 이용해 해석하겠다는 주석으로 항상 시작하고 exit로 종료를 나타냅니다. 예문에서는 bash를 문서의 시작에 기입하였습니다.

```sh
#!/bin/bash
...
exit 0 # exit code 0은 성공 1(~255까지)은 에러
```

본쉘을 이용하고자 하는 경우 다음과 같이 입력할 수 있습니다.

```sh
#!/bin/sh
...
exit 0 # exit code 0은 성공 1(~255까지)은 에러
```

## 변수의 사용

```sh
$ a=3 # 변수의 선언 및 값 할당. 공백 있으면 안됨
$ a = 3 # x
$ echo $a # 변수의 참조

$ a="jh kim" # 값에 공백이 있으면 double quote
$ echo $a # 변수의 참조

# 아래는 모두다 같은 결과이다
$ echo aaa $a
$ echo "aaa "$a
$ echo "aaa $a"
```

## 쉘 스크립트 내

### 위치 매개변수

- \$\*: 각 인자를 나누지 않고 통틀어 참조
- \$@: = \$\* 같지만, escape된 문자열로 취급한다.
- \$#: 넘어온 인자 개수
- \$0: 스크립트 파일 명
- \$1: 매개변수1
- \$2: 매개변수2

```sh
$ command
```

### 문법


https://www.lesstif.com/lpt/bash-shell-script-programming-26083916.html

#### if
- integer 비교: -eq, -lt, -ne 등의 연산자를 사용한다.
- 문자열 비교: ==, != 사용한다.
- 테스트: [  ] 안에 test 조건을 넣을 수 있다.

```sh
if [ "$a" == "OK" ];then
	//doit
fi
```

#### test
#### case
#### while
#### for
#### read
#### eval

---

해당 내용은 다음 글을 참고 하였습니다.

- https://one2many.tistory.com/15
- https://jhnyang.tistory.com/57
- https://www.lesstif.com/lpt/bash-shell-script-programming-26083916.html