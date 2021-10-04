<template>
    <!-- <q-btn @click.prevent="openDialog = true"
        push round dense color="white" text-color="primary"
        
      /> -->

    <q-dialog v-model="store.state.carouselDialog" :maximized="maximizedToggle" class="q-mx-lg " >
      
        <div class="q-pa-md">
          
          <div class="row">
            <q-space />
            <q-btn icon="close " flat round dense v-close-popup color="white"
              style="top: 0; right: 0px; transform: translateY(-5%);"/>
          </div>
              
            <q-carousel 
              animated
              v-model="slide"
              arrows
              infinite
              height="90vh"
              >
                <q-carousel-slide v-for="(image, index) in recip.files" :key="index"
                    :name="index + 1" :img-src="image"  />                       
            </q-carousel>
      </div>
    </q-dialog>
</template>




<script>
import { inject, ref } from 'vue'

export default {
  props: ['recip'],
  setup () {

    const store = inject('store')
    return {
      slide: ref(1),
      openDialog: ref(false),
      maximizedToggle: ref(true),
      store
    }
  }
}
</script>