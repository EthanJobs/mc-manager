<template>
  <n-scrollbar class="flex-1 bg-[#f7f7f7]">
    <div class="flex justify-start items-center flex-wrap">
      <userCard v-for="(nbt, uuid) in nbtList" :key="uuid" :value="nbt" :uuid="uuid" />
      <userCard v-for="(nbt, uuid) in nbtList" :key="uuid" :value="nbt" :uuid="uuid" />
      <userCard v-for="(nbt, uuid) in nbtList" :key="uuid" :value="nbt" :uuid="uuid" />
    </div>
  </n-scrollbar>
</template>

<script setup>
import api from '@/api/skin'
import { nbtParseByBase64 } from '@/utils/nbt/nbt-fly'
import { int2hex } from '@/utils/nbt/nbt-config'
import JSZip from 'jszip'
import userCard from './components/user-card.vue'

const nbtList = ref({})

const zipInit = async () => {
  const result = await api.get_nbtZip()

  const zipData = await JSZip.loadAsync(result)
  nbtList.value = {}

  for (let nbtDat in zipData.files) {
    if (
      zipData.files[nbtDat].name.split('.').pop().toLowerCase() !== 'dat' ||
      !zipData.files[nbtDat].name.startsWith('playerdata')
    )
      continue
    const b64Data = await zipData.files[nbtDat].async('base64')
    const nbtData = await nbtParseByBase64(b64Data)
    nbtList.value[nbtData.value.UUID.value.map((e) => int2hex(e)).join('')] = nbtData.value
  }

  await getOnlinePlayerInfo()
}

const getOnlinePlayerInfo = async () => {
  const regex1 = /(?<={)[^ ]*(?=:)/g
  const regex2 = /(?<=, )[^ "]*(?=:)/g
  const regex3 = /(?<=\d)[a-zA-Z]/g
  const regex4 = /I; /g

  const result = await api.get_onlinePlayerInfo()

  result.value.forEach((value) => {
    let tmp = JSON.parse(
      value
        .replace(regex1, (match) => `"${match}"`)
        .replace(regex2, (match) => `"${match}"`)
        .replace(regex3, '')
        .replace(regex4, '')
    )
    nbtList.value[tmp.UUID.map((e) => int2hex(e)).join('')] = tmp
    console.log(tmp)
  })
}

zipInit()

/* setInterval(() => {
  getOnlinePlayerInfo()
}, 1000) */
</script>
