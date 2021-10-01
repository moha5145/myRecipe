    <template>
        <div>
            <q-btn @click.prevent="confirm = true"
                round
                color="red" 
                icon="delete" 
                size="sm" 
                class="absolute"
                style="top: 0; right: 4px; transform: translateY(-50%);">
            </q-btn>

            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                    <!-- <q-avatar icon="delete" color="primary" text-color="white" /> -->
                        <span class="q-ml-sm text-grey">Are you sure you want delete {{recip.title}} ?.</span>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="cancel" v-close-popup 
                            :style="{'color': store.state.themeColor}"/>
                        <q-btn flat label="delete" @click="store.methods.deleteRecip(recip)"  
                            color="red" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </template>

<script>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
    export default {
        props: ['recip'],
        setup() {
            const store = inject('store')
            const confirm = ref(false)

            const router = useRouter()
        
            return {store, confirm}
        }
    }
</script>