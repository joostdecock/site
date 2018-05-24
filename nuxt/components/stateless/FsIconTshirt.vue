<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 -2.5 24 24" >
    <path stroke="none" :fill="color" d="M 4.5408498,0.0022 -2e-7,1.3048 l 1.51274,5.273 2.89698,-0.831 0,13.3154 15.1805602,0 0,-13.3154 2.89698,0.831 L 24,1.3048 19.46736,0.0046 A 9.7638811,3.9158843 0 0 1 12,1.3976 9.7638811,3.9158843 0 0 1 4.5408498,0.0022 Z"></path>
  </svg>
</template>

<script>
export default {
  name: 'FsIconTshirt',
  props: {
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: '#212121'
    }
  }
}
</script>
