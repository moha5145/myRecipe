<template>
     <!-- Add recip Btn -->
  <q-page-sticky position="bottom" :offset="[18, 18]" 
        v-if="$route.path == '/' || $route.path == '/' + category_slug" >

      <q-btn to="/add-recip" fab icon="add" @click.prevent="openDialog = true"
        size="20px"
        :style="{'background-color': store.state.themeColor, 'color': 'white'}" />
  </q-page-sticky>

  <q-dialog v-model="openDialog" class="q-mx-lg " >
    <q-card class="q-mt-lg q-mx-none q-px-none" style="border-radius: 30px">

        <FormRecipe
            :recip="store.state.recip" 
            :category="category"
            :pickFile="pickFile"
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
        
        function pickFile () {
            let file = store.state.recip.file
            if (file ) {
                let reader = new FileReader
                reader.onload = e => {
                    store.state.recip.file = e.target.result
                }
                reader.readAsDataURL(file)
                // store.state.recip.file = URL.createObjectURL(file)
            }
        }

        const router = useRouter()

        function reDirect() {
            
            router.go(-1)
        }


        return {
            store,
            pickFile,
            reDirect,
            openDialog: ref(false)
        }
    },
}
</script>