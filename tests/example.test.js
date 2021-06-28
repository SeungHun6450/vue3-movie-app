// example 1
// import { double } from './example'

// // 테스트 그룹, 내용을 wrapping
// describe('그룹1', () => {
//   beforeAll(() => {
//     console.log('beforeAll!')
//   })
//   afterAll(() => {
//     console.log('afterAll!')
//   })

//   beforeEach(() => {
//     console.log('beforeEach!')
//   })
//   afterEach(() => {
//     console.log('afterEach!')
//   })

//   test('첫 테스트', () => {
//     console.log('첫 테스트!')
//     expect(123).toBe(123)
//   })
  
//   test('인수가 숫자 데이터입니다', () => {
//     console.log('인수가 숫자 데이터입니다!')
//     expect(double(3)).toBe(6)
//     expect(double(10)).toBe(20)
//   })
  
//   test('인수가 없습니다.', () => {
//     console.log('인수가 없습니다!')
//     expect(double()).toBe(0)
//   })
// })

// example 2
// const userA = {
//   name: 'HEROPY',
//   age: 85
// }
// const userB = {
//   name: 'Neo',
//   age: 22
// }

// test('데이터가 일치해야합니다', () => {
//   expect(userA.age).toBe(85)
//   expect(userA).toEqual({
//     name: 'HEROPY',
//     age: 85
//   })
// })

// test('데이터가 일치하지 않아야 합니다.', () => {
//   expect(userB.name).not.toBe('HEROPY')
//   expect(userB).not.toBe(userA)
// })

// example 3 : 비동기 함수 패턴, 4번 패턴이 좋음
// 기본적으로 테스트는 5초가 최대이지만 필요에 따라 비동기 테스트 시간을 설정 가능
// import * as exmpale from './example'

// describe('비동기 테스트', () => {

// // 4
// test('async/await', async () => {
//   // 모의함수(Mock), 메소드를통해 비동기로 실행이 되면 Done? 을 반환
//   // 모의의 개념으로 테스트 진행, 가짜로 함수를 만들 수 있다.
//   jest.spyOn(example, 'asyncFn')
//     .mockResolvedValue('Done?')
//   const res = await example.asyncFn()
//   expect(res).toBe('Done!')
// }, 7000)


// 1
//   test('done', (done) => {
//     asyncFn().then(res => {
//       expect(res).toBe('Done!')
//       // 테스트가 언제 종료 되어야 하는지 명시
//       done()
//     })
//   })

// 2
//   test('then', () => {
//     return asyncFn().then(res => {
//       // 비동기가 완료가 되야 테스트를 마무리 할 수 있음
//       expect(res).toBe('Done!')
//     })
//   })

// 3
//   test('resolves', () =>  expect(asyncFn()).resolves.toBe('Done!'))

// })


// example - movie
// import axios from 'axios';
// import { fetchMovieTitle } from "./example";

// describe('비동기 테스트', () => {
//   test('영화 제목 변환', async () => {
//     axios.get = jest.fn(() => {
//       return new Promise(resolve => {
//         resolve({
//           data: {
//             Title: 'Frozen II'
//           }
//         })
//       })
//     })
//     const title = await fetchMovieTitle()
//     expect(title).toBe('Frozen ii')
//   })
// })


// Vue Test Utils Test
import { mount } from '@vue/test-utils'
import Example from './Example.vue'

  test('메세지를 변경합니다', async () => {
    const wrapper = mount(Example)
    // wrapprr.vm === this
    expect(wrapper.vm.msg).toBe('Hello Vue test utils!')
    // wrapper.vm. msg = 'Hello HEROPY!'
    await wrapper.setData({
      msg: 'Hello HEROPY!'
    })
    expect(wrapper.vm.msg).toBe('Hello HEROPY!')
    expect(wrapper.find('div').text()).toBe('Hello HEROPY?')
  })