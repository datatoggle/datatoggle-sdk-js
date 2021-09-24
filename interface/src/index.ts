
export class Address {
  city?: string
  country?: string
}

export class Company {
  name?: string
  id?: string
  industry?: string
  employee_count?: number
  plan?: string
}

export class Traits {
  address?: Address
  age?: number
  avatar?: string
  birthday?: Date
  company?: Company
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
}

export class Properties {

}

export interface DatatoggleDestination {
  init(config: object): Promise<void> // return true if init is ok
  identify(userId: string | null, traits: Traits): void
  track(event: string, properties: Properties): void
  page(category: string | null, name: string | null, properties: Properties): void
}
