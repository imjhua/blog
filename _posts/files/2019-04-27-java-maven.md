---
layout: post
title: Maven 
categories: JAVA
---

Maven은 무엇인가? Maven은 자바 프로젝트의 빌드(build)를 자동화 해주는 빌드 툴(build tool)이다. 즉, 자바 소스를 compile하고 package해서 deploy하는 일을 자동화 해주는 것이다.

## 설정파일
Maven 전체를 보기보다 프로그래밍에 직접적인 연관이 있는 두 개의 설정파일을 알아보면 된다.
1) settings.xml
settings.xml은 maven tool 자체에 관련된 설정을 담당한다. MAVEN_HOME/conf/ 아래에 있다. ( * MAVEN_HOME은 환경변수에 설정한 경로) Maven 자체에 설정 값을 바꾸는 일은 일단 잘 없으므로 넘어가고 기획한대로 pom.xml을 살펴본다.

2) pom.xml
하나의 자바 프로젝트에 빌드 툴로 maven을 설정했다면, 프로젝트 최상위 디렉토리에 "pom.xml"이라는 파일이 생성되었을 것이다. pom.xml은 POM(Project Object Model)을 설정하는 부분으로 프로젝트 내 빌드 옵션을 설정하는 부분이다. 의존성 라이브러리 정보를 적을 수 있다.

mvn process-resources : resources:resources의 실행으로 resource 디렉토리에 있는 내용을 target/classes로 복사한다.
mvn compile : compiler:compile의 실행으로 src/java 밑의 모든 자바 소스를 컴파일해서 target/classes로 복사
mvn process-testResources, mvn test-compile : 이것은 위의 두 개가 src/java였다면 test/java의 내용을 target/test-classes로 복사. (참고로 test만 mvn test 명령을 내리면 라이프사이클상 원본 소스로 컴파일된다.)
mvn test : surefire:test의 실행으로 target/test-classes에 있는 테스트케이스의 단위테스트를 진행한다. 결과를 target/surefire-reports에 생성한다.
mvn package : target디렉토리 하위에 jar, war, ear등 패키지파일을 생성하고 이름은 <build>의 <finalName>의 값을 사용한다 지정되지 않았을 때는 아까 설명한 "artifactId-version.extention" 이름으로 생성
mvn install : 로컬 저장소로 배포
mvn deploy : 원격 저장소로 배포
mvn clean : 빌드 과정에서 생긴 target 디렉토리 내용 삭제
mvn site : target/site에 문서 사이트 생성
mvn site-deploy : 문서 사이트를 서버로 배포




----
해당 내용은 다음 글을 참고 하였습니다.
- url