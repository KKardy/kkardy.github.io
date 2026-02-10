const getPostStyle = function (title) {
    return `---
layout: post
title: "${title}"
description: >
hide_last_modified: true
---

# ${title}

---
`;
};

module.exports = getPostStyle;
