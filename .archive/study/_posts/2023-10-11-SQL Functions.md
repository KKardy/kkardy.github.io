---
layout: post
title: "SQL Functions"
description: >
hide_last_modified: true

---

# SQL Functions

---

 요즘 sql공부를 시작했다. nestjs공부를 끝냈냐구요? 그럴리가요. 책을 한권 다 읽었다. 그런 다음에는 이제 뭘 해야할지 모른다는 느낌이 좀 드는 거 같다. 그렇다고 프로젝트를 하자니 딱히 혼자서 하고싶은 프로젝트가 생각나지도 않는다. 그래서 공부할 걸 찾았다.

사실 진짜 곰곰이 생각해봐도 뭘 공부해야할 지 몰라서 먼저 공부하셨던 아는 형한테 여쭤봤더니 "sql은 좀 하니?"라고 바로 답변이 나왔다. 흡! 숨이 너무 막혔다. 나는 뭘 공부한거지...? ㅋㅋㅋ 아니 맨날 ORM만 쓰다보니까 sql은 진짜 하나도 기억 안나는 상태였기 때문이다. 

그래서 일단 강의를 들었다. 진짜 새로운 마음가짐으로. 그리고 프로그래머스 sql 코딩테스트 문제를 전부 다 풀어보았다. 76문제 있는데 진짜 너무 모르겠어서 답 본 8문제? 말고는 다 내 머리로 풀었다. 물론 서브쿼리 써가면서 성능은 떨어질 지 몰라도, 여튼 풀었다!!!

[sql 강의]

[프로그래머스 SQL 코딩테스트]

[sql 강의]: https://www.youtube.com/watch?v=dgpBXNa9vJc&amp;t=716s

[프로그래머스 SQL 코딩테스트]: https://school.programmers.co.kr/learn/challenges?order=acceptance_desc&amp;languages=mysql

강의는 유튜버 얄팍한 코딩사전님 영상을 봤다. 왕초보용! 듣길 잘한 거 같다. 난 진짜 왕초보만도 못했다.

근데, 강의를 듣고 따라쳐보고 있지만, sql functions 및 operater가 생각보다 많았다. 그래서 이렇게 글을 작성해 암기도 한번 하고~ 이런 게 있는지 한번 더 상기시키고 ~ 기억 안나면 여기 들어와서 한번 더 보고~ 할 겸 이렇게 글을 작성한다.

시작해보자.

## Operater

어.. 너무 쉬운 연산자는 제외하고 mysql특성이 묻어나는 연산자들을 정리해보았다. 나머지는 덧셈 뺄셈 이런거라... 흠... 왕초보 진성이도 아는 내용이였다.

일단 이건 짚고 넘어가자.

**0 == false, 1 == true**

```sql
SELECT TRUE IS TRUE; -- 1

SELECT TRUE IS NOT FALSE; -- 1

SELECT (TRUE IS FALSE) IS NOT TRUE; -- 1
```

**IS, IS NOT연산자.** 
잘 기억하고 써보자.

```sql
SELECT 5 BETWEEN 1 AND 10; -- 1

SELECT 'banana' NOT BETWEEN 'Apple' AND 'camera'; -- 1

SELECT * FROM OrderDetails
WHERE ProductID BETWEEN 1 AND 4;

SELECT * FROM Customers
WHERE CustomerName BETWEEN 'b' AND 'c';
```

**BETWEEN 연산자.** 
문자와 숫자 모두 쓸 수 있다는 점을 유념해야할 거 같다.

```sql
SELECT 1 + 2 IN (2, 3, 4) -- 1

SELECT * FROM Customers
WHERE City IN ('Torino', 'Paris', 'Portland', 'Madrid') 
```

**IN 연산자.**
( )안에 있는 값안에 있는지 판단한다.

```sql
SELECT
  'HELLO' LIKE 'hel%', -- 1
  'HELLO' LIKE 'H%', -- 1
  'HELLO' LIKE 'H%O', -- 1
  'HELLO' LIKE '%O', -- 1
  'HELLO' LIKE '%HELLO%', -- 1
  'HELLO' LIKE '%H', -- 0
  'HELLO' LIKE 'L%' -- 0

SELECT
  'HELLO' LIKE 'HEL__', -- 1
  'HELLO' LIKE 'h___O', -- 1
  'HELLO' LIKE 'HE_LO', -- 1
  'HELLO' LIKE '_____', -- 1
  'HELLO' LIKE '_HELLO', -- 0
  'HELLO' LIKE 'HEL_', -- 0
  'HELLO' LIKE 'H_O' -- 0
```

