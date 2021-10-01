<template>

  <q-tabs  v-if="$route.path !== '/recip-detail/' + recip_slug"
          class="q-mt-sm q-pb-none"
          flat
          shrink
          stretch  
        >
      
    <q-route-tab v-for="category in store.state.categorys" 
        :key="category.slug"
        class="q-mx-xs q-px-none" 
        :to="'/' + category.slug" >
          
        <AddRecip :category_slug="category.slug" :category="category"></AddRecip>  

      <q-fab v-if="category.label != 'ALL' && 
            category.label != 'ENTRES' && 
            category.label != 'PLATS' &&
            category.label != 'DESERTS'" 
            @click.prevent
            v-model="category.fab"
            icon="keyboard_arrow_right"
            direction="left"
            padding="xs"
            class="absolute bg-white text-grey"
            style="top: 0; right: 3px; transform: translateY(0%);">

          <DeleteCategory :category="category"></DeleteCategory>
          <EditCategory :category="category"></EditCategory>         
      </q-fab>
      <q-img v-if="category.file"
          :src="category.file"
          height="75px" width="120px"  
          style="max-width: 130px">
        <div class="absolute-bottom text-subtitle1 text-center" style="height: 30%">
            <span class="absolute-bottom ">{{ category.label }}</span>
        </div>
      </q-img>

      <q-img v-else src="../../public/images/placeholder.png" height="75px" width="120px"
              style="max-width: 130px">

              <div class="absolute-bottom text-subtitle1 text-center" style="height: 30%">
            <span class="absolute-bottom ">{{ category.label }}</span>
        </div>
      </q-img>
            
    </q-route-tab>
  </q-tabs>

    <AddCategory v-if="$route.path !== '/recip-detail/' + recip_slug "></AddCategory>
</template>

<script>
import { inject, ref } from '@vue/runtime-core'
import AddCategory from 'src/pages/category/AddCategory.vue'
import DeleteCategory from 'src/pages/category/DeleteCategory.vue'
import EditCategory from 'src/pages/category/EditCategory.vue'
import AddRecip from 'src/pages/AddRecip.vue'
export default {
  components: { AddCategory, DeleteCategory, EditCategory, AddRecip },
  props: ['recip_slug'],
  setup() {
    const store = inject('store')

    return {
      fab: ref(false),
      store
    }
  },
}
</script>