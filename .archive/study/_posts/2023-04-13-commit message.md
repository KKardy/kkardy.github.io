---
layout: post
title: "commit message"
description: >
hide_last_modified: true
---

# Commit message

---

안그래도 영어 자신없는데 commit message 신경쓰려니까 죽을맛이다. 그러니까 내 블로그에다가 적어놓고 두고두고 와서 컨닝해야겠다. 아니 이게 참고하던 티스토리 게시글이 두개인데 한번에 보면 좋을 거 같아서 베껴왔다.

### Commit Message structure

얘네는 총 아래와 같이 표현된다.

-   Type(타입) : title(제목)

-   Body(본문, 생략가능)

-   Resolves(해결한 이슈, 생략가능)

-   See also(참고 이슈, 생략가능)

근데 작성된 예시들을 보니까 나는 그냥 Type : title 으로 쓰는게 편한 거 같고, 깔끔한 거 같아서 그런 방식으로 익숙해지게 짜고 있다.

그러니 그 부분에 대해서 자세히 표로 설명해보자면,

| Type     | 언제 쓸까?                                               |
| -------- | -------------------------------------------------------- |
| feat     | 기능 추가!                                               |
| fix      | 버그 수정                                                |
| docs     | 문서 수정                                                |
| style    | 코드 스타일 변경(기능 수정이 없는 경우) → 코드 포매팅 등 |
| design   | 사용자 UI 디자인 변경(css파일 변경 등)                   |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가                   |
| refactor | 코드 리팩토링                                            |
| build    | 빌드 파일 수정                                           |
| ci       | CI 설정 파일 수정                                        |
| perf     | 성능 개선                                                |
| chore    | 빌드 업무 수정, 패키지 매니저 수정, git ignore 수정 등   |
| rename   | 파일명 or 폴더명 변경                                    |
| remove   | 파일 삭제만 한 경우                                      |

그리고 이렇게 쓰더라도 결국 title을 잘 적어야 의미가 있는데, 그거에 대해 영어사전? 느낌으로 정리해보겠다.

---

### Fix

Fix A → A를 수정

Fix A in B → B안에 A를 수정

Fix A that B → B절인 A를 수정

Fix A to B → B를 위해 A를 수정

Fix A so that B → A를 수정해 B가 됨

Fix A where B → B로 발생하는 A를 수정

Fix A when B → B일 때 발생하는 A를 수정

---

### Add

Add A → A를 추가

Add A for B → B를 위해 A를 추가

Add A to B → B에 A를 추가

---

### Remove

Remove A → A를 삭제

Remove A from B → B에서의 A삭제

---

### Update

Update A to B → A를 B로 업데이트

---

##### Improve / correct / prevent / rename / move

는 그냥 이름과 어울리게 쓰면 된다.

---

참고한 자료는 아래의 링크와 같습니다. 사실상 거의 베낀 거 같긴 한데, 제가 까먹을 때 열심히 와서 보겠습니다. 감사합니다.

​

[좋은 commit msg 작성법]

[좋은 commit msg를 위한 영어사전]

[좋은 commit msg 작성법]: https://jane-aeiou.tistory.com/93
[좋은 commit msg를 위한 영어사전]: https://blog.ull.im/engineering/2019/03/10/logs-on-git.html
