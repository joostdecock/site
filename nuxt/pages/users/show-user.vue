<template>
  <section>
    <fs-wrapper-login-required :callback="loadUser">
      <fs-breadcrumbs :crumbs="crumbs">{{ $route.params.user }}</fs-breadcrumbs>
      <div v-if="loaded">
        <v-alert value="1" color="success" icon="favorite" v-if="user.profile.patron > 0" class="mt-3 mb-3">
          <b>{{ $t('userIsAPatron', {user: user.profile.username}) }}</b>
          <small class="ml-3">{{ $t('txt-homepage-patrons') }}</small>
        </v-alert>
        <v-tabs color="primary" dark class="fs-content elevation-1" centered>

          <v-tab>{{ $t('profile') }}</v-tab>
          <v-tab>{{ $t('drafts') }}</v-tab>
          <v-tab>{{ $t('comments') }}</v-tab>
          <v-tab-item class="fs-pad text-xs-center">
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex md6 lg4>
                  <figure>
                    <img :src="$fs.conf.apis.data+user.profile.pictureSrc" class="elevation-1" style="border-radius: 4px;"/>
                    <figcaption>
                    {{ $t('userHasBeenWithUsSince', {
                    user: user.profile.username,
                    since: $fs.daysAgo((user.profile.migrated) ? user.profile.migrated : user.profile.created)
                    }) }}
                    </figcaption>
                  </figure>
                </v-flex>
                <v-flex md6 lg8>
                  <div class="fs-content fs-pad text-xs-left">
                    <div style="float: right;">
                      <a class="mr-3" target="_BLANK" :href="'https://twitter.com/'+user.profile.social.twitter" v-if="user.profile.social.twitter">
                        <fs-icon-twitter color="#484848" :size="(32)" />
                      </a>
                      <a class="mr-3" target="_BLANK" :href="'https://instagram.com/'+user.profile.social.instagram" v-if="user.profile.social.instagram">
                        <fs-icon-instagram color="#484848" :size="(32)" />
                      </a>
                      <a class="mr-3" target="_BLANK" :href="'https://github.com/'+user.profile.social.github" v-if="user.profile.social.github">
                        <fs-icon-github color="#484848" :size="(32)" />
                      </a>
                      <img :src="'/img/patrons/medals/medal-'+user.profile.patron+'.svg'" height="32" v-if="user.profile.patron"/>
                    </div>
                    <h1>@{{user.profile.username}}</h1>
                    <div v-html="$fs.md.render(''+user.profile.bio)" v-if="user.profile.bio"></div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <img v-for="(active, badge) in user.profile.badges" :src="'/img/badges/badge-'+badge+'.svg'" :key="badge" class="badge elevation-1"/>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex class="xs12 sm12 md6 xl6" v-for="draft in user.drafts" :key="draft.handle" >
                  <div class="preview">
                    <nuxt-link :to="'/drafts/'+draft.handle" :title="draft.name"><span class="fs-block-link"></span></nuxt-link>
                    <img :src="draft.dlroot+'/'+draft.handle+'.svg'" alt="draft.name" class="elevation-1 draft"/>
                    <div class="title">
                      <p class="mb-0 mt-0 thetitle">
                      {{draft.name}}
                      <span class="meta" v-html="$fs.md.render(''+draft.notes)"></span>
                      </p>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item class="fs-pad">
            <div v-for="id in commentKeys" :key="id">
              <fs-comment :comment="user.comments[id]" :patron="user.profile.patron" />
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
              </fs-wrapper-login-required>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsPageNotFound from '~/components/stateless/FsPageNotFound'
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsIconTwitter from '~/components/stateless/FsIconTwitter'
import FsIconInstagram from '~/components/stateless/FsIconInstagram'
import FsIconGithub from '~/components/stateless/FsIconGithub'
import FsComment from '~/components/stateless/FsComment'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsPageNotFound,
    FsWrapperLoginRequired,
    FsIconTwitter,
    FsIconInstagram,
    FsIconGithub,
    FsComment,
  },
  data () {
    return {
      crumbs: [ {to: this.$fs.path('/users'), title: this.$t('users')}],
      error: false,
      user: {},
      commentKeys: [],
      loaded: false,
    }
  },
  methods: {
    loadUser() {
      this.$fs.loadUser(this.$route.params.user)
      .then((data) => {
        this.commentKeys = Object.keys(data.comments).reverse()
        this.user = data
        this.loaded = true
      })
      .catch((error) => {
        console.log('Loading user failed')
        return {error: true}
      })
    }
  }
}
</script>

<style scoped>
img.badge {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin: 3px;
}
img.draft {
  background: #FFF;
  padding: 12px;
}
div.preview {
  position: relative;
}
div.preview img {
  max-width: 100%;
  border-radius: 4px;
}
div.title {
  position: absolute;
  bottom: 30px;
  right: 0px;
}
div.title p {
  background: #0009;
  font-size: 32px;
  color: #fff;
  padding: 8px 16px;
  margin: 0;
  text-align: right;
  display: inline-block;
  font-weight: 300;
  line-height: 1.1;
}
.meta {
  display: block;
  font-size: 60%;
  margin-top: 6px;
  color: #FFFB;
}
@media (max-width: 600px) {
  div.title p {
    font-size: 22px;
  }
}
@media (min-width: 601px) {
  div.title p {
    font-size: 26px;
  }
}
@media (min-width: 960px) {
  div.title p {
    font-size: 22px;
  }
}
@media (min-width: 1264px) {
  div.title p {
    font-size: 26px;
  }
}
</style>
