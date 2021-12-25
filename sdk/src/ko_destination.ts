import {DatatoggleDestination} from '@datatoggle/destination-interface'
import {Properties, Traits} from './api_data'

export class KoDestination implements DatatoggleDestination {

  async init(config: object): Promise<void> {
    return Promise.resolve()
  }

  identify(userId: string, traits: Traits): void {
  }

  page(name: string, category: string | null, properties: Properties): void {
  }

  track(event: string, properties: Properties): void {
  }

}
