<template>
  <div class="change-username-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">修改用户名</span>
    </head-top>
    <div class="change-username-container">
      <input-component value="" placeholder="输入用户名" @inputs="checkValueInput"></input-component>
      <div class="tip">
        <span v-if="checkName">用户名只能修改一次（5-24字符之间）</span>
        <span v-else style="color:red">用户名长度在5到24位之间</span>
      </div>
      <div class="submit" @click="submit">确认修改</div>
    </div>
  </div>
</template>
<script>
import inputComponent from '@/components/common/input'
import headTop from '@/components/head/head'
export default {
  data () {
    return {
      checkName: true
    }
  },
  components: {
    inputComponent,
    headTop
  },
  methods: {
    checkValueInput: function (value) {
      if (/^\w{5,24}$/.test(value)) {
        this.checkName = true
      } else {
        this.checkName = false
      }
    },
    submit: function () {
      
    }
  }
}
</script>
<style>
  .change-username-container {
    margin: 3.5rem 1rem 1rem 1rem;
  }
  .tip {
    font-size: .65rem;
    margin-top: 1rem;
  }
  .submit {
    background-color: #3199e8;
    line-height: 2.5rem;
    text-align: center;
    color: #ccc;
    margin-top: 1rem;
  }
</style>
