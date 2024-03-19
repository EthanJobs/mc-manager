<template>
  <n-upload
    class="mx-auto w-[75%] p-20 text-center"
    :custom-request="handleUpload"
    :max="1"
    @before-upload="onBeforeUpload"
  >
    <n-upload-dragger>
      <div class="h-150 f-c-c flex-col">
        <i class="i-mdi:upload mb-12 text-68 color-primary" />
        <n-text class="text-14 color-gray">点击或者拖动文件到该区域来上传</n-text>
      </div>
    </n-upload-dragger>
  </n-upload>
  <div class="flex justify-around items-center">
    <skin v-for="nbt in nbtList" :key="nbt.uuid" :uuid="nbt.uuid" />
  </div>
</template>

<script setup>
import { nbtParseByBase64 } from '@/utils/nbt/nbt-fly'
import { int2hex } from '@/utils/nbt/nbt-config'
import JSZip from 'jszip'
import skin from './components/skin.vue'

const nbtList = ref([])

function onBeforeUpload({ file }) {}

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type) {
    $message.error('请选择文件')
  }

  const zipData = await JSZip.loadAsync(file.file)
  nbtList.value.length = 0

  for (let nbtDat in zipData.files) {
    if (
      zipData.files[nbtDat].name.split('.').pop().toLowerCase() !== 'dat' ||
      !zipData.files[nbtDat].name.startsWith('playerdata')
    )
      continue
    const b64Data = await zipData.files[nbtDat].async('base64')
    const nbtData = await nbtParseByBase64(b64Data)
    nbtData.uuid = nbtData.value.UUID.value.map((e) => int2hex(e)).join('')
    nbtList.value.push(nbtData)
  }
}
</script>
