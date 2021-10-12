<template>
    <div >
       
        <q-btn  @click.prevent="openDialog = true"
                round
                color="orange"
                size="sm"
                icon="edit"
                class="absolute q-my-none"
                style="top: 0; right: 40px; transform: translateY(-50%);" />

        <q-dialog maximized v-model="openDialog" class="q-mx-lg " style="max-width: 410px;">
            <q-card >
                <q-card-actions align="right">
                    <q-btn flat icon="close" v-close-popup 
                        
                        :style="{'color': store.state.themeColor}" />
                </q-card-actions>

                <h5 class="text-center text-grey q-my-sm">Edit Recipe</h5>

                <FormRecipe
                    :recip="recipClon" 
                    :submitForm="store.methods.editRecip" 
                    :pickFile="pickFile" 
                    :addImage="addImage"
                    :deleteImage="deleteImage"
                    :deleteIngredent="deleteIngredent"
                    :addIngrediant="addIngrediant"
                    class="q-mt-xs q-pt-xs"
                    :style="{'border-color': store.state.themeColor}"
                    :reDirect="reDirect"
                    @closeDialog="openDialog = false">
                </FormRecipe>

            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    
    import { ref } from '@vue/reactivity'
    import { inject } from '@vue/runtime-core'
    import FormRecipe from 'src/components/FormRecipe.vue'
    import { useRouter } from 'vue-router'
export default {
    components: {FormRecipe},
    props: ["recip", "recip_slug"],
    setup(props) {
        const store = inject("store")
        const openDialog = ref(false)
        const recipClon = ref({...props.recip})
        // const router = useRouter()

        function deleteIngredent(ingredient) {
            console.log(recipClon.value.ingredients)
            recipClon.value.ingredients = recipClon.value.ingredients.filter(ing => ing != ingredient)
        }

        // function pickFile () {
        //     console.log('edit', recipClon.value.files)
        //     let file = ref(recipClon.value.file)
        //     if (file.value ) {
        //         let reader = new FileReader
        //         reader.onload = e => {
        //             recipClon.value.file = e.target.result
        //         }
        //         reader.readAsDataURL(file.value)
        //     }
        // }

        function pickFile (e) {
            let file = ref(e.target.files[0])
            let reader = new FileReader
            reader.onload = e => {
                recipClon.value.image = e.target.result
            }
            reader.readAsDataURL(file.value)
        }

        function deleteImage(payload) {
            return recipClon.value.files = recipClon.value.files.filter(file => file != payload)
        }

        function addImage() {
            recipClon.value.files.push(recipClon.value.image);
            // store.state.recip.imageUrl = null;
            recipClon.value.image = null;
        }

        function addIngrediant() {
            recipClon.value.ingredients.push(recipClon.value.another)
            recipClon.value.another = ''
        }

        function reDirect() {
            // router.push("'/' + props.recip.model.slug")
            // router.go(-1)
        }

        return {
            store,
            openDialog,
            recipClon,
            pickFile,
            addImage,
            deleteImage,
            addIngrediant,
            deleteIngredent,
            reDirect
        }
    }
}
</script>