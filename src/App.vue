<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from '~/components/Header'

export default {
  components: { 
    Header 
  }
}
</script>


<!-- 모든 영역에서 사용하기 위해  scoped는 사용하지 않는다 -->
<style lang="scss">
  @import "~/scss/main";
</style>