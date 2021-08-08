<template>
  
  <router-view class=""/>

</template>
<script>
import { defineComponent, provide } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import store from './store'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: { MainLayout },
  name: 'App',
  setup() {
    provide('store', store)
    
    store.methods.getCollections()
    
    // equivalent to calling this on creating the component
    const $q = useQuasar()
    $q.addressbarColor.set('#a2e3fa')

    // local loungage
    // $q.lang.getLocale()

    // set status
    // $q.dark.set(true) // or false or "auto"
    return { store }
  },
  

  created() {
    const locale = localStorage.getItem('locale')
    if(locale) {
      this.$i18n.locale = locale
    } else if(navigator.language) {
      this.$i18n.locale = navigator.language
    }
  }
})
</script>


