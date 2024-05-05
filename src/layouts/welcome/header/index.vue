<template>
  <AppCard class="px-12" border-b="1px solid blue dark:dark_border">
    <div class="h-full f-c-c mx-auto lg:w-[1024px] xl:w-[1280px]">
      <div class="f-c-c h-full flex-[2_1_0]">
        <TheLogo class="rounded-8!" />
        <h2 class="ml-10 flex-shrink-0 text-24 color-black font-bold">
          {{ title }}
        </h2>
      </div>
      <div class="f-c-c h-full flex-[8_1_0] font-bold">
        <div class="flex h-full relative">
          <div
            v-for="r in route.matched[0].children"
            :key="r.name"
            ref="tabs"
            class="px-[16px] h-full f-c-c hover:cursor-pointer hover:text-blue-600"
            :class="r.name === route.name ? 'text-blue-600' : ''"
            @click="tabChoose(r.name)"
          >
            {{ r.meta.title }}
          </div>
          <div
            class="absolute h-[4px] bg-blue bottom-[-1px] slide rounded-xl"
            :style="{
              width: chooseWidth + 'px',
              left: chooseLeft + 'px',
            }"
          ></div>
        </div>
      </div>
      <div class="f-c-c h-full flex-[2_1_0]">
        <div class="bg-[#3149e7] color-[white] p-y-6 p-x-14 rounded-2xl hover:cursor-pointer hover:bg-[#60a5fa]" @click="goLogin">登录 或 注册</div>
      </div>
    </div>
  </AppCard>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const title = import.meta.env.VITE_TITLE
const route = useRoute()
const router = useRouter()
const chooseWidth = ref(0)
const chooseLeft = ref(0)
const tabs = ref(null)

const changeChoose = (name) => {
  chooseLeft.value = 0
  for (let i in route.matched[0].children) {
    if (route.matched[0].children[i].name === name) {
      return (chooseWidth.value = tabs.value[i].clientWidth)
    }
    chooseLeft.value += tabs.value[i].clientWidth
  }
}

const tabChoose = (name) => {
  router.push({
    name,
  })
  changeChoose(name)
}

// 登录注册页面跳转
const goLogin = () => {
  router.push({
    name: 'login',
  })
}

onMounted(() => {
  changeChoose(route.name)
})
</script>

<style>
.slide {
  transition-property: width, left;
  transition-duration: 0.25s, 0.25s;
  transition-timing-function: ease;
}
</style>
