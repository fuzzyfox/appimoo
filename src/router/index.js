import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import { UI_CLEAR_HEADER_TITLE_OVERRIDE } from '@/store/mutation-types'

import Hello from '@/components/Hello'

import ArtistListView from '@/views/ArtistListView'
import ArtistView from '@/views/ArtistView'

import FolderListView from '@/views/FolderListView'
import FolderView from '@/views/FolderView'

import TagListView from '@/views/TagListView'
import TagView from '@/views/TagView'

import DeviationView from '@/views/DeviationView'
import DebugView from '@/views/DebugView'

import SmartCropView from '@/views/SmartCropView'

Vue.use(Router)

const router = new Router({
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
      path: '/tags',
      name: 'Tags',
      component: TagListView
    },
    {
      path: '/tags/:tagName',
      name: 'Tag',
      component: TagView
    },
    {
      path: '/wallpaper/:deviationid',
      name: 'Deviation',
      component: DeviationView
    },
    {
      path: '/wallpaper/:deviationid/smartcrop',
      name: 'SmartCrop',
      component: SmartCropView
    },
    {
      path: '/debug',
      name: 'Debug',
      component: DebugView
    }
  ]
})

router.afterEach(() => store.commit(UI_CLEAR_HEADER_TITLE_OVERRIDE))

export default router
