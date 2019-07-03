---
layout: post
title: Git Hook (+husky)
categories: Programming
categories: TODO
---

요새 Git은 어느 조직이건 개인이건 많이 사용하고 계신데요, 굉장히 많은 기능이 있죠. 이중 몰라도 큰 상관은 없지만 좀 더 편리하게 Git을 사용할 수 있도록 도와주는 기능인 Git Hook에 대한 소개드리려고 합니다.


Git은 특정 상황에 특정 스크립트를 실행할 수 있도록 하는 Hook이라는 기능을 지원하고 있습니다. 따로 무언가를 설치할 필요는 없고, 모든 git repository에서 이미 지원이 되고 있는데요.

터미널로 아무 repository나 접근해서 cd .git/hooks/를 해봅니다.

husky로 손쉽게 git hook 관리하기
프로그램 이름이 블로그 이름하고 같은 건 우연이에요 ㅎㅎ

by Husky

Aug 20, 2018 | 7 min read

frontend git

들어가며
husky는 프론트엔드 개발 환경에서 git hook을 손쉽게 제어하도록 도와주는 매니저입니다. git hook은 말 그대로 갈고리 같은 건데요. git을 쓰다가 특정 이벤트(커밋할 때, 푸시할 때 등등)가 벌어졌을 때, 그 순간에 ‘갈고리’를 걸어서 특정 스크립트가 실행되도록 도와주는 게 git hook입니다.

물론 husky를 쓰지 않더라도 git hook을 설정할 수 있는 공식적인 방법은 따로 있습니다. .git/hooks 폴더에 들어가서 스크립트를 작성하면 되는 건데요.


----
해당 내용은 다음 글을 참고 하였습니다.
- http://woowabros.github.io/tools/2017/07/12/git_hook.html
- https://www.huskyhoochu.com/npm-husky-the-git-hook-manager/