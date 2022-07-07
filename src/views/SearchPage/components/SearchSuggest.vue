<template>
  <div>
    <van-cell
      v-for="(item, index) in suggestionList"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="hightLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestListApi } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      suggestionList: []
    }
  },
  methods: {
    hightLight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, ` <span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (val) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            console.log(val)
            const res = await getSuggestListApi(val)
            console.log(res)
            this.suggestionList = res.data.data.options
            console.log(this.suggestionList)
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearInterval(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
