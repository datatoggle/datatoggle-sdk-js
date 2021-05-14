import {Properties as IntProperties, Traits as IntTraits, DatatoggleIntegration} from 'datatoggle-interface'

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


// https://www.npmjs.com/package/load-script
export class Analytics {

  destinations: DatatoggleIntegration[] = []

  async init(apiKey: string): Promise<void> {
    const mixpanel = await import("https://cdn.jsdelivr.net/npm/@datatoggle/datatoggle-mixpanel/dist/datatoggle-mixpanel.js");
    const datatoggleMixpanel: DatatoggleIntegration = mixpanel.DatatoggleMixpanel as unknown as DatatoggleIntegration
    this.destinations.push(datatoggleMixpanel)
  }

  identify(userId?: string, traits?: Traits): void {
    const destTraits = traits as IntTraits
    this.destinations.find( (destination: DatatoggleIntegration) => {
      destination.identify(userId!!, destTraits)
    })
  }

  track(event: string, properties?: Properties): void {
    const intProps = properties as IntProperties
    this.destinations.find( (destination: DatatoggleIntegration) => {
      destination.track(event, intProps)
    })
  }

  page(category?: string, name?: string, properties?: Properties): void {

  }

}

export const analytics: Analytics = new Analytics()
