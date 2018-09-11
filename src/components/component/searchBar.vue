<template>
  <!-- search-bar -->
  <div class="search-bar">
    <van-row>
      <van-col span="3">
        <svg class="icon ding-wei" aria-hidden="true">
          <use xlink:href="#icon-dingwei"></use>
        </svg>

      </van-col>
      <van-col span="16"><input type="text" placeholder="查找" class="search-input"></van-col>
      <van-col span="5">
        <van-button size="mini" class="search-button">搜索</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {}
}
</script>

<style scoped>
.search-bar {
  height: 2.5rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}

.ding-wei{
  color: #ffffff;
  width: 100%;
  margin-top: .2rem;
  font-size: 1.8rem;
}
.search-input {
  width: 100%;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: #e5017d;
  color: #ffffff;
}
.search-button {
  width: 80%;
  height: 1.3rem;
  margin: 0 10%;
}
.swiper-area {
  clear: both;
  overflow: hidden;
}
</style>
