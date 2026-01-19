import type { Client, ClientForm } from '@/models/clientModel'

export type IClientFormDialogProps = Omit<Client, 'id'> & Partial<Pick<Client, 'id'>>

export interface IClientFormDialogEmits {
  (e: 'submit:create', client: ClientForm): void
  (e: 'submit:update', client: Client): void
}
