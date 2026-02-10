---
layout: post
title: Dwitter deployment
description: >
sitemap: false
---

# Dwitter deployment

---

이제 진짜 배포까지 완료했다. 재밌으니까 링크도 한번 걸어놔본다. 누가와서 써도 내가 관리하러도 잘 안 들어가기때문에 뭐 어떻게든 되겠지 싶다.

[Dwitter]

아마 나중에 발견했다면 배포가 끊어져 닫혀있지않을까 싶다 ㅋㅋㅋ

배포하는 과정에서 정말정말정말 많은 오류가 있었고, 생각보다 많은 시간을 들여서 배포를 완료했다.

코드를 한번 봐보자.

우선은 configuration 을 담당하는 config.js이다.

```javascript
import dotenv from "dotenv";
dotenv.config();

function required(key, defalutValue = undefined) {
    const value = process.env[key] || defalutValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined!`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expriesInSec: parseInt(required("JWT_EXPRIES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    port: parseInt(required("PORT", 8080)),

    db: {
        host: required("DB_HOST"),
        user: required("DB_USER"),
        database: required("DB_DATABASE"),
        password: required("DB_PASSWORD"),
        port: required("DB_PORT"),
    },

    cors: {
        allowedOrigin: required("CORS_ALLOW_ORIGIN"),
    },
};
```

첫번째로 마주한 오류는 단순한 오타였다. 나는 왜 secret의 스펠링이 secert으로 알고있었나 싶다. 진짜 바보같이 뭐가 오류인지도 못찾고 어버버버버 하다가 발견했다 ㅋㅋㅋ 이때부터 좀 멘탈이 나가있었던 거 같다.

.env파일은 비밀이니까 비밀로하겠다. 비밀.

다음으로 app.js 파일을 한번 살펴보자.

```javascript
import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import {sequelize} from "./db/database.js";
import {config} from "./config.js";
import {initSocket} from "./connection/socket.js";

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    console.log("마지막에 걸러짐");
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log("init Server!");
    const server = app.listen(config.port);
    initSocket(server);
});
```

두번째로, cors에 관련된 이해가 부족했다. 그냥 "아! 남들이 맘대로 내 웹사이트 베껴가면 안되니까 설정하는게 cors구나라고 개념만 이해하고, \*로 그냥 모든 곳에서 허용하다가보니 좀 더 까먹었던 거 같다. cors_allow_origin의 값에 프론트 url을 넣어줌으로써 하나의 오류를 해결했다."

마지막으로 배포를 하는 과정에서 나는 로컬호스트의 존재는 아예 없어진다고 생각했다. 그리고 나오는 DB_PORT를 어! 저것만 연동하면 되나? 하고서 코드를 아래와 같이 짰다.

```javascript
sequelize.sync().then(() => {
    console.log("init Server!");
    const server = app.listen(config.db.port); //요기
    initSocket(server);
});
```

배포는 처음해봤으니까... 아무리 멍청해보여도 앞으로 확실히 알았으니 기분은 좋다.

앞으로는 정신차리구 잘 해야지!

![dwitter5](../../../assets/img/Project/dwitter/dwitter1.png)

![dwitter6](../../../assets/img/Project/dwitter/dwitter2.png)

[Dwitter]: https://ubiquitous-heliotrope-94127b.netlify.app/
