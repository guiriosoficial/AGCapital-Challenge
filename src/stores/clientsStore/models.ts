export interface Client {
  id: string
  name: string
}

export type NewClient = Omit<Client, 'id'>

