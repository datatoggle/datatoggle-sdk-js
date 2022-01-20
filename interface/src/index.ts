
export interface DestAddress {
  city?: string
  country?: string
}

export interface DestCompany {
  name?: string
  id?: string
  industry?: string
  employee_count?: number
  plan?: string
}

export interface DestTraits {
  address?: DestAddress
  age?: number
  avatar?: string
  birthday?: Date
  company?: DestCompany
  createdAt?: Date
  description?: string
  email?: string
  firstName?: string
  gender?: string
  id?: string
  lastname?: string
  name?: string
  phone?: string
  title?: string
  username?: string
  website?: string
  [key: string]: unknown
}

export interface DestProperties {
  [key: string]: unknown
}

export interface DatatoggleDestination {
  init(config: object): Promise<void> // return true if init is ok
  identify(userId: string | null, traits: DestTraits): void
  track(event: string, properties: DestProperties): void
  page(category: string | null, name: string | null, properties: DestProperties): void
}
