import { clientsService } from '@/services/clientsService'
import { db } from '@/plugins/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, where, query, QueryConstraint } from 'firebase/firestore/lite'
import type { Project, ProjectDoc, ProjectsByClient } from '@/models/projectModel'

const projectsPath = 'projects'

export const projectsService = {
  async searchProjectsByClient(status: string, searchTerm?: string): Promise<ProjectsByClient[]> {
    const clientsList = await clientsService.searchClients()

    const constraints: QueryConstraint[] = [
      where('status', '==', status.toUpperCase())
    ]

    if (searchTerm) {
      const term = searchTerm.trim().toLowerCase()

      constraints.push(
        where('name_lc', '>=', term),
        where('name_lc', '<=', term + '\uf8ff')
      )
    }

    const projectsCollection = collection(db, projectsPath)
    const projectsQuery = query(
      projectsCollection,
      ...constraints
    )

    const projectsSnapshot = await getDocs(projectsQuery)
    const projectsList = projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as ProjectDoc & { clientId: string },
    }))

    const projectsByClient = projectsList.reduce((acc, project) => {
      if (!acc[project.clientId]) {
        acc[project.clientId] = []
      }
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

  async createProject(data: ProjectDoc, clientId: string): Promise<void> {
    const projectsCollection = collection(db, projectsPath)

    await addDoc(projectsCollection, {
      clientId,
      ...data
    })
  },

  async updateProject(data: Partial<ProjectDoc>, projectId: string): Promise<void> {
    const newProjectRef = doc(db, projectsPath, projectId)
    await updateDoc(newProjectRef, data)
  },

  async deleteProject(projectId: string): Promise<void> {
    const newProjectRef = doc(db, projectsPath, projectId)
    await deleteDoc(newProjectRef)
  }
}
