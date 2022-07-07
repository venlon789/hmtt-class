<template>
  <div>
    <van-nav-bar fixed>
      <template v-slot:title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        ><ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <template #nav-right>
        <div class="menu" @click="isChennelsEditPennelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChennelsEditPennelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
      ><ChennelPennel
        :channels="channels"
        :active="active"
        @changeactive="
          active = $event;
          isChennelsEditPennelShow = false;
        "
        @del-event="active = $event"
      ></ChennelPennel
    ></van-popup>
  </div>
</template>

<script>
import ChennelPennel from './components/ChennelPennel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/stroage'
const CHENNEL = 'CHENNEL'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChennelsEditPennelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHENNEL)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const { data } = await getMyChannels()
          console.log(data)
          this.channels = data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChennelPennel }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  // opacity: 0.2;
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-style: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  z-index: 1;
  top: 92px;
  border-bottom: 1px solid #edeff3;
  // right: 0;
  // left: 0;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
