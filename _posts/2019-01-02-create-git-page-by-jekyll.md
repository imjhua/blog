---
layout: post
title: Gituhb page 만들기 (by Jekyll)
tags:
  - gitpage
  - jekyll
categories: Git
---

## 소개
Github Page로 블로그 호스팅하는 방법에 대해 알아 봅시다. Github Page는 jekyll이라는 static 웹페이지 서비스를 제공해 주고 있습니다. GitHub Page는 내부 엔진으로 Jekyll을 사용하고 있기 때문인데 따라서 로컬환경에서 Jekyll을 사용하여 Makrdown으로 텍스트를 작성하여 Git에 올리면 GitHub Page 내부에 있는 Jekyll이 작성된 Markdown을 Html로 변환한 후 웹호스팅을 해주어 우리는 Git Page로 블로그를 사용할 수 있게 됩니다. 또한 Jekyll에서 제공되는 미리 만들어진 템플릿을 사용하면 .md(markdown)파일만 작성하여 Github에 commit하는 것 만으로도 쉽게 블로그 글을 올릴 수 있습니다. 

즉, GitHub Pages는 내부적으로 Jekyll에 의해 작동되고 있으므로 Jekyll 기반의 웹사이트를 무료로 호스팅하기에 적절합니다.

## Jekyll
먼저, 페이지를 만들기 앞서 [Jekyll](https://jekyllrb.com/)이란 정적 웹사이트 빌더(static site builder) 도구입니다. Markdown기반으로 텍스트를 작성하여 간단하게 페이지를 만들 수 있습니다. Jekyll의 기본적인 디렉토리 구조만 익힌다면 블로그의 포스트를 작성하는데 큰 어려움은 없을 것입니다.

### 기본 구조
Jeykyll의 기본 구조는 다음과 같습니다.

| 파일명 | 설명  |
|:-----|:-----|
| _includes   | 재사용하기 위한 파일을 담는 디렉토리 footer, header 등 html flagment들 | 
| _posts 	    | 작성하는 글이 등록되는 폴더 (파일 명명 규칙: yyyy-mm-dd-title.md) |
| _layouts    | 포스트 템플릿 |
| _data       | 사이트에서 사용되는 데이터 저장 폴더 (.yml 또는 .yaml, .json, .csv) |
| _site       | 작성한 파일들을 Jekyll이 변환 작업을 마친 뒤 생성된 파일들(html)이 저장되는 폴더 |
| _sass	      | 스타일이 정의된 파일 (css파일 / scss) |
| _config.yml | 환경 설정 정보 |
| index.html  | 첫 화면 |

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
Jeykyll을 통해 페이지를 생성하는 방법은 다음 두가지가 있습니다.

- jekyll이 제공하는 기본 테마를 사용하여 페이지 생성
- jekyll 테마를 이용하여 페이지 생성


### Jekyll이 제공하는 기본 테마를 사용하여 페이지 생성

```
$ jekyll new <BLOG_NAME>
$ ...
$ ...
```

### Jekyll 테마를 이용하여 페이지 생성

jekyll 테마를 고른후 기존 사이트 fork하여 자신의 git repository에 가져 온 후 repository이름, 도메인등의 설정을 적당히 수정 후 로컬에 git clone합니다.

참고: [http://jekyllthemes.org/](http://jekyllthemes.org/)

```
$ git clone https://github.com/imjhua/blog.git
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


## Git 배포 & Git Page 확인
포스트를 수정후 git에 배포 하여 Git Page를 확인합니다. 계정 페이지는 반드시 {GitHub의 계정}.github.io 라는 이름으로 만들어야 합니다. branch가 여러개인 경우, 설정에서 어떤 브랜치를 git page로 바라볼것인지에 대한 부분이 있으니 참고 하세요.

웹 사이트: [https://imjhua.github.io/blog](https://imjhua.github.io/blog/)

## 템플릿 수정
Jekyll 은 템플릿 처리 작업을 위해 Liquid 템플릿 언어를 사용합니다. 표준 Liquid 태그와 필터를 모두 지원합니다. 빈도가 높은 작업을 더 쉽게하기 위해, Jekyll 에만 추가된 필터와 태그도 있으며 모두 이 페이지에 설명되어 있습니다. 게다가 플러그인을 사용하면 Jekyll 에 자신만의 태그도 만들 수 있습니다.

http://jekyllrb-ko.github.io/docs/templates/ 페이지에서 지킬 템플릿에 대한 내용을 확인 할 수 있습니다.

- 참고) Liquid는 Ruby로 작성된 오픈소스 템플릿 언어 입니다. https://shopify.github.io/liquid/basics/operators/ 사이트를 참고 하여 리퀴트 문법을 사용하여 템플릿의 컨텐츠 내용을 수정 및 개발 할 수 있습니다. 


## 마치며
쉽게 Git Page를 만들어 보았습니다. 앞으로 개발 관련된 글을 게속 포스팅 하겠습니다.!


----
해당 내용은 다음 글을 참고 하였습니다.
- http://jekyllrb-ko.github.io/docs/templates/