<template>
    
  <div v-if="store.state.recips">
    <div v-for="category in store.getters.nested(store.getters.categorysAndRecips())" 
      :key="category" class="" >
      
      <Recips v-if="$route.path == '/'" :category="category" :category_slug="category_slug"></Recips>
      <Category v-else :category="category" :category_slug="category_slug"></Category>
  </div>
  </div>
          
</template>
 
<script>
import { inject } from 'vue';
import Recip from 'src/pages/Recip.vue';
import Recips from '../Recips.vue';
import Category from 'src/pages/category/Category.vue';

export default {
  components: { Recip, Recips, Category },
  props:['category_slug'],
  name: 'PageIndex',
  setup() {
    const store = inject('store')

    return {
      store
    }
  }
}
</script>
