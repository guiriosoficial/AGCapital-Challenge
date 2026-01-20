import { db } from '@/plugins/firebase'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  query,
  type FirestoreDataConverter
} from 'firebase/firestore/lite'
import type { Task, TaskDoc } from '@/models/taskModel'

const tasksPath = 'tasks'

export const tasksService = {
  async searchTasksByProject(projectId: string): Promise<Task[]> {
    const tasksCollection = collection(db, tasksPath).withConverter(taskConverter)
    const constraints = where('projectId', '==', projectId)
    const tasksQuery = query(tasksCollection, constraints)
    const tasksRef = await getDocs(tasksQuery)

    return tasksRef.docs.map((t) => t.data())
  },

  async createTask(payload: TaskDoc): Promise<string> {
    const tasksCollection = collection(db, tasksPath)
    const docRef = await addDoc(tasksCollection, payload)

    return docRef.id
  },

  async updateTask(payload: Partial<TaskDoc>, taskId: string): Promise<void> {
    const newTaskRef = doc(db, tasksPath, taskId)
    await updateDoc(newTaskRef, payload)
  },

  async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, tasksPath, taskId)
    await deleteDoc(taskRef)
  }
}

const taskConverter: FirestoreDataConverter<Task> = {
  toFirestore(modelObject) {
    const { id: _id, ...form } = modelObject
    return form
  },
  fromFirestore(snapshot) {
    const data = snapshot.data() as TaskDoc

    return {
      id: snapshot.id,
      ...data
    }
  }
}
