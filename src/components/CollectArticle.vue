<template>
  <van-loading v-if="isLoading" size="0.53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="omClick"
  />
</template>

<script>
import { addCollectApi, delCollectApi } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async omClick () {
      this.isLoading = true
      // this.$emit('update:is_collected', !this.is_collected)
      const target = this.$route.params.article_id
      if (this.is_collected) {
        try {
          await delCollectApi(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollectApi(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
