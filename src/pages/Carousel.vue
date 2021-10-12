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
              <q-responsive :ratio="16/9" style="width: 100%; max-width: 100%;">
                <q-carousel 
                  animated
                  swipeable
                  v-model="slide"
                  arrows
                  infinite
                  
                  >
                    <q-carousel-slide v-for="(image, index) in recip.files" :key="index"
                        :name="index + 1" :img-src="image"  class="uncropped-imag"/>                       
                </q-carousel>
              </q-responsive>
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

<style scoped>
  .uncropped-image {
    background-size: contain;  /* don't crop the image  */
    background-repeat: no-repeat;  /* only show the image one time  */
    background-color: grey;  /* color to fill empty space with  */
  }
</style>