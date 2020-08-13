<template>
  <v-container>
    <v-layout>
      <v-flex xs4>
        <ProjectsPanel
          @on-show-modal-confirm="showModalConfirm()"
        />
      </v-flex>
      <v-flex xs8 class="pl-4">
        <TasksPanel
          @on-show-modal-confirm="showModalConfirm()"
        />
      </v-flex>
    </v-layout>

    <ModalConfirm
      :modalConfirmMode="modalConfirmMode"
      :modalMaxWidth="modalMaxWidth"
      :modalTitleBgClass="modalTitleBgClass"
      :modalTitle="modalTitle"
      :modalSubTitle="modalSubTitle"
      :modalText="modalText"
      :modalPrimBtnTxt="modalPrimBtnTxt"
      :modalSecBtnTxt="modalSecBtnTxt"
      :modalPrimEvent="modalPrimEvent"
      :modalSecEvent="modalSecEvent"
      :modalItemType="modalItemType"
      @on-full-delete-confirmed="fullDeleteConfirmed"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ProjectsPanel from '@/components/ProjectsPanel.vue'
import TasksPanel from '@/components/TasksPanel.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import router from '@/router'

export default {
  components: {
    ProjectsPanel,
    TasksPanel,
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
      'modalMaxWidth',
      'modalTitleBgClass',
      'modalTitle',
      'modalSubTitle',
      'modalText',
      'modalPrimBtnTxt',
      'modalSecBtnTxt',
      'modalPrimEvent',
      'modalSecEvent',
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
    ...mapActions('modalConfirm', [
      'resetModalConfirm'
    ]),
    showModalConfirm () {
      this.toggleModalConfirm(true)
      // console.log('Se debería activar el ModalConfirm')
    },
    fullDeleteConfirmed (itemType) {
      this.toggleModalConfirm(false)
      this.resetModalConfirm()

      if (itemType === 'task') {
        this.deleteTask(this.selectedTaskTo)
      } else if (itemType === 'project') {
        this.deleteProjectTasks({ project: this.selectedProjectTo, haveToDelete: true })
      }
    }
  }
}
</script>