**LIKE 연산자.**
얘는 그래도 검색기능에서 써봐서 좀 익숙하다. 결과만봐도 어떤 느낌인지 딱 알 수 있을 거 같다.

```sql
SELECT 
  ROUND(0.5), -- 1
  CEIL(0.4), -- 1
  FLOOR(0.6), -- 0
  ABS(-1); -- 1
  ROUND(0.05, 2) -- 0.1
```

**ROUND, CEIL, FLOOR, ABS**.
차례대로 반올림, 올림, 내림, 절대값이다.
TRUNCATE라는 소숫점 자리수 선택하는 게 있는데, 나는 기억이 잘 안나서 위와 같이 ROUND의 두번째 인자값을 이용했다.

```sql
SELECT
  MAX(Quantity),
  MIN(Quantity),
  COUNT(Quantity),
  SUM(Quantity),
  AVG(Quantity)
FROM OrderDetails
WHERE OrderDetailID BETWEEN 20 AND 30;
```

**MAX, MIN,COUNT, SUM, AVG**.
그룹함수와 자주 쓰이는 친구들이다. 최대값, 최소값, 개수, 총합, 평균이다.

```sql
SELECT
  POW(2, 3), -- 8
  POWER(5, 2), -- 25
  SQRT(16); -- 4
```

**POW(POWER), SQRT**.
제곱과 제곱근이다.

```sql
SELECT
  UPPER('abcDEF'), -- ABCDEF
  LOWER('abcDEF'), -- abcdef
	CONCAT('HELLO', ' ', 'THIS IS ', 2021), -- HELLO THIS IS 2021
  SUBSTR('ABCDEFG', 3), -- CDEFG
  SUBSTR('ABCDEFG', 3, 2), -- CD
  SUBSTR('ABCDEFG', -4), -- DEFG
  SUBSTR('ABCDEFG', -4, 2), -- DE
  TRIM(" TRIM "), -- TRIM(공백 없이)
  REPLACE('맥도날드에서 맥도날드 햄버거를 먹었다.', '맥도날드', '버거킹');
  -- 버거킹에서 버거킹 햄버거를 먹었다.
```

**문자열 함수.** 
주석과 비교하면 쉽사리 이해할 수 있을 거 같다.



```sql
-- DATE는 2023년 1월 2일 10:25:50 로 가정한다. 
-- SECOND_DATE는 2023년 1월 3일 10:25:50 로 가정한다. 
SELECT 
	YEAR(DATE), -- 2023
	MONTH(DATE), -- 01
	DAY(DATE), -- 02
	WEEKDAT(DATE), -- 0 (월요일 0부터 일요일 6까지 반환값을 갖는다. 2023-01-02는 월요일)
	HOUR(DATE), -- 10
	MINUTE(DATE), -- 25
	SECOND(DATE), -- 50
	DATEDIFF(SECOND_DATE, DATE), -- 1
	TIMEDIFF(SECOND_DATE, DATE), -- 24
```

**날짜 관련 함수.**
각 자 붙여진 이름답게 결과값이 출력되는것을 확인할 수 있다.

```sql
-- DATE는 2023년 1월 2일 10:25:50 로 가정한다. 
SELECT DATE_FORMAT(DATE, "%Y-%m-%d") -- 2023-01-02
```

**DATE_FORMAY.**
코딩테스트 풀 때, 굉장히 많이 쓴 함수이다. 내가 원하는 꼴로 데이터를 바꿔서 출력할 수 있다.
위에 써있진 않지만, %T -> hh:mm:ss / %H -> 24시간제 / %i -> 분 / %s -> 초로 시간도 원하는대로 만들어 출력할 수 있다.

```sql
SELECT 
	IF (1 > 2, '1는 2보다 크다.', '1은 2보다 작다.'); -- 1은 2보다 작다.
	CASE
  	WHEN -1 > 0 THEN '-1은 양수다.'
	  WHEN -1 = 0 THEN '-1은 0이다.'
  	ELSE '-1은 음수다.'
	END; -- -1은 음수다
```

**조건문.**
IF문은 편하게 사용하지만 더 유용하게 사용했던건 CASE문이였던 거 같다. 자주 까먹는 문법이라 코딩테스트때도 두세번 찾아봤던 거 같은데, WHEN문 옆에 조건문을 두고, 그 조건이 참일땐 THEN문이 반환된다. WHEN문이 전부 통과되지 않을때 ELSE문이 있으며, 전부 끝난다음엔 END를 걸어주어야 한다.



이렇게 간단하게 SQL FUNCTION들을 알아보았다. 코딩테스트는 다 풀었지만, ORM만 쓰던 나에게 긴장감을 불어넣어 준 거 같다. 이제 진짜 절대 안 까먹을거다. 홀홀홀

