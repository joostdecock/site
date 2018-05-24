<template>
  <ul>
    <li 
      v-for="(item, i) in items" 
      :key="i"
      :class="'toc-level-'+item.level">
      <a :href="item.link">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FsTableOfContents',
  props: {
    toc: { 
      type: Object, 
      required: false
    }
  },
  computed: { 
    items () {
      const sitems = []
      for (const item of Object.keys(this.toc.items)) {
        sitems.push({
          level: this.toc.items[item].level - this.toc.topLevel + 1,
          title: this.toc.items[item].title,
          link: this.toc.items[item].link
        })   
      }
      return sitems
    }
  }
}
</script>

<style scoped>
  a { 
    text-decoration: none; 
  }
  ul { 
    margin: 0;
    padding: 1rem 2rem;
  }
  ul li { 
    list-style-type: none; 
    padding: 0;
    line-height: 1.3;
  }
  ul li:before {
    content: '- '; 
  }
  li.toc-level-1 {
    font-size: 110%; 
    padding-top: 0.5rem;
    font-weight: 500;
  }
  ul li.toc-level-1:before {
    content: initial; 
  }
  li.toc-level-2 {
    margin-left: 10px;
    padding-top: 0.2rem;
  }
  ul li.toc-level-2:before {
    content: '●';
    font-size: 18px;
    padding-right: 8px;
  }
  li.toc-level-3 {
    margin-left: 25px;
    font-size: 95%;
    padding-top: 0.1rem;
  }
  ul li.toc-level-3:before {
    content: '○';
    font-size: 16px;
    padding-right: 8px;
  }
  li.toc-level-4,
  li.toc-level-5,
  li.toc-level-6 {
    display: none;
  } 
</style>
