<template>
  <div>
    <div
      class="bg bg-[url(@/assets/images/login_bg.png)] bg-cover f-c-c flex-col"
      style="background-attachment: fixed"
    >
      <div
        class="animate__animated animate__backInDown text-white font-black text-[4vw] font-sans mb-[15vh]"
      >
        请选择你想加入的世界
      </div>
      <div
        class="animate__animated animate__backInUp text-white font-black text-[1vw] font-sans f-c-c w-full"
      >
        <div class="chooseWorld">生存者之乡</div>
        <div class="mx-[3vw] chooseWorld">生存者科技</div>
        <div class="chooseWorld">生存者空岛</div>
      </div>
    </div>
    <div
      class="h-[40vh] bg-[url(@/assets/images/promotionVideo.png)] bg-cover relative"
      style="background-attachment: fixed"
    >
      <div
        class="absolute z-10 wh-full text-white font-black text-[10vw] font-sans flex justify-around items-center opacity-35"
      >
        <div v-for="c in vedioMark" :key="c">{{ c }}</div>
      </div>
      <div class="absolute z-0 wh-full bg-black opacity-35"></div>
      <div class="absolute z-20 wh-full f-c-c">
        <div class="vedioPlay">
          <div class="play"></div>
        </div>
      </div>
    </div>
    <div
      class="h-[50vh] flex-col flex justify-between mx-auto py-[10vh] lg:w-[1024px] xl:w-[1280px] font-sans color-[#3149e7] font-bold"
    >
      <div class="w-full flex">
        <div class="flex justify-between flex-1 text-[17px]">
          <div class="flex-1 flex flex-col">
            <div>Information</div>
            <div class="text-[14px] color-[#bdbdc6] font-normal pt-10">
              <div>Logo & Branding</div>
              <div>Website Development</div>
              <div>Mobile App Development</div>
              <div>Search Engine Optimization</div>
              <div>Pay-Per-Click</div>
              <div>Social Media Marketing</div>
            </div>
          </div>
          <div class="flex-1 flex flex-col">
            <div>Projects</div>
            <div class="text-[14px] color-[#bdbdc6] font-normal pt-10">
              <div>Physical</div>
              <div>Consequences</div>
              <div>Assumenda</div>
              <div>Necessitatibus</div>
              <div>Recusandae</div>
              <div>Quibusdam</div>
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-start items-center flex-col text-[38px]">
          <div>Get it touch!</div>
          <div class="text-[14px] color-[#bdbdc6] font-normal pt-10 pb-20 f-c-c flex-col">
            <p>We design professional looking yet simple websites designs are</p>
            <p>search engine and userfriendly</p>
          </div>
          <div
            class="w-full flex justify-between items-center text-[17px] py-6"
            style="border-bottom: 1px solid #bdbdc6"
          >
            <div>Enter your Email</div>
            <div>-></div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-between text-[14px] color-[#bdbdc6] font-normal">
        <div>渝ICP备2022010679号</div>
        <div>Privacy Policy Terms of Use</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const vedioMark = ref('服务器宣传视频')
</script>

<style lang="scss" scoped>
.bg {
  height: calc(100vh - 60px);
}

.vedioPlay {
  display: flex;
  justify-content: start;
  align-items: center;
  position: absolute;
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 100%;
  z-index: 1;
  border: 1px solid #3149e7;

  &:hover {
    cursor: pointer;
  }

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 121px;
    height: 121px;
    border-radius: 50%;
    background-color: #3149e7;
    transform-origin: center;
    transform: translate(-50%, -50%) scale(0, 0);
    transition: transform 0.45s ease-in-out;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1, 1);
  }

  &:hover .play {
    border-color: transparent transparent transparent white;
  }

  .play {
    margin-left: 50px;
    border-style: solid;
    border-width: 17.32px 0 17.32px 30px;
    border-color: transparent transparent transparent #3149e7;
    transition-property: border-color;
    transition-duration: 1s;
    transition-timing-function: ease;
  }
}

.chooseWorld {
  background-color: #97c0c7;
  padding: 20px 40px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: #3149e7;
    transform-origin: center;
    transform: translate(-50%, -50%) scale(0, 0);
    transition: transform 0.45s ease-in-out;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(15, 15);
  }
}
</style>
