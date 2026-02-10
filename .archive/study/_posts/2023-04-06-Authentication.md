---
layout: post
title: "Authentication & Authorization"
description: >
hide_last_modified: true
---

# Authentication & Authorization

---

nodejs 강의를 듣던 도중, Auth챕터에서 인증(Authentication)과 인가(Authrization)을 배웠다. 
챕터에 목차로는 인증 → 세션 & 쿠키 → JWT란? → bcrypt란? → bcrypt 활용 → JWT 활용의 순서로 진행되었는데, 강의를 다 듣고났더니 머릿속에서 뒤죽박죽 엉망진창 섞여서 한번 정리해두고자 글을 작성하려 한다. 
사실 웹에서 이것을 사용하는거에 대해 정리하는 거기 때문에 통신쪽은 진짜 모르겠다. 진짜 진짜 통신쪽은 뭔 소리인지 모르겠다. 
강의에서 통신은 다루지도 않았다. 그러니 통신관련해서는 글에 작성하지않았다.

## 세션 & 쿠키

세션과 쿠키는 다른 친구들인데 강의에서 묶어서 한번에 표현한 건 둘의 성격이 비슷해서인 거 같다. 결국 세션도 쿠키를 사용하기때문에 그런거라고 한다.

사용자가 만약에 네이버 메일을 쓴다고 가정해보자. 
그럼 우선 네이버 홈페이지에서 메일을 쓰기위해 로그인을 할텐데, 로그인 성공한 이후에 "메일쓰기" 버튼을 눌러도 다시 로그인해야하고, "메세지 작성"에 텍스트박스를 눌러도 다시 로그인해야하고, "보내기" 버튼을 눌러도 다시 로그인해야한다면 정말 귀찮을 것이다. 
그렇겠다. 그러니 애초에 홈페이지에 로그인한 순간부터 이 사용자에게 유지를 시켜줘야하는데 그 일을 하는게 세션과 쿠키이다. 

근데 둘이 가장 큰 차이점, 즉 장단점이 존재한다.

|      | 차이점                              | 장점                              | 단점                                                         |
| ---- | ----------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| 세션 | 접속 정보를 <br />웹서버에 저장     | 멀리 있는 만큼<br />안전합니다.   | 서버가 좀 멀리 있으니 불러오는데 오래걸림<br />서버를 사용하기 때문에 메모리에 한계가 있음. |
| 쿠키 | 접속 정보를 <br />클라이언트에 저장 | 불러오고 이런게<br />짱 빠르겠죠? | 가까이 있으니 누가 훔쳐가기 좋음<br />쿠키에 사이즈가 정해져 있어 필요한 정보를 다 담지 못할수도 있음. |

위에서 표로 정리한 단점도 있지만 무엇보다 얘네는 보안상으로 그냥 아쉽다.

그래서 이런 세션과 쿠키의 보안성을 해결하기 위해 나온게 JsonWebToken즉 JWT이다.

## JWT

JWT는 총 세가지의 구조로 되어있는데, Header / Payload / Signature이다. 요것도 표로 정리해보자면

Header은 그냥 type인 JWT과 alg으로 해싱 알고리즘을 갖는다.

Payload 사실 얘가 좀 중요해서 표로 정리해보자면

| iss (Issuer)              | 토큰 발급자                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **sub** (Subject)         | 토큰 제목 - 토큰에서 사용자에 대한 식별 값이 됨              |
| **aud** (Audience)        | 토큰 대상자                                                  |
| **exp** (Expiration Time) | 토큰 만료 시간                                               |
| **nbf** (Not Before)      | 토큰 활성 날짜 (이 날짜 이전의 토큰은 활성화되지 않음을 보장) |
| **iat** (Issued At)       | 토큰 발급 시간                                               |
| **jti** (JWT Id)          | JWT 토큰 식별자 (issuer가 여러 명일 때 이를 구분하기 위한 값) |

이렇다. 그냥 표 만들었으니 보러 자주 와야겠다.

중요한건 iss는 당연하고, sub, exp, iat라고 생각한다. 얘네는 자주 써먹을 거 같다.

그리고 참 신기한게 Signature이다. 만약에 사용자가 악의적인 마음을 가지고 키값으로 넣어놨던 isAdmin: false값을 true로 변경한다고 생각하자. 당연히 막아야하는데 위에 세션과 쿠키에선 그렇게 하기가 어려운것으로 알고있다. 근데 이 JWT가 야무진점은 Signature라는 값이 서버에서 처음 만들어졌을때와 사용자가 isAdmin이라는 값을 바꿨을때가 바뀐다. 그러니 참 안전할 거 같다.

JWT를 사용한 코드 예시인데, 진성아 너가 짰으니 너 코드는 해석해야겠지?

```javascript
const jwt = require("jsonwebtoken");
const secret = "WSm^6UL75e^XWr%C8*2!K9ICxikvRZ9D";

const token = jwt.sign(
    {
        id: "kkardd",
        isAdmin: false,
    },
    secret,
    {expiresIn: 2} // token 유효 기간 설정(초)
);
console.log(token);
jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
}); //token의 유효기간안에서 확인했기때문에 error값에 null, decoded값에 제대로 출력되는 것을 볼 수 있다.

setTimeout(() => {
    jwt.verify(token, secret, (error, decoded) => {
        console.log(error, decoded);
    });
}, 3000); //token의 유효기간은 2초인데, 3초를 기다리고 함수를 실행했으므로 이미 token이 폭파되었다는 문구를 볼 수 있다.

```



## Bcrypt

얘는 사실 위에 세션, 쿠키, JWT이랑 좀 성격이 다르다. 얘는 암호화해주는 알고리즘인데, 강의를 너무 야무지게 이해해서 코드부터 남겨놨다.

결국 얘는 쉬운데, password를 받고, 그 password를 salt라는 애를 사용하여 진짜 극한으로 암호화시키는 과정을 말한다. 밑 코드에선 salt의 값을 10으로 준 것이다.

```javascript
const bcrypt = require("bcrypt");

const password = "abcd1234";
const hashed = bcrypt.hashSync(password, 10);
console.log(`password : ${password}, hashed : ${hashed}`);

const result = bcrypt.compareSync("abcd1234", hashed);
console.log(result);

```

막 찾아보다가 발견한건데 hashed된 password는 다시 돌릴 수 없다고 한다. 저기선 password변수랑 비교하기위해서 살렸지만, 아래를 봐보자.

```javascript
const bcrypt = require("bcrypt");

const hashed = bcrypt.hashSync("abcd1234", 10);
console.log(`hashed : ${hashed}`);

const result = bcrypt.compareSync("abcd1234", hashed);
console.log(result);

```

이렇게 코드를 짰다면 "abdc1234"란 값은 그냥 영영 안녕이라고 한다.

이거에 대해 되게 야무진 예시를 들었는데 hash가 한국어로 "다지다"라고 한다. 그래서 감자 사서 hash시키면 해시브라운이 되는데 이 해시브라운을 다시 감자로 돌리는게 가능한가? 불가능하다. 위에 예시와 똑같다. 진짜 야무지다.

확실히 이렇게 블로그에 정리하니 한번 더 배운 거 같아서 뿌듯하다.

헷갈리면 자주 와서 봐야징
