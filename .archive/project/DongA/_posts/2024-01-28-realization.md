---
layout: post
title: DongA 회고록
description: >
sitemap: false
---

# DongA 회고록

---

## [DongA](https://github.com/Friends-across-the-street/server)

**_후배님, 저 믿고 줄 잡아보실래요? 취업 과외 플랫폼_**

### 어려웠던 점

HTTP 프로토콜이 아닌 Socket 통신방법을 처음 사용해보는 과정이 익숙하지 않아 어려웠다.

ORM으로 Prisma를 사용했는데, Sequelize나 TypeORM과는 사용 방식이 달라 낯설었다.

### 배운점

Nestjs를 사용해 **아키텍쳐**를 구성하는 방법에 대해서 많은 고민을 하였고, 효율적인 방법이 생각날때마다 주저없이 리팩토링하는 습관 들였다.

하지만,, **테스트코드**를 작성하지 않으면 리팩토링이 꺼려진다는 것을 새삼 느꼈다.

API 명세서를 작성하지 않고 개발에 들어가면 수정 소요가 많이 발생한다는 것을 알게 되었다.

**무중단배포**를 붙여두면 많은 작업 소요를 줄일 수 있다는것을 깨달았다.
