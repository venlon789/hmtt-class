<template :include="['home']">
  <div>
    <keep-alive>
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home"
        >首页
        <template v-slot:icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video"
        >视频
        <template v-slot:icon> <i class="toutiao toutiao-shipin"></i> </template
      ></van-tabbar-item>
      <van-tabbar-item replace to="/question"
        >问答
        <template v-slot:icon> <i class="toutiao toutiao-wenda"></i> </template
      ></van-tabbar-item>
      <van-tabbar-item replace to="/my"
        >我的
        <template v-slot:icon> <i class="toutiao toutiao-wode"></i> </template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
</style>
