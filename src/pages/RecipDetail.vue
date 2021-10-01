<template>
  <div class="col column justify-center items-center q-mt-lg">
    <q-card flat 
            v-if="recip"
            v-ripple
            @click="store.state.carouselDialog = true"
            bordered
            height="800px"
            class="my-card q-my-sm q-mx-none q-px-none" 
            style="min-width: 360px; max-width: 520px; border-radius: 20px; cursor: pointer" 
            :style="{'border-color': store.state.themeColor}
             ">
          
            <q-img v-if="recip.files" :src="recip.files[0]" height="260px"
              style="width: 100%" >
              <q-btn 
                @click="reDirect()"
                fab
                size="sm"
                class="q-ma-md absolute all-pointer-events" 
                icon="arrow_back"
                :style="{'background-color': store.state.themeColor, 'color': 'white'}">
              </q-btn>

              <carousel :recip="recip"></carousel>
            </q-img>
            
        
        <q-img v-else src="../../public/images/placeholder.png" height="160px" 
              style="max-width: 420px">
          <q-btn 
            @click="reDirect()"
            fab
            size="sm"
            class="q-ma-md absolute all-pointer-events" 
            icon="arrow_back"
            :style="{'background-color': store.state.themeColor, 'color': 'white'}">
          </q-btn>
        </q-img>

        <q-card-section>
          <EditRecip :recip="recip"></EditRecip>

          <DeleteRecip :recip="recip"></DeleteRecip>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ recip.title}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{$t('ingrediant')}}
          </div>

          <div v-for="ingredient in recip.ingredients" :key="ingredient"
            class=" chip">
              <q-chip class="">{{ ingredient }}</q-chip>      
          </div>
          <div class="text-caption text-grey q-mt-md" max-width="200px">
            <p>{{ recip.descriptions }}</p>
          </div>
        </q-card-section>

    </q-card>
    </div>
</template>

<script>
import {  computed, inject, ref} from 'vue'
import EditRecip from './EditRecip.vue'
import { useRouter } from 'vue-router'
import DeleteRecip from './DeleteRecip.vue'
import Carousel from './Carousel.vue'

export default {
  components: { EditRecip, DeleteRecip, Carousel },
  
  props: ['recip_slug'],
    setup(props) {
        const store = inject('store')
        const router = useRouter()

         function reDirect() {
            
            router.go(-1)
        }
  
       const recip = computed(() => store.state.recips.find(rec => rec.slug === props.recip_slug))

    return {
      store,
      recip,
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