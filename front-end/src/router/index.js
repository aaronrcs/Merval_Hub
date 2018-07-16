import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Comics from '@/components/Comics'
import Characters from '@/components/Characters'
import Events from '@/components/Events'
import Creators from '@/components/Creators'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search,
      children: [
        {
          path: 'comics/:index?',
          name: 'comic-search',
          component: Comics,
        },
        {
          path: 'characters/:index?',
          name: 'character-search',
          component: Characters,

        },
        {
          path: 'events/:index?',
          name: 'events',
          component: Events,
        },
        {
          path: 'Creators/:index?',
          name: 'Creators-search',
          component: Creators,
        }
      ]
    }
  ]
})
