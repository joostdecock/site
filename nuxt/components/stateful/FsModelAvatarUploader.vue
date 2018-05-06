<template>
  <div>
    <div class="fs-pad text-xs-center" style="margin: auto" v-if="!edit">
      <v-avatar tile :size="(256)">
        <img :src="$fs.modelAvatar(model.pictureSrc)" :alt="model.name" />
      </v-avatar>
      <br>
      <v-btn flat round outline color="accent" @click="edit = !edit" class="mt-3">{{ $t('edit') }}</v-btn>
    </div>
    <div v-else class="dropzone">
      <h3>{{ $t('txt-avatarDropzoneTitle') }}</h3>
      <p>{{ $t('txt-avatarDropzoneText') }}</p>
      <div class="upload">
        <ul v-if="files.length" class="chiplist mt-2 mb-2">
          <li v-for="(file, index) in files" :key="file.id+index">
            <v-chip>
              <v-avatar v-if="file.error" class="error"><v-icon dark>error_outline</v-icon></v-avatar>
              <v-avatar v-else-if="file.success" class="success"><v-icon dark>check</v-icon></v-avatar>
              <v-avatar v-else-if="file.active" class="info"><v-icon dark>cloud_upload</v-icon></v-avatar>
              <v-avatar v-else class="primary"><v-icon dark>remove_red_eye</v-icon></v-avatar>
              {{file.name}}
            </v-chip>
          </li>
        </ul>
        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
          <h3>{{ $t('txt-avatarDropzoneTitle') }}</h3>
        </div>
        <div>
          <file-upload
            :put-action="$fs.conf.api.data+'/account'"
            :multiple="false"
            :drop="true"
            :drop-directory="false"
            v-model="files"
            :headers="{ authorization: 'Bearer '+$fs.getToken()}"
            ref="upload"
            @input-filter="inputFilter"
            @input-file="inputFile"
            @uploaded="test"
          >
          </file-upload>
          <div>
            <v-btn
              color="primary"
              v-if="!files.length == 0 && (!$refs.upload || !$refs.upload.active)"
              @click.prevent="$refs.upload.active = true"
            >
              <v-icon class="mr-3">cloud_upload</v-icon>
              {{ $t('startUpload') }}
            </v-btn>
            <v-btn
              v-else-if="files.length > 0"
              @click.prevent="$refs.upload.active = false"
            >
              <v-icon class="mr-3">cancel</v-icon>
              {{ $t('stopUpload') }}
            </v-btn>
          </div>
          <v-btn
            @click="trigger"
            :flat="(files.length > 0) ? true : false"
            :outline="(files.length > 0) ? true : false"
            color="primary"
          >
            <v-icon class="mr-3">folder_open</v-icon>
            {{ (files.length > 0) ? $t('selectADifferentImage') : $t('selectAnImage') }}
          </v-btn>
          <v-btn @click="edit = false; files=[]">
            <v-icon class="mr-3">cancel</v-icon>
            {{ $t('cancel') }}
          </v-btn>
        </div>
      </div>
    </div>
  <v-snackbar :timeout="(4000)" top right multi-line v-model="snackbar" >
    <v-icon class="mr-3" :color="notifyColor">{{ notifyIcon }}</v-icon>
    {{ msg }}
    <v-btn flat color="accent" @click.native="snackbar = false">{{ $t('close') }}</v-btn>
  </v-snackbar>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'
export default {
  name: "FsAccountAvatarUploader",
  components: {
    FileUpload: VueUploadComponent
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      files: [],
      edit: false,
      msg: this.$t('avatarUpdated'),
      notifyIcon: 'check',
      notifyColor: 'success',
      snackbar: false,
    }
  },
  methods: {
    getHeader: () => {
      return {authorization: this.$fs.getToken()}
    },
    trigger: function() {
      document.getElementById("file").click()
    },
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        if (newFile.xhr && newFile.xhr.status == 200) {
          this.$fs.auth()
          this.edit = false
        }
      }
    },
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
  }
}

</script>

<style scoped>
ul.chiplist li {
  list-style-type: none;
  display: inline-block;
}
.dropzone {
  border: 1px dashed #ccc;
  padding: 1rem;
  padding-top: 100px;
  text-align: center;
  border-radius: 0.25rem;
  min-height: 600px;
}
.dropzone label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
.dropzone .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.dropzone .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

