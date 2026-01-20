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

  async createClient(payload: ClientDoc): Promise<ProjectsByClient> {
    const clientCollection = collection(db, clientsPath)
    const docRef = await addDoc(clientCollection, payload)

    return {
      id: docRef.id,
      projects: [],
      ...payload
    }
  },

  async updateClient(payload: ClientDoc, clientId: string): Promise<void> {
    const clientRef = doc(db, clientsPath, clientId)
    await updateDoc(clientRef, payload)
  },

  async deleteClient(clientId: string): Promise<void> {
    const clientRef = doc(db, clientsPath, clientId)
    await deleteDoc(clientRef)
  }
}

const clientConverter: FirestoreDataConverter<Client> = {
  toFirestore(modelObject) {
    const { id: _id, ...form } = modelObject
    return form
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data() as ClientDoc

    return {
      id: snapshot.id,
      ...data
    }
  }
}
