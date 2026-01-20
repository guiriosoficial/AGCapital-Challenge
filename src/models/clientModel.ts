export interface Client {
  id: string
  name: string
}

export type ClientDoc = Omit<Client, 'id'>

export class ClientForm implements ClientDoc {
  name: string = ''
}
