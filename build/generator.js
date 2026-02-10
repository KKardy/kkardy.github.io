const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const matter = require('gray-matter');

const md = new markdownIt();
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

// 파일 및 디렉토리 존재 확인/생성 함수
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 포스트 읽기 및 메타데이터 추출
function readPosts() {
  const posts = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        ...data,
        filename: file.replace('.md', ''),
        content: md.render(content)
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

// 개별 포스트 HTML 생성
function generatePostHTML(post) {
  const layoutTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'layout.html'), 'utf8');
  const postTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'post.html'), 'utf8');

  const postHTML = postTemplate
    .replace('{{title}}', post.title)
    .replace('{{date}}', post.date)
    .replace('{{content}}', post.content);

  return layoutTemplate.replace('{{content}}', postHTML);
}

// 인덱스 페이지 생성
function generateIndexHTML(posts) {
  const layoutTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'layout.html'), 'utf8');
  const indexTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'index.html'), 'utf8');

  const postsListHTML = posts.map(post => `
    <article>
      <h2><a href="/posts/${post.filename}.html">${post.title}</a></h2>
      <time>${post.date}</time>
    </article>
  `).join('');

  const indexHTML = indexTemplate.replace('{{posts}}', postsListHTML);
  return layoutTemplate.replace('{{content}}', indexHTML);
}

// 빌드 프로세스
function build() {
  ensureDirectoryExists(DIST_DIR);
  ensureDirectoryExists(path.join(DIST_DIR, 'posts'));

  const posts = readPosts();

  // 인덱스 페이지 생성
  const indexHTML = generateIndexHTML(posts);
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHTML);

  // 개별 포스트 페이지 생성
  posts.forEach(post => {
    const postHTML = generatePostHTML(post);
    fs.writeFileSync(path.join(DIST_DIR, 'posts', `${post.filename}.html`), postHTML);
  });

  console.log('블로그 빌드 완료!');
}

build();