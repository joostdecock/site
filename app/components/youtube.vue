<template>
	<div class="embed">
    <iframe class="embed-responsive-item" :src="'https://www.youtube.com/embed/'+video+'?rel=0&amp;controls=0&amp;showinfo=0?ecver=1" allowfullscreen=""></iframe>
  </div>
</template>

<script>
export default {
  name: 'FsYoutube',
  props: {
    video: {
      type: String,
      required: true
    }
  }
}
</script>
