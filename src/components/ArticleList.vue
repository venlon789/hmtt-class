<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articlesList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息" /> -->
        <ArticleItem
          v-for="(item, index) in articlesList"
          :key="index"
          :article="item"
        ></ArticleItem> </van-list
    ></van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticlesListApi } from '@/api/home'
let ele = null
let scrollTop = 0
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticlesList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articlesList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticlesList () {
      if (this.refreshing) {
        this.articlesList = []
        this.refreshing = false
      }
      try {
        const { data } = await getArticlesListApi({ channel_id: this.id, timestamp: this.timestamp })
        console.log(data)
        this.timestamp = data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articlesList.push(...data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticlesList()
      console.log('触发了加载')
    },
    onRefresh () {
      console.log('下拉触发了')
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticlesList()
    }
  },

  computed: {},

  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
