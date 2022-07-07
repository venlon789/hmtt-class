<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelect">
        <span @click="$store.commit('delAllHistory')">全部删除</span
        >&nbsp;&nbsp; <span @click="isDelect = false">完成</span>&nbsp;&nbsp;
      </template>
      <van-icon name="delete" v-else @click="isDelect = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        v-if="isDelect"
        name="close"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelect: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
