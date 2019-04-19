---
layout: post
title: Gituhb page 만들기 (by Jekyll)
tags:
  - gitpage
  - jekyll
comments: true
---

먼저, 페이지를 만들기 앞서 [Jekyll](https://jekyllrb.com/)이란 정적 웹사이트 빌더(static site builder) 도구입니다. Markdown기반으로 텍스트를 작성하여 간단하게 페이지를 만들 수 있습니다. Jekyll의 기본적인 디렉토리 구조만 익힌다면 블로그의 포스트를 작성하는데 큰 어려움은 없을 것입니다.

Jekyll 기본 구조

| 파일명 | 설명  |
|:-----|:-----|
| _includes   | 재사용하기 위한 파일을 담는 디렉토리. | 
| _posts 	    | 작성하는 글이 등록되는 폴더. (파일 명명 규칙: yyyy-mm-dd-title.md) |
| _layouts    | 포스트 템플릿 |
| _site       | jekyll 로 작성한 파일들이 html 로 변환되어 저장되는 폴더 |
| _sass	      | 스타일이 정의된 파일 |
| _config.yml | 환경 설정 정보 |
| index.html  | 첫 화면 |


GitHub Page는 내부 엔진으로 Jekyll을 사용하고 있습니다. 그렇기 때문에 로컬환경에서 Jekyll을 사용하여 Makrdown으로 텍스트를 작성하여 Git에 올리면 GitHub Page 내부에 있는 Jekyll이 작성된 Markdown을 Html로 변환한 후 웹호스팅을 해주어 우리는 git page로 블로그를 사용할 수 있게 됩니다. 즉, GitHub Pages는 내부적으로 Jekyll에 의해 작동되고 있으므로 Jekyll 기반의 웹사이트를 무료로 호스팅하기에 적절합니다.

Jekyll을 이용하여 정적 웹사이트(static websites)를 만들어 보겠습니다.


## 설치 (Ruby & Jekyll)

참고: macOSX 기준으로 작성되어 있습니다.

Jekyll은 내부적으로 Ruby로 작성되어 있기 때문에 사전 작업으로 Ruby 설치가 필요합니다. 


```
$ curl -L https://get.rvm.io bash -s stable –ruby # rvm 설치 
$ source ~/.bash_profile # 설치 경로 적용 
$ rvm -v  # rvm 설치 확인 
$ rvm install <version> # ruby 특정 버전 설치 
$ ruby -v # ruby 버전 확인
$ gem install jekyll bundler # jekyll과 ruby 의존성 선언 및 의존성 분리 도구인 bundler 설치 
$ vi Gemfile   # 의존성 선언을 위한 파일 생성
`
source 'https://rubygems.org' # Gem을 받아오는 서버 정의
gem 'github-pages'
`
$ bundle install # ruby 의존성 설치 
```

## Jekyll 생성

### jekyll이 제공하는 기본 테마를 사용하여 페이지 생성

```
$ jekyll new <BLOG_NAME>
$ ...
$ ...
```

### jekyll 테마를 이용하여 페이지 생성

jekyll 테마를 고른후 기존 사이트 fork하여 자신의 git repository에 가져 온 후 repository이름, 도메인등의 설정을 적당히 수정 후 git clone한다.

참고: [http://jekyllthemes.org/](http://jekyllthemes.org/)

```
$ git https://github.com/imjhua/blog.git
```

## Jekyll 서버 띄우기

```
$ jekyll serve --watch --livereload --incremental $ 사용 후 서버 띄우기 
`
옵션 설명
--watch: 변경사항이 감지되면, 자동으로 빌드 실행
--livereload: _config.xml 이외의 파일에서 갱신이 생기면 브라우저 새로고침
--incremental: 갱신이 발생할 때 전체 빌드를 하는게 아닌, 부분 빌드 실행
`
```
또는
``` 
$ bundle exec jekyll serve #  의존성과 호환성의 충돌을 막기 위해서 bundle exec를 먼저 실행한다.
```
Bundler는 Gemfile.lock 에 명시된 버전의 루비 젬을 사용해 Jekyll 사이트를 생성하기 때문에 의존성과 호환성에 어떠한 충돌도 발생하지 않는다.


# Git 배포 & Git Page 확인

포스트를 수정후 git에 배포 하여 git page를 확인한다.

계정 페이지는 반드시 {GitHub의 계정}.github.io 라는 이름으로 만들어야 한다.

웹 사이트: [https://imjhua.github.io/blog](https://imjhua.github.io/blog/)
```
$ git add commit
```
