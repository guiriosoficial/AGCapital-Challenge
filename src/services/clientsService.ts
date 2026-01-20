import { db } from '@/plugins/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, type FirestoreDataConverter, type QueryDocumentSnapshot } from 'firebase/firestore/lite'
import type { Client, ClientDoc } from '@/models/clientModel'
import type { ProjectsByClient } from '@/models/projectModel'

const clientsPath = 'clients'

export const clientsService = {
  async searchClients(): Promise<Client[]> {
    const clientsCollection = collection(db, clientsPath).withConverter(clientConverter)
    const clientsSnap = await getDocs(clientsCollection)

    return clientsSnap.docs.map(d => d.data())
  },

  async createClient(data: ClientDoc): Promise<ProjectsByClient> {
    const clientCollection = collection(db, clientsPath)
    const docRef = await addDoc(clientCollection, { ...data })

    return {
      id: docRef.id,
      projects: [],
      ...data
    }
  },

  async updateClient(data: ClientDoc, clientId: string): Promise<void> {
    const clientRef = doc(db, clientsPath, clientId)
    await updateDoc(clientRef, data)
  },

  async deleteClient(clientId: string): Promise<void> {
    const clientRef = doc(db, clientsPath, clientId)
    await deleteDoc(clientRef)
  }
}

const clientConverter: FirestoreDataConverter<Client> = {
  fromFirestore(snapshot: QueryDocumentSnapshot): Client {
    const data = snapshot.data() as ClientDoc

    return {
      id: snapshot.id,
      ...data
    }
  }
}
