<!-- <template>
    <Datepicker v-model="date" range multiCalendars />
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const date = ref();

        onMounted(() => {
          const startDate = new Date();
          const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
          date.value = [startDate, endDate];
        })
        
        return {
          date,
        }
    }
}
</script> -->