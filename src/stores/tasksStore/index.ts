import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from './models'
import { TaskStatuses } from './models'

const useTasksStore = defineStore('tasksStore', () => {
  const projectTasks = ref<Task[]>([
    {
      description: 'Lavar a louça',
      status: 'CANCELLED',
      id: 1
    },
    {
      description: 'separar o lixo e levar até a lixeira',
      status: 'TODO',
      id: 2
    },
    {
      description: 'fazer faxina na casa',
      status: 'DOING',
      id: 3
    },
    {
      description: 'Teste task 4',
      status: 'DONE',
      id: 4
    },
    {
      description: 'tarefa concluida',
      status: 'DONE',
      id: 5
    }
  ])

  const getProjectTasks = computed((): Task[] => projectTasks.value)

  return {
    getProjectTasks
  }
})

export type { Task }
export { TaskStatuses }
export default useTasksStore