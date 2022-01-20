import {DatatoggleDestination, DestProperties, DestTraits} from '@datatoggle/destination-interface'

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

  identify(userId: string, traits: DestTraits): void {
    // TODO
  }

  page(name: string, category: string | null, properties: DestProperties): void {
    // TODO
  }

  track(event: string, properties: DestProperties): void {
    // TODO
  }



}
