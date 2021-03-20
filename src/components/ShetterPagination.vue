<template>
  <footer class="space-x-2 mt-4 flex justify-center items-center">
    <button :disabled="currentPage === 1" @click="prevPage">←</button>
    <button :class="{ dark: currentPage === page }" v-for="page in total" @click="changePage(page)" :key="page">
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="nextPage">→</button>
  </footer>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const currentPage = ref(props.value);
    const totalPages = ref(props.total);

    const changePage = page => (currentPage.value = page);
    const nextPage = () => currentPage.value++;
    const prevPage = () => currentPage.value--;

    return { currentPage, totalPages, changePage, nextPage, prevPage };
  },
});
</script>
