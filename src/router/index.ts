import { routes } from "./routeNames";
import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/app/HomePage/HomePage.vue";
import SearchResults from "@/app/SearchResults/SearchResults.vue";
import About from "@/app/About/About.vue";
import ChannelAbout from "@/app/Channel/ChannelAbout/ChannelAbout.vue";
import ChannelChannels from "@/app/Channel/ChannelChannels/ChannelChannels.vue";
import ChannelVideos from "@/app/Channel/ChannelVideos/ChannelVideos.vue";
import ChannelHome from "@/app/Channel/ChannelHome/ChannelHome.vue";
import Channel from "@/app/Channel/Channel.vue";
import Trending from "@/app/Trending/Trending.vue";
import VideoBar from "@/app/VideoBar/VideoBar.vue";

Vue.use(Router);

const $router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      name: routes.home.name,
      path: "/",
      component: HomePage
    },
    {
      name: routes.trending.name,
      path: `/trending/:${routes.trending.params.category}?`,
      component: Trending,
      props: true
    },
    {
      name: routes.search.name,
      path: `/search/:${routes.search.params.query}`,
      component: SearchResults,
      props: true
    },
    {
      name: routes.video.name,
      path: `/video/:${routes.video.params.id}`
    },
    {
      name: routes.channel.name,
      path: `/channel/:${routes.channel.params.id}/`,
      redirect: { name: routes.channel.children.home.name },
      props: true,
      component: Channel,
      children: [
        {
          name: routes.channel.children.home.name,
          path: ``,
          component: ChannelHome
        },
        {
          name: routes.channel.children.videos.name,
          path: "videos",
          component: ChannelVideos,
          props: true
        },
        {
          name: routes.channel.children.channels.name,
          path: "channels",
          component: ChannelChannels
        },
        {
          name: routes.channel.children.about.name,
          path: "about",
          component: ChannelAbout
        }
      ]
    },
    {
      name: routes.about.name,
      path: "/about",
      component: About
    },
    {
      path: "*",
      redirect: { name: routes.home.name }
    }
  ]
});

export { $router };
