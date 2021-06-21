// 검색 관련 용도의 데이터
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module화 되서 사용할 수 있다를 명시적으로 나타냄
  namespaced: true,
  // 실제로 취급해야할 data
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  // computed(계산된 데이터), 계산된 상태를 만들어내는 것
  getters: {},

  // methods와 유사
  // 변이, 이것을 통해서만 데이터 수정이 가능
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 특정 데이터를 직접 수정이 불가, 비동기
  actions: {
    async searchMovies({ state, commit }, payload) {
      const { title, type, number, year } = payload
      // Search Movies
      const OMDB_API_KEY = '7035c60c'
      
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data
      commit('updateState', {
        // 갱신할 내용
        movies: _uniqBy(Search, 'imdbID')
      })
      console.log(totalResults) // 266 => 27페이지
      console.log(typeof totalResults) // string

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)  // 올림처리

      // 추가 요청!
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1){
          // 추가요청이 많으면 느려지므로 if문 추가
          if (page > (number / 10)) break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)         
          const { Search } = res.data
          commit('updateState',{
            movies: [
              ...state.movies,
               ..._uniqBy(Search, 'imdbID')
            ]  // 새로운 배열 데이터 만들어 movies에 할당
          })
        }
      }
    }
  }
}