import { ref } from 'vue'
import { clone } from '@/utils/clone'
import { tasksService } from '@/services/tasksService'
import { useNotification } from '@/composables/useNotification'
import { TaskStatus, type Task, type TaskDoc } from '@/models/taskModel'

export function useTasksController (projectId: string) {
  const notification = useNotification()

  const isLoading = ref(false)
  const tasks = ref<Task[]>([])

  function backup () {
    return clone(tasks.value)
  }

  function rollback (snapshot: Task[]) {
    tasks.value = snapshot
  }

  async function fetchTasks () {
    isLoading.value = true
    try {
      tasks.value = await tasksService.searchTasksByProject(projectId)
    } catch {
      notification.error('Error loading tasks')
    } finally {
      isLoading.value = false
    }
  }

  async function createTask (description: string) {
    const snapshot = backup()
    const payload = {
      description,
      status: TaskStatus.TODO
    }
    const tempTask = {
      id: '',
      ...payload
    }

    tasks.value.push(tempTask)

    try {
      await tasksService.createTask(payload, projectId)
      notification.success('Task created successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error creating task, please try again')
    }
  }

  async function updateTask (
    taskId: string,
    task: Partial<TaskDoc>
  ) {
    const snapshot = backup()

    try {
      await tasksService.updateTask(taskId, task)
      notification.success('Task description updated successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error updating task description, please try again')
    }
  }

  async function deleteTask (taskId: string) {
    const snapshot = backup()

    tasks.value = tasks.value.filter((t) => t.id !== taskId)

    try {
      await tasksService.deleteTask(taskId)
      notification.success('Task deleted successfully')
    } catch {
      rollback(snapshot)
      notification.error('Error deleting task, please try again')
    }
  }

  return {
    isLoading,
    tasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
}
