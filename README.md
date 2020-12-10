## blog

- https://imjhua.github.io/blog/

### liquid syntax

```
- site: {{ site | jsonify | escape }}
- page: {{ page | jsonify | escape }}
- layout: {{ layout | jsonify | escape }}
- content: {{ content | jsonify | escape }}
- paginator: {{ paginator | jsonify | escape }}
```
