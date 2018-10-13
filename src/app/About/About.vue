<template>
  <v-container 
    fluid 
    grid-list-lg>
    <Helmet :title="$t('about')"/>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">About vTyoob</h3>
          <br>
          <span>
            Hi. I'm Pranav Jindal. <br>
            This project is my naïve attempt aimed at making
            a simple Material version of YouTube using Google APIs, VueJS and Vuetify. <br>
            I make this project in my leisure time just to improve my front-end skills. <br>
            <br>
            <span class="font-italic">
              This project was previously written in AngularJS and now has been moved to VueJS.
            </span>
            <br>
          </span>
          <br>
          <span>
            The code for the project can be found at
            <a 
              target="_blank" 
              href="https://github.com/pranavjindal999/Youtube-Material/tree/vuetube">
              Github
            </a> 
          </span>
          <br>
          <br>
          <span>Feel free to contact me via any of the following media.</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-layout 
          class="my-4"
          row 
          justify-center>
          <v-tooltip 
            :key="$index" 
            v-for="(item, $index) in socials" 
            bottom>
            <v-btn 
              slot="activator" 
              outline 
              fab 
              small
              class="mx-2"
              :href="item.href"
              target="_blank"
              color="primary">
              <v-progress-circular 
                class="ma-2" 
                indeterminate 
                :width="1" 
                size="22" 
                v-if="isIconLoading"/>
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
            <span>{{ item.label }}</span>
          </v-tooltip>
        </v-layout>
      </v-card-actions>
      <v-divider/>
      <v-layout 
        align-center 
        justify-center
        row>
        <a 
          target="_blank" 
          href="https://developers.google.com/youtube/v3/">
          <img 
            class="developed-yt" 
            src="@/assets/images/developed-with-youtube.png">
        </a>
      </v-layout>
      <v-layout 
        align-center 
        justify-center
        row>
        <a 
          class="mb-3" 
          target="_blank" 
          href="https://vuejs.org/">
          <img 
            class="logo-height mx-3" 
            src="@/assets/images/vue-logo.svg">
        </a>
        <a 
          class="mb-3" 
          target="_blank" 
          href="https://www.typescriptlang.org/">
          <img 
            class="logo-height mx-3" 
            src="@/assets/images/ts-logo.svg">
        </a>
        <a 
          class="mb-3" 
          target="_blank" 
          href="https://vuetifyjs.com/">
          <img 
            class="logo-height mx-3" 
            src="@/assets/images/vuetify-logo.svg">
        </a>
        <a 
          class="mb-3" 
          target="_blank" 
          href="https://www.netlify.com">
          <img 
            class="logo-height mx-3" 
            src="@/assets/images/netlify-logo.svg">
        </a>
      </v-layout>
    </v-card>
    
  </v-container>
</template>

<style scoped>
.developed-yt {
  max-height: 100px;
}
.logo-height {
  max-height: 30px;
}
</style>

<script>
import About from "./About.ts";
export default About;
</script>
