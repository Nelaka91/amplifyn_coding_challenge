<template>
  <button
    :class="`button-${style}`"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <span>{{ label }}</span> <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  style: {
    type: String,
    default: 'solid',
  },
  disabled: Boolean,
})
</script>

<style scoped lang="scss">
button {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid hsla(22, 68%, 55%, 1);
  margin-right: 12px;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.button {
  &-outline {
    background-color: hsl(0, 0%, 100%);
    color: hsla(22, 68%, 55%, 1);
    &:hover {
      border: 1px solid hsl(22, 100%, 37%);
      color: hsl(22, 100%, 37%);
    }
  }
  &-solid {
    background-color: hsla(22, 68%, 55%, 1);
    color: hsl(0, 0%, 100%);
    &:hover {
      border: 1px solid hsl(22, 100%, 37%);
      background-color: hsl(22, 100%, 37%);
    }
  }
}
</style>
