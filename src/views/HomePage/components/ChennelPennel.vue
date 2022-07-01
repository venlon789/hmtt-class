<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="editChage = !editChage"
          >{{ editChage ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="index"
          ><div
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
            @click="clickMyChennel(index)"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-show="editChage"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            /></div
        ></van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in recommentChennel" :key="index"
          ><div class="inner" @click="addFn(item.id)">
            + {{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticlesListApi, saveChennelsApi } from '@/api/home'
import { setItem } from '@/utils/stroage'
const CHENNEL = 'CHENNEL'
export default {
  name: 'ChennelPennel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticlesListApi()
  },
  data () {
    return {
      recommentChennel: [],
      editChage: false
    }
  },
  methods: {
    async getAllArticlesListApi () {
      try {
        const { data } = await getAllArticlesListApi()
        this.recommentChennel = data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id
        ))
      } catch (err) {
        console.log(err)
      }
    },
    addFn (theid) {
      // eslint-disable-next-line no-return-assign
      const index = this.recommentChennel.findIndex(item => item.id === theid)
      this.channels.push(this.recommentChennel[index])
      console.log(this.channels)
      this.recommentChennel.splice(index, 1)
    },
    clickMyChennel (index) {
      if (this.editChage) {
        if (index === 0) return
        console.log(this.channels[index])
        this.recommentChennel.push(this.channels[index])
        this.channels.splice(index, 1)
        console.log(this.channels)
        if (this.active > index) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('changeactive', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (val) {
        console.log(val)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 登录的
          const arr = []
          val.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChennelsApi(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 未登录的
          setItem(CHENNEL, val)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    text-align: center;
    line-height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222222;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
  .van-col {
    margin-bottom: 22px;
  }
}
</style>
