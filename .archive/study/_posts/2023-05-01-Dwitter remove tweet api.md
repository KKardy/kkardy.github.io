---
layout: post
title: Dwitter remove tweet api
description: >
sitemap: false
---

# Dwitter remove tweet api

---

곤란하다. 프로젝트를 시작할땐, 처음 배우고자하는 마음이였기 때문에 클론코딩을 선택했고, 클론코딩은 아무래도 내 맘대로 했을때, 강의 후반부에 갔더니 그 맘대로 짠 코드들이 대규모로 물갈이 되어버렸었다. 좋은 코딩 기법(?)을 배웠다고 느끼긴 했지만, 아직도 혼자서 코드를 짜기에는 좀 자신감이 떨어진 상태였다.

근데 얼씨구나? Dwitter를 만들었다고 친구들한테 자랑했더니 나름 내 자랑스런 결과물에 친구들이 남들에게 보이기 낯부끄러운 트윗들을 작성하기 시작했다. 뭐 엄준식이라느니,, 날 괴롭히려고 평소에 안하던 말들도 서슴치않게 익명에 힘을 빌려 트윗을 작성하기 시작했다.

문제는 내 dwitter는 admin 권한을 개설하지 않았고, 본인이외의 사람에게는 delete와 update 권한이 주어지지 않는다는 단점이 있었다. 그래서 만약 다른 사람이 남이 보기에 부끄러운 tweet을 올렸을때, 이 dwitter를 개발한 나 조차도 그 tweet을 삭제시키지 못했다.

그래서 부랴부랴 임시방편으로 원래 delete api를 수정하였는데, dwitter는 userId가 1씩 자동으로 증가되는 구조였기 때문에, 결국 테스트용으로 만든 userId가 1번인 test1에게는 delete와 update권한을 풀어주게 만들어주었다. 아래는 그 코드이다.

```javascript
export async function deleteTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.sendStatus(404);
    }
    const reqUserId = req.userId.toString;
    const reqTweetId = tweet.userId.toString;
    if (reqUserId !== reqTweetId && reqUserId !== 1) {
        // 요기 reqUserId !== 1이라는게 userId 1번을 제외한 사람이 delete요청을 보내면 원래 403을 보내주는 구조였던걸 바꿔준 것이다.
        return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    res.status(204).json(id);
}
```

api를 만들었다기보단 그냥 원래있던 api를 살짝 수정한것으로 이 문제를 해결했다.

근데 그 후, 한 친구는 selenium을 이용한 자동 tweet 생성기도 만들었다. 후,, 밑에는 생성한 걸 나한테 찍어서 보낸 동영상이다.

[![video1](https://img.youtube.com/vi/Tz-t1iSfLdg/0.jpg)](https://youtube.com/shorts/Tz-t1iSfLdg "실행")

지금 내가 수정한 delete api로는 위와 같은 사람이 저런식으로 tweet을 찍어낸다면 일일이 하나씩 지워줘야한다. 무리다.

그래서 이번엔 진짜 api를 짰다. username을 받으면 그 username에 해당하는 tweet들을 전부 찾아서 삭제하는 api를 말이다. 아래는 그 코드이다.

```javascript
export async function deleteTweetByUserId(req, res) {
    const username = req.query.username;
    if (!username) {
        return res.sendStatus(404);
    }
    const data = await tweetRepository.getAllByUsername(username);
    let deleteArr = [];
    data.forEach((item) => {
        deleteArr.push(item.dataValues.id);
    });
    deleteArr.forEach(async (item) => {
        await tweetRepository.remove(item);
    });
    res.status(204).json(username);
}
```

구조는, username을 쿼리문으로 받아와 그 username이 존재하지 않을때는 Not found를 보내주고, 그 후 원래 있던 getAllByUsername을 호출하여 그 username에 해당하는 게시글들을 전부 data에 넣어주었다.

그 후, data를 빙글빙글 돌면서 data.id값들을 deleteArr에 전부 넣어준 뒤, remove함수를 deleteArr의 길이만큼 빙글빙글 돌며 빼주었다.

remove함수는 위에서 적어놓은 deleteTweet함수에서 사용한 것과 똑같은 것이다. 이렇게 성공적으로 저렇게 내 소중한 dwitter에 tweet을 찍어내는 악당을 처단한 줄 알았으나,

[![video2](https://img.youtube.com/vi/3S2rqoJg0oA/0.jpg)](https://youtube.com/shorts/3S2rqoJg0oA "실행")

진짜 쉽지않게도 아래 동영상과 같이 다시 공격해왔다. 이건 랜덤함수를 이용해 username을 만들고 거기서 tweet을 끄적, 다시 새로운 username을 만들고 다시 끄적, 이거에 반복이였다. 이건 차후에 다룰 의도적으로 api를 찍어내듯 호출하는 것이므로 강의 보너스 챕터에 Rate Limiter을 걸어줘야겠다.

열심히 만들어놨건만,,, 다들 내가 만든걸 어떻게든 망치려고 애쓴다. 더욱 더 강해져야만 한다. 강해져야겠다............

[Dwitter]

[Dwitter]: https://ubiquitous-heliotrope-94127b.netlify.app/
