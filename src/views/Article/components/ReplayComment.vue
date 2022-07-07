<template>
  <div>
    <van-nav-bar fixed :title="title" left-arrow @click-left="$emit('close')">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        round
        plain
        block
        @click="isAddCommentShow = true"
        >点击回复</van-button
      >
    </div>
    <!-- 新建评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow"
      ><AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment
    ></van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentsApi } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentsList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentsList () {
      try {
        const res = await getCommentsApi({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '当前没有评论'
      } else {
        return `当前共有${count}条评论`
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 720px;
  padding: 5px 15px;
}
</style>
