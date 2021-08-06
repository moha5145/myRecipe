<template>

    <q-fab-action padding="3px"   
        color="red"  
        icon="delete" 
        @click.prevent="confirm = true"> 
    
    </q-fab-action>

    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm text-grey">Are you sure you want delete {{category.label}} and all recips in this category ?.</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="cancel" v-close-popup 
                    :style="{'color': store.state.themeColor}"/>
                <q-btn flat label="delete" @click="store.methods.deleteCategory(category, recips)" :to="'/'"
                    color="red"/>
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>

<script>
import { inject, ref } from 'vue'

    export default {
        props: ['recip', 'category', 'recips'],
        setup() {
            const store = inject('store')
            const confirm = ref(false)

            return {store, confirm}
        }
    }
</script>