import { db } from '@/plugins/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite'
import type { Client, ClientDoc } from '@/models/clientModel'

const clientsPath = 'clients'

export const clientsService = {
  async searchClients(): Promise<Client[]> {
    const clientsCollection = collection(db, clientsPath)
    const clientsSnap = await getDocs(clientsCollection)

    return clientsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() as ClientDoc
    }))
  },

  async createClient(data: ClientDoc): Promise<string> {
    const clientCollection = collection(db, clientsPath)
    const docRef = await addDoc(clientCollection, { ...data })
    return docRef.id
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
