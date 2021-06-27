module.exports = {
  // 파일 확장자를 지정하지 않는 경우, Jest가 자동으로 검색할 확장자 목록이다.
  // 일반적으로 많이 사용되는 모듈의 확장자를 지정한다.
  // E.g. `import HelloWolrd from '~components/HellowWorld';`
  moduleFileExtensions: [
    'js',
    'vue'
  ],

  // `~` 같은 경로 별칭을 매핑한다.
  // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있다.
  // E.g. `import HelloWolrd from '~components/HellowWorld';`
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },

  // // 일치하는 경로에서는 모듈을 가져오지 않는다.(테스트 진행x)
  // // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있다.
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ],

  // jsdom 환경에 대한 URL을 설정한다.  (HTML환경)
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http:localhost',

  // 정규식과 일치하는 파일의 변환 모듈을 지정한다.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  }
}