---
layout: post
title: "Javascript summarize"
description: >
sitemap: false
hide_last_modified: true
---

## Javascript summarize

---

### 변수

|       | 종류            |
| ----- | --------------- |
| var   | Function-scoped |
| let   | Block-scoped    |
| const | Block-scoped    |

var은 선언 및 초기화단계가 동시에 일어나고, 그 이후 할당단계가 이뤄진다. 동시에 함수 스코프라 중복 선언이 가능하다.

그에 반면 let은 선언과 초기화단계가 분리되어, 한번 선언 이후엔 선언이 불가하다.

const는 선언, 초기화, 할당이 동시에 일어나며 선언 이후 변경이 불가능하다.

### 생성자함수

객체를 생산하는데에 함수를 이용한다.

```javascript
function Item(title, price) {
    this.title = title;
    this.price = price;
    this.showPrice = function () {
        console.log(`가격은 ${price}원 입니다.`);
    };
}
```

위와같은 Item이라는 함수를 만들었고, 인자값으로 title과 price가 존재하는데, 함수내에 this를 사용하여 쉽게 호출이 가능하다.

```javascript
const item1 = new Item("인형", 3000);
const item2 = new Item("가방", 4000);

item1.showPrice();
```

위와같이 new연산자를 사용해 객체생성이 용이하다. 또한, 생성자함수내에 있는 함수를 사용할 수 있다.

### 문자열 메소드

| 메소드 종류                                         | 메소드 설명        |
| --------------------------------------------------- | ------------------ |
| str.length                                          | 문자열 길이        |
| str.toUpperCase()/toLowerCase()                     | 대소문자 변경      |
| str.indexOf("text")<br />// 위치내에 없다면 -1 반환 | text의 위치값 찾기 |
| str.slice(n,m)                                      | n부터m까지 반환    |
| str.trim()                                          | 공백제거           |
| str.repeat()                                        | 반복               |

### 배열 메소드

| 메소드 종류                                            | 메소드 설명                                        |
| ------------------------------------------------------ | -------------------------------------------------- |
| arr.concat(arr2, arr3)                                 | 배열 합치기                                        |
| arr.forEach(fn)                                        | 배열 반복                                          |
| arr.indexOf() / lastIndexOf()                          | 배열에서 위치값 찾기                               |
| arr.find(fn)                                           | 첫번째 false에서 값 반환                           |
| arr.filter(fn)                                         | 만족하는 모든 요소를 배열로 반환                   |
| arr.reverse()                                          | 역순으로 재정렬                                    |
| arr.map(fn)                                            | 함수를 받아 특정기능을 시행한 후, 새로운 배열 반환 |
| arr.join();                                            | 배열을 합쳐 문자열로 반환                          |
| str.split();                                           | 문자열을 나눠 배열로 반환                          |
| arr.sort()                                             | 배열 정렬                                          |
| arr.reduce((prev,cur) =><br />{return prev + cur;}, 0) | 누적 계산, 현재값을 사용해 반복                    |

### 구조 분해 할당

##### 배열 구조 분해

```javascript
let [a, b, c] = [1, 2];
// c는 undefined

let [a = 3, b = 4, c = 5] = [1, 2];
// a = 1, b = 2, c는 defalut값이 5이므로 5가 출력됨.

let [user1, , user2] = ["Mike", "Tom", "Jane"];
// user1 = Mike, user2는 Tom을 지나친 후 Jane이 된다.
```

##### 객체 구조 분해

```javascript
let user = {name : 'Mike', age = 30};
let {name : userName, age:userAge} = user;
console.log(userName); // Mike
console.log(userAge); // 30

// 배열 구조 분해와 마찬가지로 defalut값 설정 가능.
```

### 나머지 매개변수, 전개 구문

```javascript
function showName(...names) {
    console.log(names);
}

showName(); // []
showName("Mike"); // ['Mike']
showName("Mike", "Tom"); // ['Mike', 'Tom']
```

함수에서 arguments를 사용하지 않고 나머지 매개 변수를 사용할 수 있다.

```javascript
let arr1 = [1,2,3];
let arr2 = [4,5,6];
arr 1 = [0, ...arr2, ...arr1, 7]; // [0, 4, 5, 6, 1, 2, 3, 7]
```

배열에서 전개구문을 사용하여 배열을 쉽게 합치거나, 배열에서 forEach를 사용하지 않고 객체를 쉽게 설정할 수 있다.

### 클로저

함수와 렉시컬 환경의 조합이며, 함수가 생성될 당시의 외부 변수를 기억합니다.
생성 이후에도 지속적으로 접근이 가능합니다.

