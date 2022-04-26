<template>
  <va-card title="Administrators for RBP-Viewer">
    <va-button icon="entypo entypo-user" @click="addModal = true"> Add New</va-button>
    <va-data-table
      :fields="fields"
      :data="users"
      no-pagination
    >
      <template slot="marker" slot-scope="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>

      <template slot="actions" slot-scope="props">
        <va-button flat small color="danger" @click="remove(props.rowData)" class="ma-0">
          {{ $t('tables.delete') }}
        </va-button>
      </template>
    </va-data-table>
    <va-modal
      v-model="removeModal"
      cancelClass="none"
      okText="Sure"
      @ok="sendApprove"
      message="Are you sure to remove this user for this system?"
      noOutsideDismiss
      noEscDismiss
    />
    <va-modal
      v-model="permissionModal"
      cancelClass="none"
      @cancel="goBack"
      okText="Okay"
      @ok="goBack"
      message="Sorry, you are not allowed to manage this page."
      noOutsideDismiss
      noEscDismiss
    />
    <va-modal
      v-model="addModal"
      title=" User Info "
      okText=" Create "
      @ok="create"
      :cancelText=" $t('modal.cancel') "
      noOutsideDismiss
      noEscDismiss
    >
      <form>
        <div class="row">
          <div class="flex lg12">
            <va-input
              v-model="newUsername"
              placeholder="User Name"
            >
              <va-icon
                slot="prepend"
                name="va-icon entypo entypo-user"
              />
            </va-input>
          </div>
        </div>
        <div class="row">
          <div class="flex lg12">
            <va-input
              v-model="newPassword"
              type="password"
              placeholder="Password"
            >
              <va-icon
                slot="prepend"
                name="va-icon entypo entypo-key"
              />
            </va-input>
          </div>
        </div>
        <div class="row">
          <div class="flex lg12">
            <va-input
              v-model="newEmail"
              placeholder="Email"
            >
              <va-icon
                slot="prepend"
                name="va-icon entypo entypo-mail"
              />
            </va-input>
          </div>
        </div>
      </form>
    </va-modal>
  </va-card>
</template>

<script>
import axios from "axios";
import config from "@/config";
axios.defaults.baseURL = config.API_URL;
export default {
  data () {
    return {
      users: [],
      removeModal: false,
      addModal: false,
      permissionModal: false,
      ind: null,
      newUsername: '',
      newEmail: '',
      newPassword: '',
    }
  },
  computed: {
    fields () {
      return [{
        name: 'username',
        title: 'ID',
      }, {
        name: 'email',
        title: this.$t('tables.headings.email'),
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  watch: {
    addModal: function(params) {
      this.newUsername = ''
      this.newEmail = ''
      this.newPassword = ''
    },
  },
  mounted() {
    this.getAdmin()
  },
  methods: {
    getAdmin () {
      axios
        .get("/get_admin", {
          headers: { Authorization: "Token " + localStorage.token },
        })
        .then((response) => {
          console.log(response.data)
          this.users = response.data
        })
        .catch((error) => {
          this.permissionModal = true
        })
    },
    remove (user) {
      this.ind = user.username
      this.removeModal = true
    },
    sendApprove() {
      axios
        .post("/del_admin/",
          { username: this.ind },
          { headers: { Authorization: "Token " + localStorage.token } })
        .then((response) => {
          this.showToast(
            "Successfully removed",
            {
              position: 'bottom-right',
              duration: 2500,
            },
          )
          this.getAdmin()
        })
    },
    create() {
      if (this.newPassword == '' || this.newUsername == '') {
        
      }else {
        axios
          .post("/create_admin/",
            { username: this.newUsername, password: this.newPassword, email: this.newEmail },
            { headers: { Authorization: "Token " + localStorage.token } })
          .then((response) => {
            this.showToast(
              "Successfully created.",
              {
                position: 'bottom-right',
                duration: 2500,
              },
            )
            this.getAdmin()
          })
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss">
</style>
