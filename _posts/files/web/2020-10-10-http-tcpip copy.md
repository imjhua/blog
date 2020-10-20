---
layout: post
title: Http와 TCP/IP
categories: Web
---

Http는 TPC를 통해 연결을 맺습니다.

## TCP/IP

### TCP(Transmission Conrtol Protocol)

데이터 전달을 관리하는 규칙입니다. 즉, 데이터를 작게 나누어서 한쪽에서 다른쪽으로 옮기고, 이를 다시 조립하여 원래의 데이터로 만드는 규칙입니다. 여기서 잘게 나눈 데이터 단위를 패킷이라고 합니다. 인터넷에서는 정보를 전달하는 단위를 뜻합니다. TCP는 패킷을 조립하고, 손실된 패킷을 확인하고, 재전송하도록 요청하는 기능을 합니다.

참고) TCP의 안정성을 필요로 하지 않는 애플리케이션의 경우 일반적으로 TCP 대신 비접속형 사용자 데이터그램 프로토콜(User Datagram Protocol)을 사용한다. 이것은 전달 확인 및 순차 보장 기능이 없는 대신 오버헤드가 작고 지연시간이 짧다는 장점이 있다.

### IP(Internet Protocol)

인터넷상의 주소 규칙입니다. 집의 주소를 부여하는 규칙이 존재하듯이, 인터넷상에 연결된 모든 컴퓨터의 위치에도 규칙이 필요합니다. 이전에는 2⁸*4자리의 주소인 IPv4를 사용하였지만 주소가 고갈이 되고 있어서 16⁴*8자리인 IPv6로 전환하고 되고 있습니다.

### TCP/IP 모델

TCP 프로토콜과 IP 프로토콜을 OSI 7계층 형식에 맞추어 더 추상화(혹은 간략화) 시킨 모델입니다. 인터넷 표준 프로토콜으로 컴퓨터의 데이터 통신을 행하기 위해서 만들어진 프로토콜 체계입니다. 총 4계층으로 이루어져있습니다.

- 응용(애플리케이션) 계층: http
- 전송 계층: TCP
- 인터넷 계층: IP
- 네트워크접근 계층(~물리적)

## HTTP

TCP/IP 모델가장 상위의 애플리케이션 계층의 전송프로토콜입니다.

## 정리

- TCP: 인터넷상에서 데이터를 메세지의 형태로 보내기 위해 IP와 함께 사용하는 프로토콜
- IP: 인터넷상의 주소 규칙
- HTTP: 애플리케이션 계층의 전송프로토콜

| OSI 계층 | TCP/IP 모델 |
| Application <br/> Presentation <br/> Setting | Application |
| Transport(TCP) | Host-to-Host Transport |
| Network(IP) | Internet |
| Data Link | Network Interface|
| Physical | Hardware |

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EC%A0%9C%EC%96%B4_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C
- https://medium.com/@chrisjune_13837/web-http-tcp-ip-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%9E%80-4b2721fe296f
