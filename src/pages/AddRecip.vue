<template>
     <!-- Add recip Btn -->
  <q-page-sticky position="bottom" :offset="[18, 18]" 
        v-if="$route.path == '/' || $route.path == '/' + category_slug" >

      <q-btn to="/add-recip" fab icon="add" @click.prevent="openDialog = true"
        size="20px"
        :style="{'background-color': store.state.themeColor, 'color': 'white'}" />
  </q-page-sticky>

  <q-dialog v-model="openDialog"  :maximized="maximizedToggle" class="q-mx-none q-px-xl " >
    <q-card class="q-mt-lg q-mx-none q-px-none" style="border-radius: 30px">

         <q-card-actions align="right">
            <q-btn flat icon="close" v-close-popup 
                
                :style="{'color': store.state.themeColor}" />
        </q-card-actions>

        <h5 class="text-center text-grey q-my-sm">Add Recipe</h5>

        <FormRecipe
            :recip="store.state.recip" 
            :category="category"
            :pickFile="pickFile"
            :addImage='addImage'
            :deleteImage='deleteImage'
            :deleteIngredent="store.methods.deleteIngredent"
            :addIngrediant="store.methods.addIngrediant"
            :submitForm="store.methods.addRecip" 
            :reDirect="reDirect"
            @closeDialog="openDialog = false"
            >

        </FormRecipe>
    </q-card>
  </q-dialog>
</template>

<script>
    import { inject, ref } from '@vue/runtime-core'
    import FormRecipe from 'src/components/FormRecipe.vue'
    import { useRouter } from 'vue-router'
export default {
    components:{FormRecipe},
    props: ['recip_slug', 'category', 'category_slug'],
    setup() {
        const store = inject('store')
        const image = ref(null)
        /**const imageUrl =ref (null)**/
        
        function pickFile (e) {
            let file = ref(e.target.files[0])
            let reader = new FileReader
            reader.onload = e => {
                store.state.recip.image = e.target.result
            }

            reader.readAsDataURL(file.value)   
        }

        function addImage() {
            store.state.recip.files.push(store.state.recip.image);
            // store.state.recip.imageUrl = null;
            store.state.recip.image = null;
        }

        function deleteImage(payload) {
            return store.state.recip.files = store.state.recip.files.filter(file => file != payload)
        }

        const router = useRouter()

        function reDirect() {
            
            router.go(-1)
        }


        return {
            store,
            pickFile,
            addImage,
            deleteImage,
            reDirect,
            openDialog: ref(false),
            maximizedToggle: ref(true)
        }
    },
}
</script>