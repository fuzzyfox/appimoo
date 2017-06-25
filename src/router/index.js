import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import ArtistListView from '@/views/ArtistListView'
import ArtistView from '@/views/ArtistView'
import FolderListView from '@/views/FolderListView'
import FolderView from '@/views/FolderView'
import DeviationView from '@/views/DeviationView'
import DebugView from '@/views/DebugView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/artists',
      name: 'Artists',
      component: ArtistListView
    },
    {
      path: '/artists/:userid',
      name: 'Artist',
      component: ArtistView
    },
    {
      path: '/folders',
      name: 'Folders',
      component: FolderListView
    },
    {
      path: '/folders/:folderid',
      name: 'Folder',
      component: FolderView
    },
    {
      path: '/wallpaper/:deviationid',
      name: 'Deviation',
      component: DeviationView
    },
    {
      path: '/debug',
      name: 'Debug',
      component: DebugView
    }
  ]
})
