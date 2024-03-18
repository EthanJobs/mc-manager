<template>
  <div class="flex wh-full justify-center items-center">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/skin'
import skin from '@/assets/skins/test.png'
import * as skinview3d from 'skinview3d'

const canvas = ref(null)

const skinViewInit = () => {}

const getUuid = async () => {
  const uuid = await api.get_uuid('jeb_')
  console.log(uuid)
}

onMounted(() => {
  skinViewInit()

  let skinViewer = new skinview3d.SkinViewer({
    canvas: canvas.value,
    width: 300,
    height: 400,
    skin: skin,
  })

  getUuid()
})
</script>
