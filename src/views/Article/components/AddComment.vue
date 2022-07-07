<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add_field"
    ref="field"
  >
    <template #extra>
      <van-button
        :disabled="message.length === 0"
        type="default"
        @click="onClick"
        >发布</van-button
      ></template
    >
  </van-field>
</template>

<script>
import { addCommentApi } from '@/api/comment'
export default {
  props: {
    target: {
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () {

  },
  mounted () {
    console.log(this.$refs.field.$el)
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  data () {
    return { message: '' }
  },
  methods: {
    async onClick () {
      try {
        const res = await addCommentApi({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        this.$emit('add-comment', res.data.data.new_obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.add_field {
  align-items: center;
  button {
    border: none;
  }
}
</style>
