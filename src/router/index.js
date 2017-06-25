import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import FolderListView from '@/views/FolderListView'
import FolderView from '@/views/FolderView'
import TagListView from '@/views/TagListView'
import TagView from '@/views/TagView'
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
      path: '/debug',
      name: 'Debug',
      component: DebugView
    }
  ]
})
