<template>
  <div class="loadingScreen" ref="loadingScreen">LOADING - {{ progress }}%</div>
</template>

<script>
import LoadingController from '../classes/LoadingController'

export default {
  name: 'LoadingScene',
  data() {
    return {
      progress: 0,
    }
  },
  mounted() {
    LoadingController.onProgress = this.onProgress
    LoadingController.onLoad = this.onLoad
  },
  methods: {
    onProgress(url, loaded, total) {
      this.progress = Math.floor((loaded / total) * 100)
    },
    onLoad() {
      this.$refs.loadingScreen.classList.add('finished')
    },
  },
}
</script>

<style scoped lang="stylus">
.loadingScreen{
    width : 100vw;
    height : 100vh;
    background-color : hsl(74, 100%, 85%);
    position : absolute;
    top : 0;
    left : 0;
    z-index 99;

    display : flex;
    align-items : center;
    justify-content : center;

    font-family : 'Helvetica', sans-serif;

    transition : opacity .5s;
}
.finished {
    opacity : 0;
    pointer-events : none;
}
</style>
