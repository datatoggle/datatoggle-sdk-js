import {DatatoggleDestination, DestProperties, DestTraits} from '@datatoggle/destination-interface'

type __Destination__Config = {
 // TODO
}

export function buildDestination() : DatatoggleDestination {
  return new Datatoggle__Destination__()
}

class Datatoggle__Destination__ implements DatatoggleDestination {

  init(config: object): Promise<void> {
    const __destination__Config: __Destination__Config = config as __Destination__Config
    return Promise.resolve()
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
