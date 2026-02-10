---
layout: post
title: "Validation"
description: >
hide_last_modified: true
---

# Dwitter Validation

---

Dwitter 프로젝트를 진행하던 도중, Validation에 대해 정리해두면 좋을 거 같아서 정리한다.

Middleware 탭을 만들어 그 안에 validate.js 파일을 만든 후, 아래와 같이 작성하여 필요할때 불러내어 작성할 수 있도록 깔쌈하게 했다.

​	

```javascript
import {validationResult} from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(400).json({message: errors.array()[0].msg});
};
```

그리고 저렇게 짠 validate를 아래와 같이 이용하였다. 

```javascript
import {validate} from "../middleware/validate.js";
const validateCredential = [
    body("username")
        .trim()
        .isLength({min: 5})
        .withMessage("username should be at least 5 char"),
    body("password")
        .trim()
        .isLength({min: 5})
        .withMessage("password should be at least 5 char"),
    validate,
];

const validatesignup = [
    ...validateCredential, //위에 username, password 가져와서 검사하는 애
    body("name").trim().notEmpty().withMessage("name is missing"),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("invaild email"),
    body("url")
        .trim()
        .isURL()
        .withMessage("invaild url")
        .optional({nullable: true, checkFalsy: true}),
    validate,
];
// GET /auth/me
router.get("/me", isAuth, authController.me);

// POST /signup
router.post("/signup", validatesignup, authController.signup);

// POST /login
router.post("/login", validateCredential, authController.login);
```

이렇게 body안에 검증해야하는 값들을 넣고 !! **trim()** !! 해주는 것도 중요한 거 같다. 뭐 isEmail이나 isURL같은 경우 상관은 없지만, isLength같은 경우 양쪽에 띄어쓰기 해고서 작성했을 경우 된다고 해버리면 곤란할거다. 그니까 꼭 해주자. javascrypt강의 들을때 trim 쟨 어따 써먹나 생각했는데, 이런곳에서 쓰나보다.



찾아보니 생각보다 많은 라이브러리 함수들이 있어서 그걸 표로 다 옮겨적긴 무리가 있으니 깃허브 링크를 둬야겠다. [Validator.js]

[Validator.js]: https://github.com/validatorjs/validator.js

찾아와서 봐야징



