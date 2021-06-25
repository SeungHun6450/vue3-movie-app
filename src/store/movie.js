// 검색 관련 용도의 데이터
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module화 되서 사용할 수 있다를 명시적으로 나타냄
  namespaced: true,
  // 실제로 취급해야할 data
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
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
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 특정 데이터를 직접 수정이 불가, 비동기
  actions: {
    async searchMovies({ state, commit }, payload) {
      // loading이 ture로 바뀌기 전에 실행
      if (state.loading) return

      commit('updateState', {
        // 검색 전 메세지 초기화, 검색 시작
        message: '',
        loading: true
      })

      try {
        // Search Movies
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          // 갱신할 내용
          movies: _uniqBy(Search, 'imdbID')
        })
        // console.log(totalResults) // 266 => 27페이지
        // console.log(typeof totalResults) // string

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)  // 올림처리

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1){
            // 추가요청이 많으면 느려지므로 if문 추가
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })  
            const { Search } = res.data
            commit('updateState',{
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]  // 새로운 배열 데이터 만들어 movies에 할당
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          // error 발생 시 초기화를 시켜서 아무것도 나오지 않게 movies를 비워줌
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          // true로 변경했던 loading을 마지막에 false로 다시 변경
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return
      
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try{
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

// 현재 파일 내부에서만 처리된다의 의미의 _
function _fetchMovie(payload) {
  const{ title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => { // error 발생 시 넘어옴
        reject(err.message)
      })
  })
}