<template>
    <q-page class="row justify-center">
        <q-card bordered style="border-radius: 30px" class="q-px-none q-mx-none"
                :style="{'border-color': store.state.themeColor}" >
                
            <q-form @submit.prevent="submitForm(recip, $route.path == '/' ? recip.model :category)" 
                :style="{'background-color': store.state.themeColor}"
                class="my-form q-mt-none white-text q-mb-xl q-mx-none q-px-none" >

                <q-select v-if="$route.path == '/'"
                    :options="store.getters.nested(store.getters.categorysAndRecips())"
                    v-model="recip.model"
                    emit-value
                    :label="$t('category')"
                    dark
                    :style="{'color': store.state.themeColor}"
                    class="q-mx-md"
                    :rules="[store.methods.required('Category')]"
                />
               
                <q-input v-model="recip.title" 
                    rounded filled dark 
                    :label="$t('title')" 
                    class="text-white"
                    :style="{'color': store.state.themeColor}"
                    :rules="[
                            store.methods.required('title'),
                            store.methods.duplicateName('title'),
                            store.methods.minLength('Title', 2)
                        ]"
                        @update:modelValue="store.methods.toUppercaseRecip(recip), store.methods.isSameRecip(recip)">
                    <template v-slot:prepend>
                        <q-icon name="dinner_dining" />
                    </template>
                </q-input>
                

                <q-file
                    v-model="recip.file"
                    ref="fileInput"
                    :label="$t('pickImage')"
                    filled
                    dark
                    max-files="3"
                    append
                    use-chips
                    @change="pickFile"
                    >
                    <template v-slot:prepend>
                        <q-icon name="add_photo_alternate" />
                    </template>
                </q-file>
    

                <q-img v-if="recip.file" :src="recip.file"></q-img>

                <div v-for="(ingredient, index) in recip.ingredients" :key="index" dark>
                
                    <q-input filled dark v-model="recip.ingredients[index]" :label="$t('ingrediant')">
                        
                
                        <template v-slot:append>
                            <q-btn round dense flat icon="delete" @click="deleteIngredent(ingredient)"/>
                        </template>
                    </q-input>
                </div>

                <q-input filled dark v-model="recip.another" :label="$t('ingrediant')">
                    <template v-slot:prepend>
                        <q-icon name="dinner_dining" />
                    </template>

                    <template v-slot:append>
                        <q-btn round dense flat icon="add" @click="addIngrediant"/>
                    </template>
                </q-input>
            
                <q-input filled dark type="textarea" v-model="recip.descriptions" :label="$t('descriptions')">
                    <template v-slot:prepend>
                        <q-icon name="description" />
                    </template>
                </q-input>
            
                <q-page-sticky position="bottom" :offset="[18, 18]" class="q-mt-lg ">
                    <q-btn-group rounded v-if="$route.path == '/'">
                        <q-btn @click="reDirect()" v-close-popup size="xl" fab dark
                                class="bg-white" :style="{'color': store.state.themeColor}">  
                            <q-icon name="backspace" class="q-pr-sm"></q-icon>
                            {{$t('cancel')}}
                        </q-btn>

                        <q-btn v-if="recip.title.length >= 2 && !store.state.isDuplicateName && recip.model" 
                            @click="$emit('closeDialog')"
                            type="submit" v-close-popup size="xl" fab 
                            class="" :style="{'background-color': store.state.themeColor, 'color': 'white'}"> 
                            <q-icon name="save" class="q-pr-sm"></q-icon>
                            {{$t('save')}}
                        </q-btn>
                    </q-btn-group>

                    <q-btn-group rounded v-else>
                        <q-btn v-close-popup size="xl" fab dark
                                class="bg-white" :style="{'color': store.state.themeColor}">  
                            <q-icon name="backspace" class="q-pr-sm"></q-icon>
                            Cancel
                        </q-btn>
                        
                        <q-btn v-if="recip.title.length >= 2 && !store.state.isDuplicateName" 
                            @click="$emit('closeDialog')" type="submit" size="xl" fab 
                            class="" :style="{'background-color': store.state.themeColor, 'color': 'white'}"> 
                            <q-icon name="save" class="q-pr-sm"></q-icon>
                            Save 
                        </q-btn>                       
                    </q-btn-group>
                </q-page-sticky>
            </q-form>
        </q-card>

    </q-page>
</template>

<script>
import { inject, ref } from '@vue/runtime-core'
// import ImageUploader from 'vue-image-upload-resize'
export default {
    components: {
        // ImageUploader
    },
    props: ["recip", "submitForm", "pickFile", 
            "deleteIngredent", "addIngrediant", 
            'reDirect', 'categorySlug', 'category', 'category_slug', 'closeDialog'],
    setup(props) {
        const store = inject('store')

        return {
            store,
            model: ref(null)
        }
    }
    
}
</script>
<style scoped>
    .my-form {
        border-radius: 28px;
        min-width: 360px;
        max-width: 600px;
    }

    .imagePreviewWrapper {
        width: 250px;
        height: 250px;
        display: block;
        cursor: pointer;
        margin: 0 auto 30px;
        background-size: cover;
        background-position: center center;
    }

</style>