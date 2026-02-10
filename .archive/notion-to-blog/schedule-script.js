const {Client} = require("@notionhq/client");
const {NotionToMarkdown} = require("notion-to-md");
const getPostStyle = require("./post-style.constant.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const notion = new Client({
    auth: process.env.NOTION_KEY,
});

const n2m = new NotionToMarkdown({notionClient: notion});

(async () => {
    const blogDbId = process.env.NOTION_DB_ID; // 블로그 페이지 ID

    // 이전에 게시된 페이지의 ID를 저장한 파일 경로
    const postedPagesFile = path.resolve(__dirname, "posted_pages.json");
    let postedPages = [];

    // 파일이 존재하면, 게시된 페이지 ID를 읽어옴
    if (fs.existsSync(postedPagesFile)) {
        postedPages = JSON.parse(fs.readFileSync(postedPagesFile)).posted_pages;
    }

    // 블로그 페이지의 하위 페이지를 가져옴
    const response = await notion.databases.query({
        database_id: blogDbId,
    });

    // 각 하위 페이지에 대해 처리
    for (const page of response.results) {
        if (page.object !== "page" || page.properties.태그.select.name !== "완성") {
            continue;
        }

        const pageId = page.id;
        const title = page.properties.이름.title[0].plain_text;

        // 이미 게시된 페이지인지 확인
        if (postedPages.includes(page.id)) {
            console.log(`글 -${title}-은 이미 게시되었습니다.`);
            continue;
        }

        const mdblocks = await n2m.pageToMarkdown(pageId);

        let cnt = 0;
        for (const block of mdblocks) {
            const downloadUrl = block.parent.slice(block.parent.indexOf("https://"), -1);
            if (block.type === "image") {
                await download(downloadUrl, title, cnt, "jpg");
                block.parent = `![image.jpg](../../assets/img/Study/${title}-${cnt}.jpg)`;
            } else if (block.type === "file" || block.type === "video") {
                // 파일 확장자별 처리
                const fileExtensionStartIdx =
                    block.parent.indexOf(".", block.parent.indexOf("?X-Amz-Algorithm=") - 6) + 1;
                const fileExtensionEndIdx = block.parent.indexOf("?X-Amz-Algorithm=");
                const fileExtension = block.parent.slice(fileExtensionStartIdx, fileExtensionEndIdx);
                await download(downloadUrl, title, cnt, fileExtension);
                block.parent = `[Download file](../../assets/img/Study/${title}-${cnt}.${fileExtension})`;
            }
            cnt++;
        }

        const date = await getDate();
        let mdString = n2m.toMarkdownString(mdblocks);

        mdString.parent = mdString.parent.replace(/\n\n/g, "\n");
        const refinedPost = getPostStyle(title);

        fs.writeFile(
            path.resolve(__dirname + "/..") + `/study/_posts/${date}-${title}.md`,
            refinedPost + mdString.parent,
            (err) => {
                if (err) {
                    console.error("파일을 저장하는 동안 오류가 발생했습니다.", err);
                } else {
                    console.log(`파일이 성공적으로 저장되었습니다: ${title}`);
                }
            }
        );

        // 새로운 페이지 ID를 저장
        postedPages.push(pageId);
        fs.writeFileSync(postedPagesFile, JSON.stringify({posted_pages: postedPages}, null, 2));
    }
})();

async function getDate() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
    const hours = kstTime.getUTCHours();

    if (hours < 9) {
        kstTime.setUTCDate(kstTime.getUTCDate() - 1);
    }

    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstTime.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

async function download(url, title, idx, type) {
    const savePath = path.resolve(__dirname + "/..") + `/assets/img/Study/${title}-${idx}.${type}`;
    try {
        const response = await axios({
            url,
            responseType: "stream",
        });

        const writer = fs.createWriteStream(savePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    } catch (error) {
        console.error(`Error downloading the image: ${error}`);
    }
}
