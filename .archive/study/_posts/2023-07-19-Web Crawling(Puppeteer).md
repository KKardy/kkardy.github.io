---
layout: post
title: "Web Crawling(Puppeteer)"
description: >
hide_last_modified: true
---

# Web Crawling(Puppeteer)

---

이 글은 사실상 미완성이다. 왜와이? Puppeteer 이 라이브러리를 만족할만큼 못 썼기 때문이다. 우선, Puppeteer을 선택하게 된 과정에 대해서 설명하려한다. 노션관련된 프로젝트를 하면서, 노션 데이터베이스에 commit message를 넣는건 성공했다. 근데 이게 좀 애매한게 github action을 사용하여 main에 push될때 제일 최근에 commit message만 notion에 기재되기 때문이다. 원래 정했던 목표와는 명확히 다르게 동작하는것이고, 그렇다고 포기하긴 싫었다.

그래서 생각해낸 방법은 gitpub action에서 이벤트 트리거를 특정시간으로 걸어둔다음, github페이지를 crawling하여 commit message를 가져오자. 라고 말이다. 결론적으로는 위와 같이 생각한게 잘못됐다. crawling하기 전에, github API를 찾아봤으면 굳이 안해도 된다는걸 알았을 것이다. 바보같이 크롤링 하는 방법을 여러개 찾아보았다.

크롤링 하는 방법에 대해 Axios와 Cheerio도 찾아보았으나, 이 둘은 정적페이지 크롤링이라는 한계가 있었다. 하지만, 지금 프로젝트상에서는 버튼을 클릭한다던지, 페이지를 이동한다던지하는 동적 크롤링이 필수불가결이였기에, Puppeteer을 사용하였다.

지금까지 공부한 게 있기도 하고, 구현된 상황이 있어 가볍게 정리해보려고 한다. 공부양이 많지 않았기 때문에, 금방 까먹을 게 뻔하다. 차라리 지금 이렇게 가볍게라도 정리해뒀다가 나중에 크롤링을 다시 진행한다면 읽어보고 하면 좋을 거 같다.

길게 길게 말했긴 하지만, **결론적으로** 크롤링의 이유는 github 페이지에서 내 커밋 메세지를 확인하고자 하였고, 매일매일 github action을 사용하여 크롤링할거기 때문에, 해당 날 전 날의 잔디를 클릭해야한다. 

![dwitter5](../../assets/img/Study/Puppeter.png)

클릭하는 과정까지 크롤링에 성공하였는데, 코드는 아래와 같다.

```javascript
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
    });
    const page = await browser.newPage();

    // 페이지 이동
    await page.goto("https://github.com/KKardd/");
    // 화면 크기 조절
    await page.setViewport({width: 1080, height: 1024});
    // Contribution graph가 나올때까지 대기
    await page.waitForSelector(
        "#user-profile-frame > div > div.mt-4.position-relative > div.js-yearly-contributions > div > div > div > div:nth-child(1) > table"
    );

    const date = new Date(); // 현재 시간 설정
    const dayOfWeek = date.getDay(); // 오늘 요일을 받아온다. (일요일 - 0, 토요일 - 6)

    /* github action시 서버시간에 맞춰야하므로
    const date = new Date(); // 현재 시간 설정
    date.setHours(date.getHours() + 9); // 한국 시간으로 수정
    const dayOfWeek = date.getDay(); 
    */

    let dateJsPath =
        "#user-profile-frame > div > div.mt-4.position-relative > div.js-yearly-contributions > div > div > div > div:nth-child(1) > table > tbody > "; // 잔디의 미완성 위치 

    switch (dayOfWeek) {
        case 0: // tr:nth-child 뒤에 숫자는 일요일1, 토요일 7이다.
            dateJsPath += "tr:nth-child(7) > td:nth-child(53)"; // 오늘이 일요일이라면, 어제 === 전 주 토요일이므로 53번째의 child옵션을 받아온다.
            break;
        case 1:
            dateJsPath += "tr:nth-child(1) > td:nth-child(54)";
            break;
        case 2:
            dateJsPath += "tr:nth-child(2) > td:nth-child(54)";
            break;
        case 3:
            dateJsPath += "tr:nth-child(3) > td:nth-child(54)";
            break;
        case 4:
            dateJsPath += "tr:nth-child(4) > td:nth-child(54)";
            break;
        case 5:
            dateJsPath += "tr:nth-child(5) > td:nth-child(54)";
            break;
        case 6:
            dateJsPath += "tr:nth-child(6) > td:nth-child(54)";
            break;
    }
    page.click(dateJsPath); // 전 날 잔디 클릭 완료.

    setTimeout(() => {
        browser.close();
    }, 5000); // 5초뒤에 browser 종료
})();

```

진짜 야물딱지게 주석까지 적어놨는데,, 쓸모가 없어질줄이야.. 마음이 아프다. 

Puppeteer에 대한, 웹 크롤링에 대한 게시글이지만 이번 일로 더 크게 깨달은건 이게 아니다. 공부해서 좋긴 하지만, github API를 알았으면 굳이 이렇게 해도 되지 않았기 때문이다.

**그럼으로 무턱대로 생각하지말고, 좀 더 넓은 시야로 보려고 노력해야겠다.**
