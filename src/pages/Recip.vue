<template>
  <q-btn flat 
        :to="{name: 'RecipDetail', params: {recip_slug: recip.slug}}"
        class="text-grey q-py-none q-mt-none"
        style="border-radius: 20px"> 
      
    <q-card v-if="recip" flat 
            bordered
            class="my-card q-my-none q-py-none col cursor-pointer " 
            style="max-width: 420px; min-width: 340px; border-radius: 20px;" 
            :style="{'border-color': store.state.themeColor}">
        <q-img v-if="recip.file" :src="recip.file" height="120px"
              style="max-width: 420px"/>
        <q-img v-else src="../../public/images/placeholder.png" height="120px" style="max-width: 420px"/>
       
        <q-card-section>
          
          <EditRecip :recip="recip" ></EditRecip>

          <DeleteRecip :recip="recip" ></DeleteRecip>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis q-my-none q-py-none">
              {{ recip.title}}
            </div>

          </div>
            <div v-for="ingredient in recip.ingredients" :key="ingredient"
            class=" chip">
              <q-chip class="">{{ ingredient }}</q-chip>      
          </div>
        </q-card-section>
    </q-card>
  </q-btn>
    
</template>

<script>
import {  inject} from 'vue'
import EditRecip from './EditRecip.vue'
import DeleteRecip from './DeleteRecip.vue'
import { useRouter } from 'vue-router'

export default {
  components: { EditRecip, DeleteRecip },
  
  props: ['recip', 'category_slug'],
    setup() {
      const store = inject('store')

      const router = useRouter()
      function reDirect() {
                
                router.go(-1)
            }

    return {
      store,
      reDirect
    }
  }
}
</script>


<style scoped>
  .my-card {
    /* border-radius: 20px; */
    /* max-width: 390px */
  }
  .chip {
    display: inline-block;
    
  }
</style>
