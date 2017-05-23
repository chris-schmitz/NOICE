<template>
  <div id="app">
    <section class="words">
      <div class="word" v-for="wordData in words">
        <letter-activator v-for="(letter, position) in wordData.word.split('')" :word-id="wordData.id" :activation-key="position" :letter="letter">
          <span class='letter'>{{letter}}</span>
        </letter-activator>
      </div>
    </section>
    <section class="patterns">
      <button>Each letter then flash</button>

    </section>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  import LetterActivator from './components/LetterActivator'
  import {mapState} from 'vuex'

  export default {
    components: {LetterActivator},
    store,
    computed: {
      ...mapState('activators', {
        words: state => state.words
      })
    }
  }
</script>

<style lang="scss" scoped>

  #app {
    height: 80vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
    // align-items: stretch;
    > section {
      border: 1px solid orangered;
      flex: 1;
      display: flex;

      &.words {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > .word {
          display: flex;
          // margin-bottom: 10px;
          > * {
            background-color: orangered;
            margin:2px;
            color: white;
            font-weight: bold;
            width: 40px;
            padding: 30px;
            user-select: none;

            &:hover {
              background-color: red;
            }
            &:active {
              background-color: orange;
              transform: scale(.95);
            }
          }
        }
      }
    }
  }

</style>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    font-size: 40px;
    justify-content: center;
    text-align: center;
  }
</style>
