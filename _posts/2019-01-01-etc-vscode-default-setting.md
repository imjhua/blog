---
layout: post
title: Visual Studio Code 기본 설정
categories: Etc
---

저는 Front-End개발시 VSCode(Visual Studio Code)를 주로 사용합니다. 무료 오픈소스이면서 굉장히 빠른 것이 큰 장점입니다. 다양항 패키지들을 설치하여 함께 사용하면서 개발 생산성을 충분히 높힐 수 있습니다. 처음 이 툴을 익힐때 참고했던 내용을 공유하고자 합니다. (MacOSX기준으로 작성되었습니다.)


## 소개 
비주얼 스튜디오 코드(Visual Studio Code)는 2015년 4월 29일 마이크로소프트 빌드 컨퍼런스에서 처음 소개 되었습니다. 2015년 11월 처음 MIT라이선스 하에 배포가 진행되었고 현재 macOS, Windows, Linux에서 실행가능한 무료 및 오픈 소스 코드 편집기입니다. 디버깅 지원과 Git 제어, 구문 강조 기능등이 포함되어 있으며, 사용자가 편집기의 테마와 단축키, 설정 등을 수정할 수 있습니다.  
 
VSCode는 MS에서 제공하는 크로스 플랫폼 에디터로 다양한 언어를 지원합니다. 처음 2015년에 소개되고 MIT로 배포 되었습니다. 깃허브가 개발한 일렉트론 프레임워크를 기반으로 구동되지만 일렉트론 기반의 편집기 아톰(Atom)을 포크한 것은 아니며, 비주얼 스튜디오 온라인 에디터(코드명 "모나코")를 기반으로 개발되었습니다.

## Theme
테마를 설정하는 방법입니다.

- Open palette (cmd + shift + p)
- Input: color theme

## Palette
팔레트를 열어 커맨드를 베이스로 하여 다양한 기능들을 사용해 볼 것입니다. 앞으로 계속 사용하게 될 것입니다.

- 단축키: cmd + shift + p

## Install Extentions
VSCode를 좀더 효율적으로 사용할 수 있도록 도와주는 다양한 확장 패키지들이 있습니다. Market Place에서 다양한 패키지들을 설치 하여 사용해 봅시다.

- 단축키: cmd + shift + x

## Setting
에디터의 다양한 설정을 합니다. 먼저 기본 설정들을 확인하고 재 정의가 필요한 경우 설정을 추가 합니다. 

- Open palette (cmd + shift + p)
- Input: open default settings (기본 설정 확인)
- Input: open settings (설정 재 정의시)

탭 자동완성 기능을 사용하기 위해 settings.josn파일에 editor.tabCompletion를 추가 하여 사용하고 있습니다.

```js
{
    "editor.fontSize": 15,
    "editor.fontFamily": "monospace, Menlo, Monaco, 'Courier New'",
    "editor.tabCompletion": "on",
    "editor.tabSize": 2,
}
```

## Key Board Shortcut
키보드 단축키를 설정을 합니다. 먼저 기본 설정들을 확인하고 재 정의가 필요한 경우 설정을 추가 합니다. 

- Open palette (cmd + shift + p)
- Input: open default keyboard shortcuts (기본 키보드 단축키 설정)
- Input: open keyboard shortcuts (기본 키보드 단축키 설정)

대소문자 변경을 단축키로 사용하기 위해 keybindings.josn파일에 다음과 같이 추가 하였습니다.

```js
// Place your key bindings in this file to override the defaults
[
    {
       "key": "cmd+shift+u",
       "command": "editor.action.transformToUppercase",
       "when": "editorTextFocus"
    },
    {
       "key": "cmd+shift+l",
       "command": "editor.action.transformToLowercase",
       "when": "editorTextFocus"
    },
    {
      "key": "ctrl+`",
      "command": "workbench.action.focusActiveEditorGroup",
      "when": "terminalFocus"
   },
   {
      "key": "shift+cmd+c",
      "command": "workbench.action.files.copyPathOfActiveFile"
   },
]
```

## User Snippets
사용자 스니펫을 설정합니다. 스니펫이란 재사용 가능한 소스 코드, 기게어, 텍스트의 작은 부분을 일컫는 프로그래밍 용어로써 계속 반복되는 내용을 스니펫에 등록하여 번거로운 반복 타이핑을 피할 수 있습니다. 사용하기 전 스니펫 등록을 편리하게 하기 위한 패키지를 먼저 설치 해 봅시다.

참고: https://code.visualstudio.com/docs/editor/userdefinedsnippets

- Install Extentions (cmd + shift + x)
- Search: snippet creator

- 스니펫에 등록할 코드 혹은 텍스트 선택
- Open palette (cmd + shift + p)
- Input: create snippet
- Select: Language
- Input: SnippetName, prefix(IntelliSense), Description

- Open palette (cmd + shift + p)
- Input: configure user snippet (추가된 스니펫 확인)


사용은, 비주얼 스튜디오 코드는 emmet (zencoding) 같은 패키지는 기본 내장되어 있기 때문에 따로 설치 하지 않아도 됩니다. emmet 의 단축키는 Tab 키 또는 ctrl + 스페이스바 둘중 등록하여 사용합니다.

- Keyboard Shortcut: editor.action.triggerSuggest 에 단축키 등록
- Setting: "editor.tabCompletion": "on",
    

