---
layout: post
title: React 성능 개선하기
categories: React
categories: TODO
---

https://medium.com/@async3619/when-to-use-component-or-purecomponent-b810897a19a2

https://www.holaxprogramming.com/2018/04/15/react-optimizing-virtual-dom-explained/


당신이 실수할만한 다른 방법들
렌더시에 값을 함수 안에서 넘겨주지 마세요.
당신이 만일 여러 아이템을 가지는 배열(list of items)을 가지고 있고, 각각 고유한 매개변수를 부모 컴포넌트의 메소드로 전달한다고 했을 때. 다음과 같이 코드를 작성할 수 있을 것입니다:
<CommentItem likeComment={() => this.likeComment(user.id)} />
이러한 방법의 문제점은, 매번 부모 컴포넌트의 렌더 시점에 새로운 레퍼런스를 가지는 새로운 함수가 생성되고 likeComment 으로 넘겨진다는 점입니다. 또한, CommentItem 이 순수 컴포넌트일 때는 새로운 레퍼런스를 가지는 함수 때문에 데이터는 같은 상태임에도 불구하고 불필요한 렌더링을 여러 번 수행하게 될 것입니다.
이를 해결하기 위해, 부모 컴포넌트 메소드의 레퍼런스를 직접 넘겨주세요. 그렇게 한다면 자식 컴포넌트의 likeComment 프로퍼티는 언제나 같은 값을 가지게 되며 절대로 불필요한 렌더링을 여러 번 수행하지 않을 것입니다.
<CommentItem likeComment={this.likeComment} userID={user.id} />
위와 같이 구현한 다음, 자식 컴포넌트에 props 를 참조하는 메소드를 만들어 주세요:
class CommentItem extends PureComponent {
  ...
  handleLike() {
    this.props.likeComment(this.props.userID)
  }
  ...
}
렌더 함수 안에서 데이터를 재창조(derive)하지 마세요.
프로필 컴포넌트에서 사용자가 “좋아요” 한 10가지 게시물을 보여준다고 가정해봅시다.
render() {
  const { posts } = this.props
  const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
return //...
}
topTen 은 posts 가 변경되지 않았으며, 같은 데이터를 가지고 있음에도 매번 컴포넌트가 렌더링 될 때마다 새로운 레퍼런스를 가지게 됩니다. 이는 불필요한 재 렌더링을 초래하게 됩니다.
당신은 이런 문제를 재창조된 데이터를 캐싱하는 것으로 해결할 수 있습니다. 예를 들어, 재창조된 데이터를 컴포넌트의 state 에 저장(캐시)해 두었다가, posts 가 업데이트 될 때만 업데이트해주는 것입니다.
componentWillMount() {
  this.setTopTenPosts(this.props.posts)
}
componentWillReceiveProps(nextProps) {
  if (this.props.posts !== nextProps.posts) {
    this.setTopTenPosts(nextProps)
  }
}
setTopTenPosts(posts) {
  this.setState({
    topTen: posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
  })
}
만약 당신이 Redux 를 사용한다면, 재창조될 데이터를 구성하고 캐시 해주는 reselect를 사용하는 것을 고려해보세요.
끝내며
당신이 다음의 두 가지 간단한 규칙만 지킨다면 일반 컴포넌트 대신 순수 컴포넌트를 사용하는 것은 좋은 선택이라고 할 수 있습니다:
직접 변경하는 것은 대부분 나쁜 행위입니다만, 순수 컴포넌트를 사용할 때 복합적인 문제로써 다가오게 될 것입니다.
만일 당신이 함수, 오브젝트 혹은 배열을 렌더 함수 내에서 새로 만들고 있다면, 그것은 (아마도) 잘못 설계하고 있는 것 일 겁니다.

----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@async3619/when-to-use-component-or-purecomponent-b810897a19a2