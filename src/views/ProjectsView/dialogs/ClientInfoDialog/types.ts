import type { Client, ClientForm } from '@/models/clientModel'

export type IClientFormDialogProps = Client | undefined

export interface IClientInfoDialogProps {
  loading?: boolean
}

export interface IClientFormDialogEmits {
  (e: 'submit:create', client: ClientForm): void
  (e: 'submit:update', client: Client): void
}
