<template>
    <!-- <q-card > -->
        <q-btn @click.prevent="openDialog = true" 
          fab
          padding="xs" 
          color="green"
          icon="add"
          class="absolute"
          style="top: 1; right: 12px; transform: translateY(-50%);"
        /> 

        <q-dialog v-model="openDialog" class="q-mx-lg " >
            <q-card style="  border-radius: 30px;">
                <h6 class="q-py-none q-my-xs text-center">{{$t('addCategory')}}</h6>
                
                <FormCategory :category="store.state.category" :pickFile="pickFile"
                    :submitForm="store.methods.addCategory" >
                </FormCategory>
            </q-card>
        </q-dialog>
    <!-- </q-card> -->
</template>

<script>
import FormCategory from 'src/components/FormCategory.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
  components: { FormCategory },
    setup() {

        const store = inject('store')

        function pickFile () {
            let file = store.state.category.file
            if (file ) {
                let reader = new FileReader
                reader.onload = e => {
                    store.state.category.file = e.target.result
                }
                reader.readAsDataURL(file)
                // file = URL.createObjectURL(file)
                // store.state.category.file = URL.createObjectURL(file)
            }
        }
  
        return {
            // category,
            pickFile,
            openDialog: ref(false),
            store
        }
    }
}
</script>

