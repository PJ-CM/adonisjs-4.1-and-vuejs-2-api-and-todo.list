<template>
  <v-container>
    <v-layout>
      <v-flex xs4>
        <Projects
          @on-show-modal-confirm="showModalConfirm()"
        />
      </v-flex>
      <v-flex xs8 class="pl-4">
        <Tasks
          @on-show-modal-confirm="showModalConfirm()"
        />
      </v-flex>
    </v-layout>

    <ModalConfirm
      :modalConfirmMode="modalConfirmMode"
      :modalTitle="modalTitle"
      :modalText="modalText"
      :modalBtnText="modalBtnText"
      :modalItemType="modalItemType"
      @on-delete-confirmed="deleteConfirmed"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Projects from '@/components/Projects.vue'
import Tasks from '@/components/Tasks.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import router from '@/router'

export default {
  components: {
    Projects,
    Tasks,
    ModalConfirm
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ]),
    ...mapState('projects', [
      'selectedProjectTo'
    ]),
    ...mapState('tasks', [
      'selectedTaskTo'
    ]),
    ...mapState('modalConfirm', [
      'modalConfirmMode',
      'modalTitle',
      'modalText',
      'modalBtnText',
      'modalItemType'
    ])
  },
  mounted () {
    if (!this.isLoggedIn) {
      return router.push('/login')
    }
  },
  methods: {
    ...mapMutations('modalConfirm', [
      'toggleModalConfirm'
    ]),
    ...mapActions('projects', [
      'deleteProjectTasks'
    ]),
    ...mapActions('tasks', [
      'deleteTask'
    ]),
    showModalConfirm () {
      this.toggleModalConfirm(true)
      console.log('Se debería activar el ModalConfirm')
    },
    deleteConfirmed (itemType) {
      this.toggleModalConfirm(false)
      if (itemType === 'task') {
        this.deleteTask(this.selectedTaskTo)
      } else if (itemType === 'project') {
        this.deleteProjectTasks(this.selectedProjectTo)
      }
    }
  }
}
</script>
