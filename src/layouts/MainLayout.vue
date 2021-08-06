<template>
  <q-layout view="hhh lpR lFr">

    <q-header reveal elevated class=" text-white" 
              :style="{'background-color': store.state.themeColor}">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          MyRecipe
        </q-toolbar-title>

        <div style="min-width: 150px; max-width: 175px" >
            <q-input
              v-model="store.state.search"
              debounce="100"
              dense
              dark
              :placeholder="$t('search')"
              width="100px"
              color="white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
          </q-input>
        </div>

      </q-toolbar>

      <Links></Links>      
    </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        
        :mini="miniState"
        mini-to-overlay
        :width="60"
        :breakpoint="500" 
        dark
        :style="{'background-color': store.state.themeColor}"
      >
        <LeftDrawer></LeftDrawer>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { inject, ref } from 'vue'
import LeftDrawer from './LeftDrawer.vue'
import Links from './Links.vue'

export default {
  components: { LeftDrawer, Links },
  setup () {
    const store = inject('store')

    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      store,
      miniState: ref(true),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>


<style  scoped>
  router-link {
    text-decoration: none;
  }
</style>