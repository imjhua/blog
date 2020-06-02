---
layout: post
title: ShellScript 기초
categories: Promramming
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

### 문서의 시작과 끝

특정 쉘을 이용해 해석하겠다는 `#!/bin/bash`주석으로 항상 시작하고 exit로 종료를 나타냅니다. 예문에서는 bash를 문서의 시작에 기입하였습니다.

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

참고) `#!/bin/bash`는 bash가 bin에 있다고 가정한 것인데, 이 가정이 항상 성립하지는 않습니다. env가 bin에 있다는 가정으로 다음과 같이 스크립트 파일이 사용하는 스크립팅 언어를 설명하는 것이 표준적 관례입니다.

```sh
#!/usr/bin/env bash

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

### 문자열 & 산술 비교

#### 문자열비교

[ string ] : string이 빈 문자열이 아니라면 참
[ string1 = string2 ] : 두 문자열이 같다면 참
[ string1 != string2 ] : 두 문자열이 다르면 참
[ -n string ] : 문자열이 null(빈 문자열) 이 아니라면 참
[ -z string ] : 문자열이 null(빈 문자열) 이라면 참

#### 산술비교

[ expr1 -eq expr2 ] : 두 표현식 값이 같다면 참 ( EQual )
[ expr1 -ne expr2 ] : 두 표현식 갑이 같지 않다면 참 ( Not Equal )
[ expr1 -gt expr2 ] : expr1 > expr2 이면 참 ( Greater Then )
[ expr1 -ge expr2 ] : expr1 >= expr2 이면 참 ( Greater Equal )
[ expr1 -lt expr2 ] : expr1 < expr2 이면 참 ( Less Then )
[ expr1 -le expr2 ] : expr1 <= expr2 이면 참 ( Less Equal )
[ ! expr ] : expr 이 참이면 거짓, 거짓이면 참
[ expr1 -a expr2 ] : expr1 AND expr2 의 결과 ( 둘다 참이면 참 )
[ expr1 -o expr2 ] : expr1 OR expr2 의 결과 ( 둘중 하나만 참이면 참 )

주의! <, > 연산자는 사전순서(알파벳순서)로 두 값의 대소를 판단한다. a < b

### 연산

미만 연산자나 초과 연산자로 수치들을 비교할 때는 이중 대괄호 대신 이중 괄호를 사용해야 한다.

- [[]]: x
- (()): o

```sh
if (( VAL < 12 )) # 연산자로 수치 비교시 if [[ VAL < 12 ]] 를 사용하면 안된다.
then
 echo "값 $VAL이 더 작음"
fi
```

### if

if문은 다음과 같습니다.

```sh
if [ ... ]
then
  # if-code
else
  # else-code
fi
```

if,then을 같은줄에 쓰려면 꼭 ;로 구분해야 합니다.

```sh
if [ ... ]; then
  # do something
fi
```

elif 절은 다음과 같이 사용할 수 있습니다.

```sh
if  [ something ]; then
 echo "Something"
 elif [ something_else ]; then
   echo "Something else"
 else
   echo "None of the above"
fi
```

- integer 비교: -eq, -lt, -ne 등의 연산자를 사용한다.
- 문자열 비교: ==, != 사용한다.
- 테스트: [ ] 안에 test 조건을 넣을 수 있다.

```sh
if [ "$a" == "OK" ];then
	//doit
fi
```

if문을 사용하지 않고 삼항연산을 사용해 보면 다음과 같습니다.

- &&: 먼저 실행이 성공했을 때 뒤에 실행
- ||: 먼저 실행이 실패했을 때 뒤에 실행

```sh
[ "$a" == "OK" ] && //doit
```

#### String Test

-z(문자열이 empty), -n(문자열이 none empty) 등

```sh
## $var 문자열이 공백인지 검사
if [ -z $var ];then
    echo "\$var is empty";
fi
```

#### File Test

파일의 조건을 검사하는 것이 가능합니다.

```sh
if [ -e $FILENAME ]
then
  echo $FILENAME 파일이 존재함
fi
```

- -f: 파일 존재
- -d: 디렉터리 여부
- -e: 주어진 파일이 있는가
- -r: 주어진 파일이 존재하며 읽을 수 있는가
- -w: 주어진 파일이 존재하며 쓸 수 있는가
- -x: 주어진 파일이 존재하며 실행할 수 있는가

```sh
## /etc/nginx/sites-available/ 디렉터리가 없으면 생성
if [ ! -d "/etc/nginx/sites-available/" ];then
  mkdir /etc/nginx/sites-available/
fi
```

#### case

```sh
case $변수 in
값1 ) 처리1;; #;; 두번들어감에 유의!
값2 ) 처리2;;
값3 ) 처리3;;
...
* ) default처리;;
esac
```

다음과 같이 활용할 수 있습니다.

```sh
# case문 시작
case ${string} in
    hello|HELLO)
        echo "${string}: hello 일때"
        ;;
    wo*)
        echo "${string}: wo로 시작하는 단어 일때"
        ;;
    s|start)
        echo "${string}: s 혹은 start 일때"
        ;;
    e|end)
        echo "${string}: e 혹은 end 일때"
        ;;
    *)
        echo "${string}: 기타"
        ;;
esac
# //case문 끝

```

#### while

루프의 본문은 do와 done으로 표시합니다.

```sh
while [ ... ];do
  ...
done
```

```sh
i=0
while [ $i -lt 10 ];do
  echo $i
  i=$((i+1)) # 연산이 필요한경우 (())로 감싼다.
  sleep 0.2
done

```

#### for

지정된 범위 안에서 반복문이 필요한 경우 다음과 같이 사용합니다. 이때 루프의 본문은 do와 done으로 표시합니다.

```sh
for string in "hello" "world" "..."; do;
    echo ${string};
done


for i in {1..5}
do
   echo "Welcome $i times"
done
```

```sh
for i in {1..5..2} # increment 를 2로 지정
do
   echo "Welcome $i times"
done
```

for문은 반복횟수가 많아지면 불편합니다. while문으로 대체 할 수 있습니다.

```sh
for i in 1 2 3 4 5; do
  echo $i
  sleep 0.2
done
```

#### read

파일을 라인별로 읽어서 입력값으로 사용한다.

```sh
#!/bin/sh
while IFS='' read -r line || [[ -n "$line" ]]; do
    echo "Text read from file: $line"
done < "$1"
```

## 정리

- 여기서 인자(argument)와 매개변수(parameter)는 이름만 다를 뿐 의미는 같다.
- Bash는 공백에 민감하다.
- 변수 사용은 생각하지 말고 \${변수} 이렇게 쓰자.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://one2many.tistory.com/15
- https://jhnyang.tistory.com/57
- https://www.lesstif.com/lpt/bash-shell-script-programming-26083916.html
- http://blog.naver.com/PostView.nhn?blogId=msn19972&logNo=90014737234
- https://www.shellscript.sh/test.html
