<template>

    <q-fab-action padding="3px"  color="orange" @click="openDialog = true" icon="edit"  />

    <q-dialog persistent v-model="openDialog" class="q-mx-lg " 
                >
        <q-card style="  border-radius: 30px;">
            <h6 class="q-py-none q-my-xs text-center">Edit Category</h6>
            <FormCategory :category="category" :pickFile="pickFile"
                :submitForm="store.methods.editCategory" ></FormCategory>
        </q-card>
    </q-dialog>
</template>

<script>
import FormCategory from 'src/components/FormCategory.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
  components: { FormCategory },
        props: ['category'],
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
    },
}
</script>

