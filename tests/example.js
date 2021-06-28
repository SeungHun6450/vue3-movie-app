// example 1
// export function double(num) {
// if (!num) {
//   return 0
// }


//   return num * 2
// }

// example 비동기 함수, 최대 5초까지 가능
// export function asyncFn() {
  //   return new Promise(resolve => {
    //     setTimeout(() => {
      //       resolve('Done!')
      //     }, 6000)
      //   })
      // }


import axios from 'axios';
import _upperFirst from 'lodash/upperFirst';
import _toLower from 'lodash/toLower';


export async function fetchMovieTitle() {
  const res = await axios.get('https://omdbapi.com?apikey=7035c60c&i=tt4520988')
  // Frozen II => Frozen ii 로 출력되게 해보자
  return _upperFirst(_toLower(res.data.Title))
}