<template>
  <div>
    <!-- 登录之后 -->
    <div class="header-my header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.like_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header-my header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template slot="icon">
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template slot="icon"> <i class="toutiao toutiao-lishi"></i> </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知 " is-link to="index" />
      <van-cell title="小智同学" is-link to="index" />
    </van-cell-group>
    <van-button type="default" block v-if="user && user.token" @click="loginout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoApi } from '@/api/user'
export default {
  name: 'MY',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfoApi()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loginout () {
      try {
        await this.$dialog.confirm({
          message: '弹窗内容'
        })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header-my {
  width: 750px;
  height: 401px;
  background-color: rgb(50, 150, 250, 0.7);
  background: url("~@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    color: #ffffff;
    margin: 0;
    line-height: 28px;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 33px 0 32px;
    .right {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
      text-align: center;
      line-height: 33px;
    }
    .left {
      display: flex;
      align-items: center;
      text-align: center;
      span {
        margin-left: 22px;
        width: 153px;
        height: 30px;
        font-size: 30px;
        line-height: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        font-weight: normal;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 54px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.van-button__text {
  color: #d86262;
}
</style>
