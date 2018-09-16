<template>
  <v-toolbar
    color="youtubeRed"
    dense
    fixed
    dark
    clipped-left
    :height="64"
    app
  >
    <v-toolbar-side-icon @click="$store.commit('toggleDrawer')"/>
    <img 
      class="logo" 
      src="@/assets/images/logo_white.png">

    <v-form @submit.prevent="searchVideos">
      <v-combobox
        clearable
        class="mx-3"
        no-filter
        :loading="searching"
        :items="searchSuggestions"
        :append-icon="null"
        :search-input.sync="query"
        v-model="searchSelectedValue"
        @input="searchVideos"
        light
        flat
        prepend-inner-icon="search"
        hide-no-data
        hide-details
        :label="$t('searchHeaderPlaceholder')"
        solo
      />
    </v-form>
  
  </v-toolbar>
</template>

<style scoped>
.logo {
  height: 42px;
}
</style>


<script>
import Header from "./Header.ts";
export default Header;
</script>
