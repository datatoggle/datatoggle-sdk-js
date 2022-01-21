export interface Address {
  city?: string
  country?: string
}

export interface Company {
  name?: string
  id?: string
  industry?: string
  employee_count?: number
  plan?: string
}

export interface Traits {
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
  lastName?: string
  name?: string
  phone?: string
  title?: string
  username?: string
  website?: string
  [key: string]: unknown
}

export interface Properties {
  [key: string]: unknown;
}