먼저 호이스팅이 일어나 전역 Lexical환경이 구축되고, 함수를 사용하는 과정에서 내부 Lexical 환경이 구축됩니다. 내부에선 전역으로 참조가 가능합니다.

### 상속, 프로토타입

```javascript
const bmw = {
  color : "red",
	wheels : 4,
	drive(){
    console.log("drive...");
  }
}

const benz = {
  color = "black",
	wheels : 4,
	drive(){
    console.log("drive...");
  }
}

const audi = {
  color = "white",
	wheels : 4,
	drive(){
    console.log("drive...");
  }
}
```

이렇게 예시가 있다고 가정해보자. bmw, benz, audi 는 색상만 다르고 같은 wheels 옵션을 가지고 있으며, 같은 drive라는 함수를 가지고 있다.

위 코드 예시를 상속을 이용하여 좀 더 가독성있고, 간편하게 만들 수 있다.

```javascript
const car - {
  wheels : 4,
	drive(){
    console.log("drive...");
  }
}

const bmw = {
  color : "red",
}

const benz = {
  color = "black";
}

const audi = {
  color = "white",
}

bmw.__proto__ = car;
benz.__proto__ = car;
audi.__proto__ = car;
```

객체 내부에서 바로 눈에 띄진 않지만, proto옵션 내로 들어가보면 wheels와 drive함수가 잘 내장되어있는 것을 볼 수 있다.

```javascript
const x5 = {
    color: "blue",
    name: "x5",
};

x5.__proto__ = bmw;

console.log(x5.color); // blue
console.log(x5.name); // x5
console.log(x5.wheels); // 4
```

위와 같이 상속을 여러번 하는것도 가능하다. 다반 맨 마지막 상속 시점에서 새로운 값을 넣었을 경우 제일 외부의 객체의 값을 반환한다.

### 클래스

생성자 함수를 사용하여 객체를 생성할 때, new를 실수로 빼먹으면 값이 undefined가 나와 오류를 찾기 힘들다. 하지만 클래스를 사용해 객체를 상속시킨다면, 객체의 속성이 class로 변경되고, 이는 위의 오류를 찾기 용이하다.

extends를 사용하여 여러번 상속할 수 있으며, 위와 방법은 같으나 메소드 오버라이딩이 가능하다.

메소드 오버라이딩 시 가장 외부에 상속되어 있는 값이 반환되는데, 이는 super 함수를 사용하여 제일 부모의 값을 반환시키는 것도 가능하다.

### 프로미스

어떤 물건의 입고 예정을 모를때, 언제까지 몇번씩 가게에 전화해서 입고를 물어보기엔 무리가 있다. 이러한 과정에서 소비자가 가게에 전화해 입고가 된다면 전화를 해달라고 약속을 할 수 있고, 이와 같이 프로미스를 이해할 수 있다. 아래 코드블록을 보자.

```javascript
const product = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("상품이 입고되었습니다.");
    }, 3000);
});

pr.then(
    function (result) {
        console.log(result + "가지러 가자.");
    },
    function (err) {
        console.log("상품의 입고 예정이 없습니다.");
    }
);
```

new연산자를 이용하여 Promise를 생성하고, 성공했을때 resolve, 실패했을때 reject를 받는 product 변수를 생성한다. 만약 3000ms 뒤에 입고되었을 경우 성공사례로써 resolve를 소비자에게 보내는데, 그것은 아래 then에서 판단 후 '가지러 가자.'를 콘솔에 찍어낸다.

```javascript
const f1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("1번 상품 준비 완료");
        }, 1000);
    });
};

const f2 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("2번 상품 준비 완료");
        }, 3000);
    });
};

const f3 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("3번 상품 준비 완료");
        }, 2000);
    });
};
```

위와 같이 만약 여러개의 상품을 주문했다고 가정해보자.

```javascript
f1()
    .then((res) => f2(res))
    .then((res) => f3(res))
    .then((res) => console.log(res))
    .catch(console.log);
```

함수들을 callback하는 과정에서 여러번 반복하여 대기하게 될 것이고, 이는 callback hell 을 만들게 된다. 위 문구대신 async await를 사용하여 가독성을 올릴 수 있는데,

```javascript
async function order() {
    const result1 = await f1();
    const result2 = await f2(result1);
    const result3 = await f3(result2);
    console.log(result3);
}
```

order 함수를 만들어 그 안에 성공했을 때 값을 각각 result 1, 2, 3으로 만들어 호출할 수 있다.

Promise 나 async await는 모두 try/catch문을 감싸 오류에 대처할 수 있다.
