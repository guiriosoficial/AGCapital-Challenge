interface Client extends NewClient{
  id: string
}

interface NewClient {
  name: string
}

export type {
  Client,
  NewClient
}
