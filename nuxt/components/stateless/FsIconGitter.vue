<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" >
    <path stroke="none" :fill="color" d="M8.501 4.001H10.5V24H8.501V4.001zm6.999 0V24h-2V4.001h2zM3.5 0h2.001v15H3.5V0zm15 4.001h2V15h-2V4.001z"></path>
  </svg>
</template>

<script>
// SVG code from simpleicons.org
export default {
  name: 'FsIconGitter',
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
