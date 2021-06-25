exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'HEROPY',
      age: 26,
      email: 'toffg6450@naver.com'
    })
  }
}