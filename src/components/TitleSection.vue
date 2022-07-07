<template>
  <div class="titleSection">
    <h1>
        Sound Pillards.
    </h1>
    <h2>
        A project by @Dylan Bartoli following the course of @Marius Ballot.
    </h2>
  </div>
</template>

<script>

export default {
  name: 'TitleSection',
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.titleSection {
    position : absolute;
    top : 0;
    left:  0;

    padding : 15px

    max-width : 400px;

    color : hsl(74, 100%, 85%)
    h1 {
        margin-bottom : 1ex;
    }
    h2 {
        color : white;
        font-size : 16px;
    }
}
</style>
