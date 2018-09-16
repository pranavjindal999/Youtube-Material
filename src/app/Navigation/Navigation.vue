<template>
  <v-navigation-drawer
    :value="$store.state.drawer"
    @input="updateDrawerState"
    width="200"
    fixed
    clipped
    app
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('home') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">trending_up</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('trending') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">music_video</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('music') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">movie</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('movies') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">directions_run</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('sports') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">devices_other</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('technology') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">insert_emoticon</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('comedy') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="youtubeRed">info_outline</v-icon>
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
