const fs = require('fs');
const path = require('path');
const { transformTokens } = require('token-transformer');

// 추출 대상 파일 경로
const filePath = '';
const dir = path.join(__dirname, filePath);
// 만약 없다면 생성
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 변환 옵션
const transformerOptions = {};

// 파일 읽기
fs.readFile('tokens.json', 'utf8', (err, data) => {
  if (err) throw err;
  const tokens = JSON.parse(data);

  // $metadata에 token key가 있음
  const tokenKeys = [...tokens.$metadata.tokenSetOrder];

  tokenKeys.forEach((key) => {
    // 변환 작업
    const resolved = transformTokens(
      tokens, // 변환할 파일
      key === 'light' || key === 'dark' ? ['core', key] : tokenKeys, // 참조 대상
      [...tokenKeys].filter((k) => k !== key), // 추출 제외 대상
      transformerOptions // 변환 옵션
    );

    // 파일 생성
    fs.writeFileSync(
      `${filePath}/${key}.json`,
      JSON.stringify(resolved),
      (err) => {
        if (err) throw err;
      }
    );
  });
});