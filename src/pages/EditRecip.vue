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

                <FormRecipe
                    :recip="recipClon" 
                    :submitForm="store.methods.editRecip" 
                    :pickFile="pickFile" 
                    :deleteIngredent="deleteIngredent"
                    :addIngrediant="addIngrediant"
                    class="q-mt-xs q-pt-xs"
                    :style="{'border-color': store.state.themeColor}"
                    :reDirect="reDirect">
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

        function pickFile () {
            let file = ref(recipClon.value.file)
            if (file.value ) {
                let reader = new FileReader
                reader.onload = e => {
                    recipClon.value.file = e.target.result
                }
                reader.readAsDataURL(file.value)
            }
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
            addIngrediant,
            deleteIngredent,
            reDirect
        }
    }
}
</script>