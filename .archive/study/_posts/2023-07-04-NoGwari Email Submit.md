---
layout: post
title: NoGwari Email Submit
description: >
sitemap: false
---

# NoGwari Email Submit(Nodemailer)

---------------------

Google Oauth도 붙이긴 했지만, 자체 회원가입도 이미 만들어두었기도 한데, 자체 회원가입할때 이메일 인증이 없으면 위험하다. 23년 5월 1일에 작성한 dwitter remove api글을 보면 알겠지만 내 친구들은 워낙 악질이기 때문이다. 맘만 먹으면 회원가입 페이지 크롤링해서 무한대로 회원가입을 한다해도 막지 못하기 때문에, 회원가입할 때 email 검증을 하며 이 사태를 막을 수 있다. 왜why? email 중복해서 가입하는건 막을 거기 때문이다. 

그래서 **Nodemailer**와 인증키를 검증하기위한 **redis**를 사용하여 이를 구현하였다. redis에 관련된건 바로 다음글에 작성해두었다.

솔직히 말하면 인증키를 검증하기 위한 과정이 쉬울거라 생각했는데 인증키를 검증하기 위한 과정이 진짜 너무 어려웠고, 경험이 없는 나에게 무지함을 느끼게 해주었다.

인증키를 검증하던 말던 일단 이메일을 보내야하기 때문에 Nodemailer 적용 과정을 살펴보자.
일단 나는 gmail을 사용하여 email을 전송하고자 하였으므로, 네이버나 다른 메일로는 어떻게 하는지 잘 모르겠다. gmail 짱짱맨.

우선 내가 혼자서 할때는 우여곡절이 좀 있었지만 제일 먼저 해줘야하는건 email을 보내줄 아이디를 만드는것과 그 아이디에서 **2단계 인증**을 하는것이다. 아이디를 만드는거야 뭐 하면 되는거고, Google 계정에서 보안탭을 보면 2단계 인증이라는 것을 찾아서 설정해줘야한다. 설정을 완료하면 아래와 같이 된다.

![](../../assets/img/Project/nogwari/mailsubmit1.png)

설정한 후 스크롤을 내리다보면 앱 비밀번호라는 탭이 생성된다. 생성하란대로 하면 알파벳으로 이루어진 16자가 나오는데, 이를 꼭 기억해야한다. 설명을 위해서 나는 "abcd efgh ijkl mnop"라고 하자.

![](../../assets/img/Project/nogwari/mailsubmit2.png)

이를 .env파일에 아래와 같이 저장해두었다.

```javascript
// .env
EMAIL_ID=nogwari1@gmail.com
EMAIL_PW=abcdefghijklmnop
```

ID는 ID입력하고 PW는 내 아이디 찐 비밀번호가 아니라 위에서 발급받은 16자리 알파벳으로 설정해두는 것이다.(나는 실제 비밀번호 넣었었다. 헷)

```javascript
// config.js
export const config = {
  //...
    email: {
        emailService: required("EMAIL_SERVICE", "Gmail"),
        emailID: required("EMAIL_ID"),
        emailPW: required("EMAIL_PW"),
    },
  //...
};

```

나는 EMAIL_SERVICE를 따로 설정해주지 않았는데, 그냥 오른쪽에 Gmail 쓰면서 defalut값으로 정의해주었다. 간지나니까 ~

그 후, 컨트롤러에 들어와서 아래와 같이 함수를 작성하였다.

```javascript
export async function mailSubmit(req, res) {
    req.redisClient.connect(); // redis connect 완료
    const {email} = req.body;
    const verifyKey = Math.floor(Math.random() * 899999) + 100000; // 무작위값 생성
    await req.redisClient.set(`${email}`, `${verifyKey}`, "EX", 300);
    const emailConfig = {
        service: config.email.emailService,
        auth: {
            user: config.email.emailID,
            pass: config.email.emailPW,
        },
    };
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: emailConfig,
        to: email,
        subject: "Nogwari 이메일 인증",
        text: `안녕하세요!\n\n 아래에 나오는 인증번호로 인증 부탁드려요! \n\n 인증번호 : ${verifyKey}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.sendStatus(404);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.sendStatus(200);
}
```

redis에 관련된 건 다음 글에서 설명할테니 emailConfig부분부터 보자. 저렇게 객체 형태로 만들어주고, createTransport함수를 이용하여 변수에 저장한 후, mailOptions을 config해주었던 내용을 넣고 transporter.sendMail을 이용하여 보내주었다. 그냥 이건 공식문서보고서 거의 따라쳤다. 생각보다 한번에 쉽게 성공해서 놀라버렸던... 그런 내용이다.

**노력의 결과물**

![](../../assets/img/Project/nogwari/mailsubmit3.png)
