<template>
  <figure>
    <img :src="src" />
    <figcaption><slot></slot></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'FsFigure',
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>
