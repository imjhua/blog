---
layout: post
title: 네트워크 OSI 7계층과 TCP/IP 모델
categories: Programming
---

프로토콜은 서로 다른 기기들 간의 데이터 교환을 원활하게 수행할 수 있도록 표준화시켜 놓은 통신 규약입니다. 데이터 통신을 위한 두가지 프로토콜이 존재합니다. OSI 7계층과 TCP/IP 모델을 정리해봅니다.

## 간단 표

| OSI 계층 | TCP/IP 모델 |
| Application <br/> Presentation <br/> Setting | Application |
| Transport(TCP) | Host-to-Host Transport |
| Network(IP) | Internet |
| Data Link | Network Interface|
| Physical | Hardware |

## OSI 7계층과 TCP/IP 모델

OSI(Open Systems Interconnections)7계층은 시스템들의 연결을 위한 모델입니다. TCP/IP 4계층은 이를 웹 서비스에 맞게 단순화시킨 모델입니다.

### OSI계층(7레이어)

ISO(국제표준화기구)에서 제안한 통신 프로토콜로 OSI 참조모델은 컴퓨터와 컴퓨터 사이의 데이터전송을 분류한 모델입니다. 조금 어렵게 표현하여 각 계층은 다른 계층에 대해 알 필요가 없이 자신의 계층에서 캡슐화와 은닉(숨기기)가 가능합니다.

물리 계층 -> 데이터링크 계층 -> 네트워크 계층 -> 전송 계층 -> 세션 계층 -> 표현 계층 -> 응용 계층
총 7Layer(7계층임)

### TCP/IP 모델(4레이어)

TCP 프로토콜과 IP 프로토콜을 OSI 7계층 형식에 맞추어 더 추상화(혹은 간략화) 시킨 모델입니다. 인터넷 표준 프로토콜으로 컴퓨터의 데이터 통신을 행하기 위해서 만들어진 프로토콜 체계입니다. 총 4계층으로 이루어져있습니다.

- 응용계층: HTTP, FTP, Telnet, SMTP 등 네트워크를 사용하는 응용프로그램으로 이뤄집니다.
- 전송계층: TCP, UDP 등 시스템을 연결하고 데이터를 전송하는 역할을 합니다.
- 인터넷계층: ICMP, IGMP, IP등 데이터를 정의하고 데이터의 경로를 라우팅합니다.
- 물리계층: Ethernet, ATM등 네트워크 하드웨어를 의미합니다.

## OSI 계층(7계층)

- 어플리케이션 계층(= TCP/IP 응용 계층)
- 표현계층
- 세션계층
- 전송레이어(= TCP/IP 전송 계층)
- 네트워크 인터페이스레이어(= TCP/IP 인터넷 계층)
- 데이터링크계층(= TCP/IP 네트워크 계층)
- 물리계층

### 어플리케이션계층(OSI 7계층)

전송프로토콜(예-http)을 통해 서버에 요청함과 동시에 표현계층으로 이동합니다.

### 표현계층(OSI 6계층)

표현계층에서는 데이터를 가공/처리를 담당합니다. 만약 https 보안프로토콜을 사용한다면 어플리케이션계층의 데이터를 암호화하거나 혹은 바이너리로 들어온 데이터들을 JPG, PNG등 확장자에 맞추어 우리가 볼 수 있는 형식으로 변경해줍니다.

### 세션계층(OSI 5계층)

데이터의 무결성이나 신뢰성을 확인하는 단계로 네트워크 계층을 위해 데이터를 끊어주거나 확인해주는 것이라고 이해하면 쉽습니다.

### 전송레이어 (OSI 4계층 TCP/IP)

어플리케이션 레이어에서 데이터를 받은 전송계층은 현재 TCP 프로토콜을 이용하며 세션데이터로부터 적당한 크기로 받은 데이터를 잘게 쪼갠 후 일련번호를 부여합니다. UDP도 이 계층에 속하지만 TCP와 다른점은 데이터의 순서를 붆하고 일련번호(연속성)을 부여하지 않기 때문에 순차성,안정성을 보장하긴 힘들지만 속도가 상당히 빠릅니다.

### 인터넷레이어 (TCP/IP)

데이터를 받은 인터넷 레이어에서 IP 프로토콜을 통해 라우터들을 이동하며 목적지로 전달됩니다.

### 네트워크 인터페이스레이어 (TCP/IP)

위 두 단계가 클라우드를 사용했을 경우 개발자들이 신경 쓰지 않아도 되는 부분이며 점점 시대가 갈수록 중요성이 떨어지는 부분입니다. 일반적인 기업에서의 전산팀이 바로 이 6,7계층을 담당하게됩니다.

### 데이터링크계층(OSI 2계층)

이런 데이터링크계층의 대표적인 프로토콜이 이더넷이며 흔히 듣는 브릿지, 스위치와 같은 장비가 해당합니다. 그리고 물리계층이 랜선 허브와 같은 실제 물리적인 영역에서의 장비들입니다.

### 물리계층(OSI 1계층)

랜선, 허브등과같이 실제 물리적인 영역에서의 데이터계층입니다.

## 결론

각각의 레이어를 거치면서 데이터의 양은 더 많아집니다. 맨 처음 언급했던것처럼 상위계층으로부터 받은 데이터는 관여하지않고 자신의 계층에서의 추가 데이터만 계속 늘어 가게 됩니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://sleepyeyes.tistory.com/4
- https://medium.com/harrythegreat/osi%EA%B3%84%EC%B8%B5-tcp-ip-%EB%AA%A8%EB%8D%B8-%EC%89%BD%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-f308b1115359
- https://medium.com/@chrisjune_13837/web-http-tcp-ip-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%9E%80-4b2721fe296f