import React from "react"
import GameTitle from "./home/GameTitle"
import HomeLayout from "./home/HomeLayout"
import HostForm from "./home/HostForm"
import JoinForm from "./home/JoinForm"
import JoinHostOptions from "./home/JoinHostOptions"

export default function() {
  return (
    <div>
      <HomeLayout>
        <GameTitle />

        <JoinHostOptions />
        <HostForm />
        <JoinForm />
      </HomeLayout>
    </div>
  )
}

/*
<template lang="pug">
.home
  .content
    h1.title(v-if="!showingForm || isMobile")
      span All-Seeing
      span Wizards
    button.back(v-if="showingForm", @click="showingForm = undefined") Back

    join-host-options.options(
      v-if="!showingForm && !isMobile",
      @host="showingForm = 'host'",
      @join="showingForm = 'join'"
    )
    host-form.host(v-if="showingForm === 'host'")
    join-form.join(v-if="showingForm === 'join' || isMobile")
</template>

<script lang="ts">
import Vue from "vue"

import JoinHostOptions from "../components/home/join-host-options.vue"
import HostForm from "../components/home/host-form.vue"
import JoinForm from "../components/home/join-form.vue"

export default Vue.extend({
  components: { JoinHostOptions, HostForm, JoinForm },

  data() {
    return { showingForm: undefined }
  },

  computed: {
    isMobile() {
      return Math.min(window.innerWidth, window.innerHeight) < 600
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../variables";

.home {
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
  height: 100%;
  background-color: $color-dark;
  color: white;
  font-size: 1.25rem;

  .characters.is-desktop {
    display: none;
  }

  .characters.is-mobile {
    width: 25rem;
    max-width: 80%;
    margin-bottom: 2rem;
  }

  .content {
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0 1.5rem;
  }

  .title {
    margin: 0;
    text-align: center;
    font-size: calc(60px + (110 - 60) * ((100vw - 320px) / (600 - 320)));
    font-family: "Luckiest Guy", sans-serif;
    line-height: 0.9;
    text-shadow: 0 0 10em rgba(255, 255, 255, 0.25);
  }

  .title > span:first-child {
    display: block;
    font-size: 49.5%;
    color: $color-primary;
  }

  .join {
    margin-top: 3rem;
  }

  .back {
    border: none;
    padding: 0;
    background: none;
    color: $color-primary;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  @media screen and (min-width: 600px) {
    .title {
      font-size: 110px;
    }
  }

  @media screen and (min-width: 1000px) {
    flex-flow: row;
    justify-content: center;

    .characters.is-mobile {
      display: none;
    }

    .characters.is-desktop {
      display: block;
      height: 35rem;
      margin-top: 1rem;
    }

    .content {
      width: 42rem;
    }

    .title {
      text-align: left;
      font-size: 9rem;
    }

    .host,
    .join {
      margin-top: 0;
    }

    .options {
      margin-top: 2rem;
    }
  }
}
</style>
*/
