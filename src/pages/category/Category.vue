<template>
  <!-- <q-page class=" flex  justify-around wrap items-start"> -->
    <div v-if="$route.params.category_slug == category.slug"
          class="flex justify-center">

      <div v-for="recip in filteredRecipes()" :key="recip"
          transition="flip-right"
          class="q-mt-lg row  wrap  content-start " 
          style="overflow: hidden;">

          <Recip :recip="recip"></Recip>
          <!-- <Recips :recip="recip"></Recips> -->
      </div>
    </div>
      
  <!-- </q-page> -->
</template>

<script>
import { inject } from '@vue/runtime-core'
import Recip from '../Recip.vue'

export default {
  components: { Recip },
    props: ['category', 'category_slug'],
    setup(props) {
      const store = inject("store")

      const filteredRecipes = () => {
        return props.category.recips.filter(recip => {
            return recip.title.toLowerCase().includes(store.state.search.toLowerCase())
        })
      }
      // categorys(payload) {
      //     return state.recips.filter(recip => recip.model == payload)
      // },
      // filteredRecipe(payload) {
      //     return this.categorys(payload).filter(recip => {
      //       return recip.title.toLowerCase().includes(state.search.toLowerCase())
      //     })
      // }

      return {
        filteredRecipes
      }
    },
}
</script>