<template>
  <div class="bg-[#f4f4f4] wh-full f-c-c">
    <div class="w-[500px] flex-col">
      <div class="flex justify-between items-end gap-8 m-b-8">
        <div class="f-c-c gap-6">
          <TheLogo class="rounded-8!" />
          <div class="text-8xl">生存者之乡</div>
        </div>
        <n-button text class="text-5xl color-[#e1c900]" @click="goHome">返回首页</n-button>
      </div>
      <div class="bg-[#3149e7] f-c-c color-[white] p-y-16 font-bold text-7xl">
        {{ tab === 'login' ? '登 录' : '注 册' }}
      </div>
      <div class="bg-[#fff] p-x-[50px] p-y-[20px]">
        <login v-model:tab="tab" v-if="tab === 'login'" />
        <register v-model:tab="tab" v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import login from './login.vue'
import register from './register.vue'
import { useRouter } from 'vue-router'

const tab = ref('login')
const router = useRouter()

const goHome = () => {
  router.push({
    name: 'WelcomeHome'
  })
}
</script>

<style scoped>

</style>