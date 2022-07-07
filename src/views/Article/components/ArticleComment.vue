<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      >
      </CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentsApi } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    // console.log(this.source)
    this.getComments()
  },
  data () {
    return {
      commentObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getComments () {
      // console.log(this.source)
      this.loading = true
      try {
        const res = await getCommentsApi(this.commentObj)
        // console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        console.log(res.data.data.total_count)
        this.$emit('set-commentCount', res.data.data.total_count)
        this.commentObj.offset = res.data.data.last_id
        this.commentList.push(...res.data.data.results)
        console.log(this.commentList)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // console.log(123)
      this.getComments()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
