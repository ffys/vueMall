<template>
  <section>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-content">
        <div class="floor-top">
          <div class="floor-one">
            <img :src="floorData0.image" alt="">
          </div>
          <div class="floor-two">
            <div>
              <img :src="floorData1.image" alt="">
            </div>
            <div>
              <img :src="floorData2.image" alt="">
            </div>
          </div>
        </div>
        <div class="floor-down">
          <div v-for="(item, index) in floorData.slice(3)" :key="index">
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle'],
  data () {
    return {
      floorData0: [],
      floorData1: [],
      floorData2: []
    }
  },
  watch: {
    floorData: function (val) {
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]
    }
  }
}
</script>

<style scoped>
.floor img{
  display: block;
  width: 100%;
}
.floor-title {
  width: 100%;
  font-size: 16px;
  text-align: center;
  padding: .3rem;
  border-bottom: 1px solid #eeeeee;
}
.floor-top{
  display: flex;
}
.floor-one{
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.floor-two{
  display: flex;
  flex-direction: column;
}
.floor-two div{
  border-bottom: 1px solid #eeeeee;
}
.floor-down{
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.floor-down div{
  width: 50%;
  border-bottom: 1px solid #eee;

}
.floor-down div:nth-child(odd){
border-right: .5px solid #eeeeee;
}
.floor-down div:nth-child(even){
border-left: .5px solid #eeeeee;
}
</style>
