---
layout: post
title: Kubernetes 쿠버네티스 기본개념 정리
categories: Programming
---

Kubernetes는 컨테이너의 관리, 그것도 여러 호스트에서의 컨테이너 오케스트레이션입니다.

## Kubernetes의 목적

- 여러개의 도커서버를 하나의 pool로 사용
- 여러개의 서버에 분산되어 컨테이너가 생성
- 다른 서버에 있는 컨테이너와의 통신
- 컨테이너 실패시 재생성
- 로드밸런스

## 용어

- master: 마스터 노드이다. 여러 개의 도커 데몬을 관리하는 서버
- minion: 관리를 받는 노드이다. 도커가 설치되어 있으며 실제로 컨테이너들이 생성되는 서버.
- pod: kubernetes에서 컨테이너, 혹은 컨테이너들의 묶음을 지칭하는 이름이다. (=컨테이너)
- rc(Replication Controller): pod들을 자동으로 생성해주는 컨트롤러이다. pod을 복제해주는 역할을 한다. 즉, 복제 갯수 설정을 3으로 하면 3개의 pod이 계속 떠있도록 함.
- service: pod들의 group을 식별하는 라벨이라는 기준에 따라서, pod들을 하나의 서비스로 외부에서 접근할 수 있도록 추상화한다. 예를들어 videoStreaming-01(이름) - LabelVideo(라벨), videoStreaming-02(이름) - LabelVideo(라벨) 이라는 pod이 있다면 이 pod들을 하나의 서비스로 묶어서 외부에 제공한다.
- yaml: kubernetes에서 pod, rc, service 등 각 기능을 설명한 데이터 형식(JSON하고 비슷함)

---

해당 내용은 다음 글을 참고 하였습니다.

- https://blog.naver.com/alice_k106/220589774457
