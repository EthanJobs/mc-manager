<template>
  <div class="flex h-full w-[300px] justify-center items-center flex-col">
    <!-- <div class="flex w-full">
      <n-input class="m-r-4" v-model:value="name" @keyup.enter="getUuid"></n-input>
      <n-button @click="getUuid">搜索</n-button>
    </div> -->
    <div class="flex w-full justify-center items-center">{{ name }}</div>
    <div
      class="h-[400px] flex justify-center items-center m-y-4"
      style="border: 1px solid rgb(200, 201, 202); border-radius: 5px"
    >
      <n-spin v-show="loading"></n-spin>
      <canvas ref="canvas" v-show="!loading"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/skin'
import * as skinview3d from 'skinview3d'

const props = defineProps({
  uuid: {
    type: String,
    default: '',
  },
})

watch(
  () => props.uuid,
  async (e) => {
    const skinBase64 = await api.get_skin(e)
    name.value = skinBase64.name
    const skinData = JSON.parse(atob(skinBase64.properties[0].value))
    const skin = skinData.textures?.SKIN?.url

    await skinViewer.value.loadSkin(skin)

    loading.value = false
  },
  { immediate: true }
)

const canvas = ref(null)
const loading = ref(false)
const name = ref('')
const skinViewer = ref(null)

const skinViewInit = () => {
  skinViewer.value = new skinview3d.SkinViewer({
    canvas: canvas.value,
    width: 300,
    height: 400,
  })
}

const getUuid = async () => {
  loading.value = true

  const { id } = await api.get_uuid(name.value)
  const skinBase64 = await api.get_skin(props.uuid)
  const skinData = JSON.parse(atob(skinBase64.properties[0].value))
  const skin = skinData.textures?.SKIN?.url

  await skinViewer.value.loadSkin(skin)

  loading.value = false
}

onMounted(() => {
  skinViewInit()
})
</script>
