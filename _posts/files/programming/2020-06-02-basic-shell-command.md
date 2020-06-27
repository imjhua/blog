---
layout: post
title: ShellScript 명령어
categories: Promramming
---

쉘에서 사용되는 명령어들에 대해 알아보자.

## cut

리눅스에서 파일 내용을 각 필드로 구분하고 필드별로 내용을 추출하며 각 필드들을 구분자로 구분할 수 있는 명령어입니다. -d(구분자)와 -f(필드 지시자)가 있다. 파일의 각 라인에서 특정 부분을 제거하거나 추출합니다.

```sh
$ cut [옵션] [파일명]
```

### 옵션

- -b, --bytes=LIST : 바이트 단위로 선택
- -c, --characters=LIST : 문자 단위로 선택
- -d, --delimiter=DELIM : 필드를 구분짓는 기본 값은 TAB 대신에 DELIM을 사용
- -f, --fields=LIST : 지정한 필드만을 출력
- -s, --only-delimited : 필드 구분자를 포함하지 않는 줄은 미출력
- --output-delimiter=STRING : 출력할때 구분자 대신에 STRING을 사용하며, STRING는 문자나 빈칸 등을 사용
- --help : 도움말 출력
- --version : 버전정보 출력

-b, -c, -f 옵션을 사용할 경우 다음과 같이 특정 숫자 범위를 사용할 수 있다.

N N 번째 바이트, 문자 또는 필드
N-M N번째부터 M번째 까지의 바이트, 문자 또는 필드(M번째 포함)
M 처음부터 M번째 까지의 바이트, 문자 또는 필드

### 사용
```sh
$ cut -c 1-3 cut_test.txt    # 1~3까지의 문자를 출력
$ cut -f 3 cut_test.txt      # 파일에서 3번째 필드 출력
$ cut -f 2 -d 4 cut_test.txt # 필드 구분 문자는 4이고 2번째 필드 출력
```
---

해당 내용은 다음 글을 참고 하였습니다.

- http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4
- http://www.incodom.kr/Linux/%EA%B8%B0%EB%B3%B8%EB%AA%85%EB%A0%B9%EC%96%B4/cut
