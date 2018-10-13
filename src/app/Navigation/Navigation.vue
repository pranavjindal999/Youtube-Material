<template>
  <v-navigation-drawer
    :value="$store.state.drawer"
    @input="updateDrawerState"
    width="200"
    fixed
    clipped
    app
  >
    <v-list subheader="">
      <v-list-tile 
        @click="sendNavigationGA('home')"
        :to="homeRoute" 
        exact>
        <v-list-tile-action>
          <v-icon color="vTyoobRed">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('home') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile 
        @click="sendNavigationGA('trending')"
        :to="trendingRoute" 
        exact>
        <v-list-tile-action>
          <v-icon color="vTyoobRed">trending_up</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('trending') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-subheader>Top Categories</v-subheader>

      <v-list-tile 
        @click="sendNavigationGA(category.labelKey)"
        :to="category.route" 
        :key="$index"
        v-for="(category, $index) in categories"
        exact>
        <v-list-tile-action>
          <v-icon color="vTyoobRed">{{ category.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t(category.labelKey) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider/>
      <v-list-tile 
        @click="sendNavigationGA('about')"
        :to="aboutRoute" 
        exact>
        <v-list-tile-action>
          <v-icon color="vTyoobRed">info_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('about') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
    </v-list>
  </v-navigation-drawer>
</template>





home
trending_up
music_video
movie
directions_run
devices_other
insert_emoticon
school
info_outline




<script>
import Navigation from "./Navigation.ts";
export default Navigation;
</script>
