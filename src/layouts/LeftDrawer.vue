<template>
  <q-scroll-area class="fit">
    <q-list class="justify-center">
      <q-item clickable v-ripple @click="$q.dark.toggle()" class="row">
        <q-item-section avatar>
          <q-icon v-if="$q.dark.mode == true" 
                  round 
                  flat 
                  name="light_mode">
          </q-icon>

          <q-icon v-if="$q.dark.mode == false" 
                  round 
                  flat 
                  name="dark_mode">
          </q-icon>
        </q-item-section>
      </q-item>

      <ColorPicker>  </ColorPicker>

      <q-fab flat
              v-model="fab"
              color="white"
              icon='translate'
              direction="down"
        >
        <q-fab-action flat color="white" 
                      @click="setLocal('en-US')" 
                      hide-icon 
                      label="English" 
        />
        <q-fab-action flat color="white" 
                      @click="setLocal('fr-FR')" 
                      hide-icon 
                      label="Français" 
        />
        <q-fab-action flat color="white" 
                      @click="setLocal('am-AM')" 
                      hide-icon 
                      label="አማርኛ" 
        />
      </q-fab>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { inject, ref } from 'vue'
import { useQuasar } from 'quasar'
import ColorPicker from './ColorPicker.vue'

export default {
  components: { ColorPicker },
  setup () {
    const store = inject('store')

    // equivalent to calling this on creating the component
    const $q = useQuasar()
    $q.addressbarColor.set('#a2e3fa')

    // set status
    $q.dark.set(false) // or false or "auto"

    return {
      store,
      fab: ref(null),
    }
  },

  methods: {
    setLocal(locale) {
      this.$i18n.locale = locale
      localStorage.setItem('locale', locale),
      this.store.methods.changeCategorysLoungages()
    }
  }
}
</script>