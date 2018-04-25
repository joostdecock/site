<template>
  <div>
    <v-card v-if="page.toc">
      <v-card-title class="fs-primary">
        <div>
          <div class="headline">{{ $t('contents') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
        <fs-table-of-contents :toc="page.toc"/>
    </v-card>
    <v-card class="mt-3">
      <v-card-title class="fs-primary">
        <div>
          <div class="headline">{{ $t('makeItBetter') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p><small>{{ $t('txt-didYouSpotATypo') }}</small></p> 
        <p><small>{{ $t('txt-editThisPageOnline') }}</small></p>
        <v-btn block
          color="primary" 
          :href="repo+'/edit/develop/app/content/'+page.meta.dirName+page.meta.section+'/'+page.meta.fileName"
          ><v-icon class="mr-3">edit</v-icon>{{ $t('editOnGithub') }}</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FsTableOfContents from '~/components/stateless/FsTableOfContents'
export default { 
  name: 'FsDynamicAsidePage',
  components: {
    FsTableOfContents
  },
  computed: { 
    page () {
      return this.$store.state.components.data['page']
    }, 
    repo () {
      return this.$store.state.fs.repo.site
    }
  }
}
</script>
