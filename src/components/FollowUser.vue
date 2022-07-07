<template>
  <!-- <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="$emit('input', !value)"
    >{{ value ? "已关注" : "关注" }}</van-button
  > -->
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { delUserApi, addUserApi } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      required: true
    },
    target: {
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      if (this.value) {
        try {
          await delUserApi(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addUserApi(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
