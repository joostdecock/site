<template>
  <div>
    <v-card class="mt-3" v-if="page.toc">
      <v-card-title>
        <div>
          <div class="display-1">{{ $t('contents') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
        <fs-table-of-contents :toc="page.toc"/>
    </v-card>
    <v-card class="mt-3">
      <v-card-title>
        <div>
          <div class="display-1">{{ $t('makeItBetter') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p><small>{{ $t('txt-didYouSpotATypo') }}</small></p> 
        <p><small>{{ $t('txt-editThisPageOnline') }}</small></p>
        <v-btn block
          color="primary" 
          :href="repo+'/edit/develop/app/content/'+page.meta.dirName+page.meta.section+'/'+page.meta.fileName"
          >{{ $t('page.editOnGithub') }}</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FsTableOfContents from '~/components/Fs/Navigation/FsTableOfContents'
export default { 
  name: 'FsRightColumnPage',
  components: {
    FsTableOfContents
  },
  computed: { 
    page () {
      return this.$store.state.components.data['page']
    }, 
    repo () {
      return this.$store.state.freesewing.site.repo
    }
  }
}
</script>
