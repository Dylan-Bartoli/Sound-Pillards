<template>
  <LoadingScene/>
  <ThreeScene/>
  <AudioButton/>
  <TitleSection/>
</template>

<script>
import ThreeScene from './components/ThreeScene.vue'
import AudioButton from './components/AudioButton.vue'
import LoadingScene from './components/LoadingScene.vue'
import TitleSection from './components/TitleSection.vue'

export default {
  name: 'App',
  components: {
    ThreeScene,
    AudioButton,
    LoadingScene,
    TitleSection
  },
}
</script>

<style lang="stylus">
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    font-family: 'Helvetica', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
