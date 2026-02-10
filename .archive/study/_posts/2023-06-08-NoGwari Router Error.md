---
layout: post
title: NoGwari Router Error
description: >
sitemap: false
---

# NoGwari Router Error

---------------------

진짜 충격실화쇼킹

나는 여태 router를 모르고 있었던가? 원래 블로그 다른 글 적으려고 했는데, 오늘 api설계하면서 진짜 너무 충격받아서 글을 작성한다.

오류가 나에게 온 과정을 서술하자면 이렇다.

1. 게시판에 검색기능을 추가하고자 함.

2. 그래서 야무지게 router에서 분명 /board/search일때 함수안으로 들어오도록 api설계함.

3. 근데 어라? 함수는 실행되지도 않아서 디버깅한다는 느낌으로 그냥 함수 들어오자마자 console.log("asd"); 해봄.

4. asd 안나오고 눈물이 나옴

5. 근데? router에서 순서를 바꿔봤더니 돌아감

6. 이유를 찾음.

   

   

   ![](../../assets/img/Project/nogwari/router.png)

위에 처럼 chatGPT가 알려주었다. 진짜 거짓말안치고 똑같은 예시이다.

```javascript
router.get("/", boardController.getPostingByPage);
router.get("/:id", boardController.getPosting);
router.get("/search", boardController.getSearch);
```

이 순서면 search가 된다안된다? 안된다.

```javascript
router.get("/", boardController.getPostingByPage);
router.get("/search", boardController.getSearch);
router.get("/:id", boardController.getPosting);
```

이 순서면 search가 된다안된다? 된다.

어휴.. 잠깐 생각해보면 당연한거였는데 진짜 한시간 넘게 찾아다닌 거 같다..

난쓰레기야.. 아냐 난 쓰레기까진 아니고 바보야..

**블로그 글도 썼으니 이제 똑같은 실수 안할거다. 아니 똑같은 실수해도 5분정도 헤매면 알아차리겠지. 글까지 썼는데.....**
