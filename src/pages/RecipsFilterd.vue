<template>
  <q-page class=" flex justify-center">
    <div v-for="recip in store.getters.filteredRecipe('/' + category_slug)" :key="recip"
          class=" q-mt-lg row   items-start content-start " 
          style="overflow: hidden;">
          {{store.getters.categorysAndRecips}}
          <Recip :recip="recip" class="col " style=""> </Recip>
          
    </div>
  </q-page>
</template>

<script>
import { inject, ref } from 'vue';
import Recip from './Recip.vue';

export default {
  components: { Recip },
  name: 'PageIndex',
  props: ['category_slug'],
  setup() {
    const store = inject('store')

    return {
      tab: ref('entre'),
      store
    }
  }
  
}
</script>

