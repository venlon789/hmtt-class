<template>
  <div>
    <!-- 上面的登录导航 -->
    <van-nav-bar title="标题">
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号格式不正确，请输入正确的手机号',
          },
        ]"
      >
        <!-- 插槽左侧的手机icon -->
        <template v-slot:left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        center
        v-model.trim="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确，请输入六位验证码',
          },
        ]"
      >
        <!-- 插槽左侧的验证码icon -->
        <template v-slot:left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <!-- 验证码按钮的位置 -->
        <template #button>
          <!-- 倒计时 time 属性表示倒计时总时长，单位为毫秒。-->
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="yzm"
            size="small"
            native-type="button"
            @click="getSmsFn"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCodeApi, loginApi } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 登录的请求，传的值是van组件的onSubmit事件里面的values的值
    async onSubmit (values) {
      console.log('submit', values)
      try {
        const res = await loginApi(values)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    async getSmsFn () {
      console.log(this.$refs.loginFrom)
      try {
        await this.$refs.loginFrom.validate('mobile')
        this.isCountDownShow = true
        try {
          const res = await getSmsCodeApi(this.mobile)
          console.log(res)
          this.$toast.success('验证码已发送')
        } catch (err) {
          console.log(err)
          this.$toast.fail('验证码获取失败')
        }
        console.log('验证通过')
      } catch (err) {
        console.log(err)
        console.log('验证码错误')
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  border-radius: 23px;
  color: #666;
  .van-button__text {
    zoom: 0.9;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 30px;
}
.yzm {
  position: fixed;
  right: 25px;
}
</style>
