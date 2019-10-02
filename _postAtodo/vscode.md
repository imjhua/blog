---
layout: post
title: TODO
categories: VSCODE
categories: TODO
---


Open the ~/.bashrc file using vi/vim $ vi ~/.bashrc

Enter the following by pressing i to insert:

code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
Save the file using :wq

Reflect the settings in ~/.bashrc using the following command:

source ~/.bashrc
shareimprove this answer



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