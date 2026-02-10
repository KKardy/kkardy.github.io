---
layout: post
title: Dwitter Error applying database
description: >
sitemap: false
---

# Dwitter Error applying database

---------------------

Dwitter 를 쳤는데 자꾸 자동완성으로 Twitter으로 된다. Dwitter은 내가 만든건데,,

blog를 만든 시점이 이미 dwitter를 많이 구현한 시점이라서 여기서부터 시작하는점은 좀 아쉽다. 

api설계부터 차근차근 블로그에 정리해뒀으면 좋았을 거 같다는 생각은 들지만 이미 지난 건 어쩔 수 없으니 지금부터라도 뭔가 막힌걸 해결했을 때, 블로그에다가 오류내용을 남겨보려고 한다.

사실 이번 오류는 단순한 오타에서 발생한 것이였다. 하지만 오류가 발생했을때, 오류가 생기는 원인에 대해서 사람들에게 자문을 구했던 내용이 중요하다고 생각되어 정리할겸 블로그에 글을 쓴다.

우선 오류는, 원래 client와 server을 npm start로 구동시켰을때 잘 되었다. 그 때 당시에는 tweet들의 데이터들을 그냥 객체로 보관했었는데 database(mysql)과 연동시키면서 변수에 저장되어있던 내용들을 삭제한 후, CRUD하는 부분또한 db와 연동시켜 sql문을 작성하여 적용하고자 하였다. 아래는 이전코드이다.

```javascript
import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '안녕하세오 1번 트윗입니다.',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안녕하세오 2번 트윗이에요.',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
```

그리고 db를 적용한 코드는 아래와 같다.

```javascript
import * as userRepository from "../data/auth.js";
import {db} from "../db/database.js";

const SELECT_JOIN =
    "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";
export async function getAll() {
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
        .then((result) => result[0]);
}

export async function getAllByUsername(username) {
    return db
        .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) //
        .then((result) => result[0]);
}

export async function getById(id) {
    return db
        .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
        .then((result) => result[0][0]);
}

export async function create(text, userId) {
    return db
        .execute("INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)", [text, new Date(), userId])
        .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
    return db.execute("UPDATE tweets SET text=? WHERE id=?", [text, id]).then(() => getById(id));
}

export async function remove(id) {
    return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}

```

근데 어라 postman으로 요청을 날리면 거기서의 res값은 야무지게 다 들어오는 것 같은데 왜인지 프론트엔드에서 tweet들을 불러오는게 계속 오류가 났었다.

알고보니 그냥 db에서 SELECT문을 하는 과정에서 us.name도 받아왔어야 했는데 그걸 누락해서 그런거였지만, 그 오류를 찾는 과정에서 동작구조를 조금 더 세밀히 살피게 되었고,  res값이 잘 나오는 거 같더라도 계속 의심해야겠다고 생각하게 되었다.

작년에 학교에서 배웠던 데이터베이스가 이렇게 쓰이니 신기해도 보였다. 너무 재밌다.
