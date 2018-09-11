<template>
 <div>
     <search-bar></search-bar>
     <div class="main-div">
         <router-view></router-view>
     </div>
     <bottom-bar></bottom-bar>
 </div>
</template>

<script>
import searchBar from '../component/searchBar'
import bottomBar from '../component/bottomBar'
export default {
  data () {
    return {

    }
  },
  components: {
    searchBar,
    bottomBar
  }
}
</script>

<style scoped>
.main-div{
  padding-bottom: 3rem;
}
</style>
