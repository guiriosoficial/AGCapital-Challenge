import { clientsService } from '@/services/clientsService'
import { db } from '@/plugins/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, where, query, type FirestoreDataConverter } from 'firebase/firestore/lite'
import { normalizeString } from '@/utils'
import type { Project, ProjectDoc, ProjectsByClient, ProjectStatus } from '@/models/projectModel'

const projectsPath = 'projects'

export const projectsService = {
  async searchProjectsByClient(status: ProjectStatus, searchTerm?: string): Promise<ProjectsByClient[]> {
    const normalizedSearchTerm = normalizeString(searchTerm ?? '')
    const clientsList = await clientsService.searchClients()

    const constraints = [
      where('status', '==', status.toUpperCase())
    ]

    if (normalizedSearchTerm) {
      constraints.push(
        where('name_lc', '>=', normalizedSearchTerm),
        where('name_lc', '<=', normalizedSearchTerm + '\uf8ff')
      )
    }

    const projectsCollection = collection(db, projectsPath).withConverter(projectConverter)
    const projectsQuery = query(projectsCollection, ...constraints)
    const projectsSnapshot = await getDocs(projectsQuery)
    const projectsList = projectsSnapshot.docs.map(d => d.data())

    const projectsByClient = projectsList.reduce((acc, project) => {
      if (!acc[project.clientId]) acc[project.clientId] = []
      acc[project.clientId]?.push(project)

      return acc
    }, {} as Record<string, Project[]>)

    return clientsList
      .map(client => ({
        id: client.id,
        name: client.name,
        projects: projectsByClient[client.id] ?? []
      }))
  },

  async createProject(payload: ProjectDoc): Promise<Project> {
    const projectsCollection = collection(db, projectsPath)
    const docRef = await addDoc(projectsCollection, payload)

    return {
      id: docRef.id,
      ...payload
    }
  },

  async updateProject(payload: Partial<ProjectDoc>, projectId: string): Promise<void> {
    const newProjectRef = doc(db, projectsPath, projectId)
    await updateDoc(newProjectRef, payload)
  },

  async deleteProject(projectId: string): Promise<void> {
    const newProjectRef = doc(db, projectsPath, projectId)
    await deleteDoc(newProjectRef)
  }
}

const projectConverter: FirestoreDataConverter<Project> = {
  toFirestore(modelObject) {
    const { id: _id, ...form } = modelObject
    return form
  },
  fromFirestore(snapshot) {
    const data = snapshot.data() as ProjectDoc

    return {
      id: snapshot.id,
      ...data
    }
  }
}

