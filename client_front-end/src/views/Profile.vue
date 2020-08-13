<template>
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <ProfilePanel
          :user="user"
          :projects="projects"
          :tasksAuth="tasksAuth"
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
      :modalSubData="modalSubData"
      :modalText="modalText"
      :modalPrimBtnTxt="modalPrimBtnTxt"
      :modalSecBtnTxt="modalSecBtnTxt"
      :modalPrimEvent="modalPrimEvent"
      :modalSecEvent="modalSecEvent"
      :modalItemType="modalItemType"
      @on-delete-confirmed="confirmActionOnRegisterType"
      @on-full-delete-confirmed="fullDeleteConfirmed"
      @on-soft-delete-confirmed="softDeleteConfirmed"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ProfilePanel from '@/components/ProfilePanel.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import router from '@/router'

export default {
  components: {
    ProfilePanel,
    ModalConfirm
  },
  mounted () {
    if (!this.isLoggedIn) {
      return router.push('/login')
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ]),
    ...mapState('authentication', [
      'user'
    ]),
    ...mapState('projects', [
      'projects'
    ]),
    ...mapState('tasks', [
      'tasksAuth'
    ]),
    ...mapState('profile', [
      'selectedProfileTo'
    ]),
    ...mapState('modalConfirm', [
      'modalConfirmMode',
      'modalMaxWidth',
      'modalTitleBgClass',
      'modalTitle',
      'modalSubTitle',
      'modalSubData',
      'modalText',
      'modalPrimBtnTxt',
      'modalSecBtnTxt',
      'modalPrimEvent',
      'modalSecEvent',
      'modalItemType'
    ])
  },
  methods: {
    ...mapMutations('profile', [
      'setSelectedProfileTo'
    ]),
    ...mapMutations('modalConfirm', [
      'toggleModalConfirm',
      'setModalMaxWidth',
      'setModalTitleBgClass',
      'setModalTitle',
      'setModalSubTitle',
      'setModalSubData',
      'setModalText',
      'setModalPrimBtnTxt',
      'setModalSecBtnTxt',
      'setModalPrimEvent',
      'setModalSecEvent',
      'setModalItemType'
    ]),
    ...mapActions('profile', [
      'deleteProfile',
      'deleteProfileProjects',
      'deleteProfileProjectsTasks',
      'linkProfileProjectsTasks'
    ]),
    ...mapActions('modalConfirm', [
      'resetModalConfirm'
    ]),
    showModalConfirm () {
      this.toggleModalConfirm(true)
    },
    confirmActionOnRegisterType (itemType) {
      if (this.projects.length > 0) {
        this.setSelectedProfileTo(this.user)
        this.setModalMaxWidth(600)
        this.setModalTitleBgClass('warning')
        this.setModalTitle('Advertencia - Perfil')
        this.setModalSubTitle('Actualmente, dispone de esta cantidad de Proyectos:')
        this.setModalSubData(this.projects.length)
        this.setModalText('¿Quiere que todos sus Proyectos y Tareas sean eliminados, igualmente, o desea que sean vinculados a la cuenta general de la aplicación?')
        this.setModalPrimBtnTxt('Eliminar')
        this.setModalPrimEvent('on-full-delete-confirmed')
        this.setModalSecBtnTxt('Vincular')
        this.setModalSecEvent('on-soft-delete-confirmed')
        this.setModalItemType(itemType)
        this.showModalConfirm()
      } else {
        this.fullDeleteConfirmed(itemType)
      }
    },
    fullDeleteConfirmed (itemType) {
      this.toggleModalConfirm(false)
      this.resetModalConfirm()

      // console.log('PROYECTOS desde Profile:', this.projects)
      // => ASÍ NO
      // this.deleteProfileProjectsTasks(this.selectedProfileTo, this.projects)
      /**
       * => TODA LISTA DE PARÁMETROS que exceda de un total de 1, deberá ser enviada a modo de OBJETO de parámetros
       * referido a un método ACTION del STORE.
       * De no ser así, se corre el riesgo de que el segundo parámetro y siguientes lleguen como UNDEFINED
      */
      // => ASÍ SI
      // this.deleteProfileProjectsTasks(this.projects)
      this.deleteProfileProjectsTasks({ user: this.selectedProfileTo, projects: this.projects })
      // Más que ejecutar todo el proceso de borrado desde aquí, funciona mejor empezándolo desde aquí
      // y continuándolo desde el STORE de "projects"
      // this.deleteProfileProjects(this.selectedProfileTo)
      // this.deleteProfile(this.selectedProfileTo)
    },
    softDeleteConfirmed (itemType) {
      this.toggleModalConfirm(false)
      this.resetModalConfirm()

      this.linkProfileProjectsTasks(this.selectedProfileTo)
    }
  }
}
</script>
