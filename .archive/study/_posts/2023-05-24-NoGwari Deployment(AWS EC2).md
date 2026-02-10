---
layout: post
title: NoGwari Deployment(AWS EC2)
description: >
sitemap: false
---

# NoGwari Deployment(AWS EC2)

---------------------

진짜 힘겹게 배포를 성공했다. AWS EC2가 배포하기 쉽게 나왔다고 하지만 나에겐 그렇게 쉽게만 되진 않았다. 여러 우여곡절 끝에 배포를 성공했기 때문에, 그리고 이걸 기억하기에는 뇌에 메모리가 부족할 거 같기 때문에, 일일이 하나하나 배포과정을 스크린샷으로 떠서 보관해두려고 한다. 언젠간 EC2로 서버팔 일이 분명히 있기 때문에, 그 때 와서 다시 봐야겠다.

## 배포과정

* #### 인스턴스 시작 버튼

![](../../assets/img/Project/nogwari/deploy1.png)

* #### 이름 세팅

![](../../assets/img/Project/nogwari/deploy2.png)

* #### OS설정(프리티어면 저 버전 고정)

![](../../assets/img/Project/nogwari/deploy3.png)

* #### 키페어이름 설정

![](../../assets/img/Project/nogwari/deploy4.png)

* #### 네트워크 설정인데 건들인거 없음..

![](../../assets/img/Project/nogwari/deploy5.png)

* #### 스토리지 구성인데 얘도 건든거 없음..

![](../../assets/img/Project/nogwari/deploy6.png)

**여기까지하면 인스턴스 실행이 완료된다.**

근데 이렇게만하면 실행은 되는데, 아무것도 연결되지않는 인스턴스가 된다. 

![](../../assets/img/Project/nogwari/deploy7.png)

![](../../assets/img/Project/nogwari/deploy8.png)

위와같이 보안그룹에 인바운드 규칙에서 허용을 해줘야한다. 지금은 모든 3000포트와 80포트에 대해 모든 IP가 들어올 수 있게 해주었다. 그렇게 해준다면 일단 접속은 된다. 보안은 모르겠고 일단 배포가 되어서 기쁘다.

글로쓰면 왜이리 간단해보이지. 저렇게 하는과정에서 되게 많은 우여곡절이 있었는데,,

여튼 배포관련해서 **끝!**	
