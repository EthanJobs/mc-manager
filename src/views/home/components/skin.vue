<template>
  <div class="flex justify-center items-center flex-col">
    <div class="w-[400px]">
      <!-- <div class="flex">
        <n-input class="m-r-4" v-model:value="playerName" @keydown.enter="getUuid"></n-input>
        <n-button :loading="loading" @click="getUuid">输入玩家名</n-button>
      </div> -->
      <div class="w-full flex justify-center items-center">
        {{ playerName }}
      </div>
      <div
        class="flex justify-center items-center h-[600px] m-y-4"
        style="border: 1px solid rgba(194, 194, 194, 1)"
      >
        <n-spin v-show="loading" />
        <canvas ref="canvas" v-show="!loading"></canvas>
      </div>
      <n-radio-group v-model:value="animation" class="flex justify-center items-center">
        <n-space>
          <n-radio
            v-for="item in animations"
            :key="item.label"
            :value="item.value"
            @change="handleChange"
          >
            {{ item.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
      {{ value.Inventory }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/skin'
import skin from '@/assets/skins/test.png'
import * as skinview3d from 'skinview3d'

const props = defineProps({
  uuid: {
    type: String,
    default: '',
  },
  value: {
    type: Object,
    default: () => {},
  },
})

const availableAnimations = {
  none: null,
  idle: new skinview3d.IdleAnimation(),
  walk: new skinview3d.WalkingAnimation(),
  run: new skinview3d.RunningAnimation(),
  fly: new skinview3d.FlyingAnimation(),
}

const animations = [
  {
    label: '摆烂',
    value: 'none',
  },
  {
    label: '休闲',
    value: 'idle',
  },
  {
    label: '走路',
    value: 'walk',
  },
  {
    label: '跑步',
    value: 'run',
  },
  {
    label: '飞行',
    value: 'fly',
  },
]

const canvas = ref(null)
const loading = ref(false)
const playerName = ref('')
const animation = ref('none')
const skinViewer = ref(null)

watch(
  () => props.uuid,
  async (e) => {
    loading.value = true

    try {
      const skinBase64Data = await api.get_skin(e)
      const skinData = JSON.parse(atob(skinBase64Data.properties[0].value))
      const skinUrl = skinData.textures.SKIN.url
      const capeUrl = skinData.textures?.CAPE?.url
      playerName.value = skinBase64Data.name

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

      skinViewer.value = new skinview3d.SkinViewer({
        canvas: canvas.value,
        width: 400,
        height: 600,
        skin: skinUrl,
        cape: capeUrl,
        panorama: 'https://bs-community.github.io/skinview3d/img/panorama.png',
        animation: availableAnimations[animation.value],
      })
    } catch (err) {
      $message.error(e, '搜索失败')
    }

    loading.value = false
  },
  { immediate: true }
)

const getUuid = async () => {
  loading.value = true

  try {
    const uuid = await api.get_uuid(playerName.value)
    const skinBase64Data = await api.get_skin(uuid.id)
    const skinData = JSON.parse(atob(skinBase64Data.properties[0].value))
    const skinUrl = skinData.textures.SKIN.url
    const capeUrl = skinData.textures?.CAPE?.url

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    skinViewer.value = new skinview3d.SkinViewer({
      canvas: canvas.value,
      width: 400,
      height: 600,
      skin: skinUrl,
      cape: capeUrl,
      panorama: 'https://bs-community.github.io/skinview3d/img/panorama.png',
      animation: availableAnimations[animation.value],
    })
  } catch (err) {
    $message.error('搜索失败')
  }

  loading.value = false
}

const handleChange = () => {
  skinViewer.value.animation = availableAnimations[animation.value]
}
</script>
