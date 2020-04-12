---
layout: post
title: Visual Studio Code 패키지
categories: Etc
---


## Shell Commande for vs code 
Open the ~/.bashrc file using vi/vim 

```sh
$ vi ~/.bashrc
```


Enter the following by pressing i to insert:
```
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```

Save the file using :wq

```sh
$ source ~/.bashrc
```

### Installed Extensions
리스트 보기
```sh
$ code --list-extensions

2gua.rainbow-brackets
anseki.vscode-color
auchenberg.vscode-browser-preview
barrsan.react-italic-theme-vscode
CoenraadS.bracket-pair-colorizer
dsznajder.es7-react-js-snippets
eran-keren.jsconfig-generator
esbenp.prettier-vscode
formulahendry.auto-rename-tag
humao.rest-client
IBM.output-colorizer
joelday.docthis
mikaelkristiansson87.react-theme-vscode
naumovs.color-highlight
PKief.material-icon-theme
riazxrazor.html-to-jsx
richie5um2.vscode-sort-json
ryanolsonx.snippet-creator
techer.open-in-browser
whtouche.vscode-js-console-utils
Zignd.html-css-class-completion




auchenberg.vscode-browser-preview
bysabi.prettier-vscode-standard
dbaeumer.vscode-eslint
esbenp.prettier-vscode
fcrespo82.markdown-table-formatter
msjsdiag.debugger-for-chrome
msjsdiag.vscode-react-native
vincentkos.snippet-creator
```

```sh
$ code --install-extension 
$ code --list-extensions > extensions.list

$ cat extensions.list | xargs -L1 code --install-extension
$ cat extensions.list | grep -v '^#' | xargs -L1 code --install-extension
$ cat vscode-extensions.txt | xargs -L1 code --install-extension
```


#### cat
특정 파일을 인자로 받아 해당 콘텐츠를 출력한다

#### xargs
표준 출력의 내용을 다음 명령어의 인자로 전달한다. 여러가지 옵션이 있지만 여기서는 L(line) 옵션을 사용했다. 출력 내용이 여러줄이면 1줄씩 인자로 전달하겠다는 내용이다.

