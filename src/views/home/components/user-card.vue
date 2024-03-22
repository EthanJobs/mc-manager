<template>
  <div class="m-12">
    <div class="flex justify-center items-center flex-col shadow-md rounded-md bg-[#fdfdfd]">
      <div :style="cardStyle" class="fontFrame flex flex-col">
        <div
          class="flex-1 flex items-start"
          :style="{
            justifyContent: playerName === '' ? 'right' : 'space-between',
          }"
        >
          {{ playerName }}
          <n-image width="30" :src="imgSrc" />
        </div>
        <div>
          {{ uuid.substring(0, 8) }} - {{ uuid.substring(8, 12) }} - {{ uuid.substring(12, 16) }} -
          {{ uuid.substring(16, 20) }} - {{ uuid.substring(20, 32) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/api/skin'
import userCardBg from '@/assets/images/userCardBg.jpg'

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

const imgSrc = ref('')
const playerName = ref('')
const backgroundPosition = ref('')
const cardStyle = ref({
  width: '400px',
  height: '200px',
  padding: '30px',
  color: 'white',
  fontFamily: 'Impact',
  backgroundImage: `url(${userCardBg})`,
    backgroundPosition: backgroundPosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '300%',
})

const stringToNumber = (s) => {
  let hashValue = 0
  for (let i = 0; i < s.length; i++) {
    hashValue += s.charCodeAt(i)
  }
  return hashValue % 101 // 取模101，确保哈希值在0到100之间
}

const getName = async (uuid) => {
  const skinBase64Data = await api.get_skin(uuid)
  playerName.value = skinBase64Data.name
}

const getHead = async (uuid) => {
  const blob = await api.get_head(uuid)
  imgSrc.value = URL.createObjectURL(blob)
}

watch(
  () => props.uuid,
  async (e) => {
    backgroundPosition.value =
      stringToNumber(e.substring(0, 16)) + '% ' + stringToNumber(e.substring(16, 32)) + '%'
    getHead(e)
    getName(e)
  },
  { immediate: true }
)
</script>

<style>
.fontFrame {
  -webkit-text-stroke: 1px black; /* 1像素的黑色描边，WebKit内核浏览器需要使用前缀 */
  text-stroke: 1px black; /* 1像素的黑色描边 */
}
</style>
