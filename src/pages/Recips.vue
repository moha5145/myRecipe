<template>
  <div class="flex justify-center">
    <div v-for="recip in filteredRecipes()" :key="recip"
          class=" q-mt-lg row  wrap  content-start" >
          <Recip :recip="recip" > </Recip>
          
    </div>   
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import Recip from './Recip.vue';

export default {
  components: { Recip },
  name: 'PageIndex',
  props: ['category_slug', 'category'],
  setup(props) {
    const store = inject("store")
      
      const filteredRecipes = () => {
        return props.category.recips.filter(recip => {
            return recip.title.toLowerCase().includes(store.state.search.toLowerCase())
        })
      }

    return {
      tab: ref('entre'),
      store,
      filteredRecipes
    }
  }
  
}
</script>

