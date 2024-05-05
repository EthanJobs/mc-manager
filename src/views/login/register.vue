<template>
  <div class="flex-col">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="昵称" path="nicknames">
        <n-input v-model:value="model.nicknames" placeholder="" />
      </n-form-item>
      <n-form-item label="游戏ID" path="gameId">
        <n-input v-model:value="model.gameId" placeholder="" />
      </n-form-item>
      <n-form-item label="qq账号" path="qqAccount">
        <n-input v-model:value="model.qqAccount" placeholder="" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="model.email" placeholder="" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="model.password" placeholder="" />
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPassword">
        <n-input v-model:value="model.confirmPassword" placeholder="" />
      </n-form-item>
    </n-form>
    <n-button>注册</n-button>
    <n-button text class="text-center m-t-14" @click="login">已有账户, 马上登录</n-button>
  </div>
</template>

<script setup>
import api from '@/api/skin'
import { debounce } from '@/utils'

const tab = defineModel('tab')

const model = ref({
  nicknames: null,
  gameId: null,
  qqAccount: null,
  email: null,
  password: null,
  confirmPassword: null
})

const validatorGameId = debounce(async (resolve, reject, value) => {
  try {
    const result = await api.get_uuid(value)
    console.log(result)
    resolve()
  } catch (e) {
    console.log(e)
    reject(Error('未查询到对应的uuid'))
  }
}, 1000, false)

const rules = ref({
  nicknames: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入昵称'
  },
  gameId: {
    required: true,
    trigger: ['blur', 'input'],
    validator: (rule, value) => {
      return new Promise((resolve, reject) => {
        validatorGameId(resolve, reject, value)
      })
    }
  },
  qqAccount: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入qq账号'
  },
  email: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入邮箱'
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码'
  },
  confirmPassword: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请再次输入密码进行确认'
  }
})

const login = () => {
  tab.value = 'login'
}
</script>

<style scoped>

</style>