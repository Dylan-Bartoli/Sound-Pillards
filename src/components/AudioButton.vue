<template>
  <div class="audioButton">
    <button v-if="!playFlag" @click="onPlay()">PLAY</button>
    <button v-if="playFlag" @click="onPause()">PAUSE</button>
  </div>
</template>

<script>
import SoundReactor from '../classes/SoundReactor'

export default {
  name: 'AudioButton',
  data() {
    return {
      initFlag: false,
      playFlag: false,
    }
  },
  methods: {
    onPlay() {
      if (!this.initFlag) {
        this.initFlag = true
        SoundReactor.init()
      }

      SoundReactor.play()
      this.playFlag = true
    },
    onPause() {
      SoundReactor.pause()
      this.playFlag = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.audioButton {
    position : absolute;
    bottom : 100px;
    right : 50px;

    button {
        padding : 15px 30px;

        border : 1px solid hsl(74, 100%, 85%);
        border-radius : 25px;

        background-color : transparent;
        color : hsl(74, 100%, 85%);

        line-height : 1;
        width : 100px;
        height : 50px;

        transition : all .25s;

        &:hover {
          background-color : hsl(74, 100%, 85%);
          color : black;
        }
    }
}
</style>
