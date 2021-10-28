import mixpanel from 'mixpanel-browser'
import {DatatoggleDestination, Properties, Traits} from 'datatoggle-interface'

type MixpanelConfig = {
  project_token: string
  config: object
}

export function buildDestination() : DatatoggleDestination {
  return new DatatoggleMixpanel()
}

class DatatoggleMixpanel implements DatatoggleDestination {

  init(config: object): Promise<void> {
    const mixpanelConfig: MixpanelConfig = config as MixpanelConfig
    const token: string = mixpanelConfig.project_token
    mixpanel.init(token, mixpanelConfig.config)
    return Promise.resolve()
  }

  identify(userId: string | null, traits: Traits): void {
    mixpanel.identify(userId || undefined)
    mixpanel.people.set(traits)
  }

  page(category: string | null, name: string | null, properties: Properties): void {
    mixpanel.track(
      "Loaded a Page",
      {
        name: name,
        category: category,
        ...properties
      }
    )
  }

  track(event: string, properties: Properties): void {
    mixpanel.track(event, properties)
  }

}
