import { db } from '@/plugins/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, where, query } from 'firebase/firestore/lite'
import type { Task, TaskDoc } from '@/models/taskModel'

const tasksPath = 'tasks'

export const tasksService = {
  async searchTasksByProject(projectId: string): Promise<Task[]> {
    const tasksCollection = collection(db, tasksPath)
    const constraints = where('projectId', '==', projectId)
    const tasksQuery = query(tasksCollection, constraints)
    const tasksRef = await getDocs(tasksQuery)

    return tasksRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as TaskDoc
    }))
  },

  async createTask(payload: TaskDoc): Promise<string> {
    const tasksCollection = collection(db, tasksPath)
    const docRef = await addDoc(tasksCollection, payload)

    return docRef.id
  },

  async updateTask(taskId: string, body: Partial<TaskDoc>): Promise<void> {
    const newTaskRef = doc(db, tasksPath, taskId)
    await updateDoc(newTaskRef, body)
  },

  async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, tasksPath, taskId)
    await deleteDoc(taskRef)
  }
}
