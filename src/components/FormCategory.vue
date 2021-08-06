<template>
    <q-page class="row justify-center" >
        <q-card bordered style="border-radius: 30px" class="q-px-none q-mx-none"
                :style="{'border-color': store.state.themeColor}" >
                
            <q-form @submit="submitForm(category), toSlug()" 
                style="border-radius: 30px;"
                :style="{'color': store.state.themeColor}"
                class="my-form q-mt-none q-mx-none q-px-none">

                <q-input v-model="category.label" 
                        rounded filled
                        :label="$t('title')" class=" no-caps"
                        :style="{'text-color': store.state.themeColor}"
                        :rules="[
                            store.methods.required($t('title')),
                            store.methods.duplicateName($t('title')),
                            store.methods.minLength($t('title'), 2)
                        ]"
                        @update:modelValue="store.methods.toUppercase(category), store.methods.isSameCategory(category)"
                    >
                    <template v-slot:prepend>
                        <q-icon name="dinner_dining" :style="{'color': store.state.themeColor}"/>
                    </template>
                </q-input>

                <q-file
                    v-model="category.file"
                    ref="fileInput"
                    :label="$t('pickImage')"
                    filled
                    max-files="3"
                    append
                    use-chips
                    @change="pickFile()">
                    
                    <template v-slot:prepend>
                        <q-icon name="add_photo_alternate" :style="{'color': store.state.themeColor}"/>
                    </template>
                </q-file>
    
                <q-img v-if="category.file" :src="category.file"></q-img>      
            
                <q-page-sticky position="bottom" :offset="[18, 18]" class="q-mt-lg ">
                    <q-btn-group rounded>
                        <q-btn v-close-popup size="xl" fab dark
                                class="bg-white" :style="{'color': store.state.themeColor}">  
                            <q-icon name="backspace" class="q-pr-sm"></q-icon>

                            {{$t('cancel')}}
                        </q-btn>

                        <q-btn v-close-popup v-if="category.label.length >= 2 && !store.state.isDuplicateName" 
                            type="submit"  size="xl" fab 
                                class="" :style="{'background-color': store.state.themeColor, 'color': 'white'}"> 
                            <q-icon v-close-popup name="save" class="q-pr-sm"></q-icon>
                            {{$t('save')}}
                        </q-btn>
                    </q-btn-group>
                </q-page-sticky>
            </q-form>
        </q-card>
    </q-page>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
    props: ['title', 'file', 'category', 'pickFile', 'submitForm', 'openDialog'],
    setup(props) {
        const store = inject('store')

        const route = useRouter()

        function toSlug() {
            route.push('/' + props.category.slug)
        }

        return {store, toSlug}
    },
}
</script>

<style scoped>
    .my-form {
        border-radius: 28px;
        min-width: 360px;
        max-width: 600px;
    }
</style>