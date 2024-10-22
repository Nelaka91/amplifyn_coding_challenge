<template>
  <div class="result-wrapper">
    <h4 class="text-semibold">Result</h4>
    <div class="results">
      <p>{{ `From Node Name = “${fromNode}”,` }}</p>
      <p>{{ `To Node Name = ”${toNode}”: ${computedPath}` }}</p>
      <br />
      <p>{{ `Total Distance: ${distance}` }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  fromNode: String,
  toNode: String,
  path: Array<string>,
  distance: Number,
})

const computedPath = computed(() => props.path?.join(', '))
</script>

<style scoped lang="scss">
.result-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  h4 {
    font-size: 16px;
    line-height: 20px;
    color: hsla(213, 81%, 35%, 1);
    margin-bottom: 16px;
  }
  .results {
    flex: 1;
    background-color: hsl(0, 0%, 100%);
    border-radius: 8px;
    padding: 24px;
  }
}
</style>
