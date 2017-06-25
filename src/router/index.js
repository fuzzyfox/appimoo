import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import FolderListView from '@/views/FolderListView'
import FolderView from '@/views/FolderView'
import DeviationView from '@/views/DeviationView'

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
      path: '/wallpaper/:deviationid',
      name: 'Deviation',
      component: DeviationView
    }
  ]
})
