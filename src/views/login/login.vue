<template>
  <div class="flex-col">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="账号" path="account">
        <n-input v-model:value="model.account" placeholder="" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="model.password" placeholder="" />
      </n-form-item>
    </n-form>
    <n-button>登录</n-button>
    <n-button text class="text-center m-t-14" @click="register">还没注册, 马上去注册</n-button>
  </div>
</template>

<script setup>
const tab = defineModel('tab')

const model = ref({
  account: null,
  password: null
})

const rules = ref({
  account: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入账号'
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码'
  }
})

const register = () => {
  tab.value = 'register'
}
</script>

<style scoped>

</style>