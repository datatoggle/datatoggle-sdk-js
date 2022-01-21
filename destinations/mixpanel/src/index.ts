import mixpanel from 'mixpanel-browser'
import {DatatoggleDestination, DestProperties, DestTraits} from '@datatoggle/destination-interface'
import {toMixpanelPeople} from './identify_mapping'

type MixpanelConfig = {
  token: string
  config: object
}

export function buildDestination() : DatatoggleDestination {
  return new DatatoggleMixpanel()
}

class DatatoggleMixpanel implements DatatoggleDestination {

  init(config: object): Promise<void> {
    const mixpanelConfig: MixpanelConfig = config as MixpanelConfig
    const token: string = mixpanelConfig.token
    mixpanel.init(token, mixpanelConfig.config)
    return Promise.resolve()
  }

  identify(userId: string | null, traits: DestTraits): void {
    mixpanel.identify(userId || undefined)
    const mixpanelPeople = toMixpanelPeople(traits)
    mixpanel.people.set(mixpanelPeople)
  }

  page(category: string | null, name: string | null, properties: DestProperties): void {
    mixpanel.track(
      "Loaded a Page",
      {
        name: name,
        category: category,
        ...properties
      }
    )
  }

  track(event: string, properties: DestProperties): void {
    mixpanel.track(event, properties)
  }

}
