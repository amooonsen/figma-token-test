const StyleDictionary = require('style-dictionary')

// 커스텀 이름 변환기 등록
StyleDictionary.registerTransform({
  name: 'name/kebab',
  type: 'name',
  transformer: (token) => {
    // `token.path`는 배열 형태로, 토큰의 위치를 나타냅니다.
    // 배열 요소를 하이픈으로 연결하여 소문자로 변환합니다.
    return token.path.join('-').toLowerCase();
  }
});

// 박스 쉐도우 변환기 등록
StyleDictionary.registerTransform({
  name: 'custom/transformBoxShadow',
  type: 'value',
  matcher: function (token) {
    return token.type === 'boxShadow';
  },
  transformer: function (token) {
    // 박스 쉐도우 객체 배열을 문자열로 변환
    return token.value.map(shadow => {
      return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    }).join(', ');
  }
});

// 타이포그래피 변환기 등록
StyleDictionary.registerTransform({
  name: 'custom/transformTypography',
  type: 'value',
  matcher: function(token) {
    return token.type === 'typography';
  },
  transformer: function(token) {
    const { fontFamily, fontWeight, lineHeight, fontSize, paragraphSpacing, letterSpacing } = token.value;
    // 각 속성을 SCSS 맵 항목으로 변환
    return `(
      font-family: ${fontFamily}, 
      font-weight: ${fontWeight}, 
      line-height: ${lineHeight}, 
      font-size: ${fontSize}px, 
      paragraph-spacing: ${paragraphSpacing}px, 
      letter-spacing: ${letterSpacing}
    )`.replace(/\n/g, ' ').trim();
  }
});

// 보더 변환기 등록
StyleDictionary.registerTransform({
  name: 'custom/transformBorder',
  type: 'value',
  matcher: function (token) {
    return token.type === 'border'
  },
  transformer: function (token) {
    return `${token.value.width}px ${token.value.style} ${token.value.color}`;
  }
})

// 변환 그룹 등록
StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: [
    'custom/transformBorder',
    'name/kebab',
    'custom/transformBoxShadow',
    'custom/transformTypography',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

StyleDictionary.extend({
  source: ['./global.json'],
  platforms: {
    scss: {
      transformGroup: 'custom/scss',
      buildPath: '',
      files: [{
        destination: 'variables.scss',
        format: 'scss/variables'
      }]
    }
  }
}).buildAllPlatforms();