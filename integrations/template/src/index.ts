import {DatatoggleDestination, Properties, Traits} from 'datatoggle-interface'

type ${Destination}Config = {
 // TODO
}

export function buildDestination() : DatatoggleDestination {
  return new Datatoggle${Destination}()
}

class Datatoggle${Destination} implements DatatoggleDestination {

  init(config: object): Promise<void> {
    const mixpanelConfig: ${Destination}Config = config as ${Destination}Config
    // TODO
  }

  identify(userId: string, traits: Traits): void {
    // TODO
  }

  page(name: string, category: string | null, properties: Properties): void {
    // TODO
  }

  track(event: string, properties: Properties): void {
    // TODO
  }



}
