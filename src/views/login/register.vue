<template>
  <div class="flex-col">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto">
      <n-form-item label="昵称" path="nicknames">
        <n-input v-model:value="model.nicknames" placeholder="" />
      </n-form-item>
      <n-form-item label="游戏ID" path="gameId">
        <div class="w-full relative">
          <n-input v-model:value="model.gameId" placeholder="" />
          <n-spin
            v-if="gameUUIDLoading"
            class="absolute bottom-[50%] right-0 p-t-[1px] translate-y-[50%] translate-x-[120%]"
            size="small"
          />
        </div>
      </n-form-item>
      <n-form-item label="UUID" path="gameUUID" v-show="model.gameUUID">
        <n-input v-model:value="model.gameUUID" placeholder="" disabled />
      </n-form-item>
      <n-form-item label="qq账号" path="qqAccount">
        <n-input v-model:value="model.qqAccount" placeholder="" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="model.email" placeholder="" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="model.password"
          placeholder=""
        />
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPassword">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="model.confirmPassword"
          placeholder=""
        />
      </n-form-item>
    </n-form>
    <n-button :loading="buttonLoading" @click="register">注册</n-button>
    <n-button text class="text-center m-t-14" @click="login">已有账户, 马上登录</n-button>
  </div>
</template>

<script setup>
import api from '@/api'
import skinApi from '@/api/skin'
import { debounce } from '@/utils'

const tab = defineModel('tab')
const gameUUIDLoading = ref(false)
const buttonLoading = ref(false)
const formRef = ref(null)
/* const model = ref({
  nicknames: null,
  gameId: null,
  gameUUID: null,
  qqAccount: null,
  email: null,
  password: null,
  confirmPassword: null,
}) */
const model = ref({
  nicknames: 'fly',
  gameId: 'thefly2023',
  gameUUID: null,
  qqAccount: '1356127196',
  email: '1356127196@qq.com',
  password: '20020822',
  confirmPassword: '20020822',
})


const validatorGameId = debounce(
  async (resolve, reject, value) => {
    try {
      const { id } = await skinApi.get_uuid(value)
      model.value.gameUUID = id
      gameUUIDLoading.value = false
      resolve()
    } catch (e) {
      model.value.gameUUID = ''
      gameUUIDLoading.value = false
      reject(Error('未查询到对应的uuid'))
    }
  },
  1000,
  false
)

const rules = ref({
  nicknames: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入昵称',
  },
  gameId: {
    required: true,
    trigger: ['blur', 'input'],
    validator: (rule, value) => {
      if (!value || value.trim() === '') return new Error('请输入游戏id')
      gameUUIDLoading.value = true
      return new Promise((resolve, reject) => {
        validatorGameId(resolve, reject, value)
      })
    },
  },
  gameUUID: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请再次输入密码进行确认',
  },
  qqAccount: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入qq账号',
  },
  email: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入邮箱',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码',
  },
  confirmPassword: {
    required: true,
    trigger: ['blur', 'input'],
    validator: (rule, value) => {
      if (!value || value.trim() === '') return new Error('请再次输入密码')
      if (value !== model.value.password) return new Error('两次输入不一致')
      return true
    },
  },
})

const login = () => {
  tab.value = 'login'
}

const register = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log('验证通过')
      buttonLoading.value = true
      const { nicknames, gameUUID, qqAccount, email, password } = model.value
      await api.register({ nicknames, gameUUID, qqAccount, email, password })
      buttonLoading.value = false
    } else {
      console.log(errors)
    }
  })
}
</script>

<style scoped>
</style>