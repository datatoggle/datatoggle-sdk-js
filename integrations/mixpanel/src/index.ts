import mixpanel from 'mixpanel-browser'
import {DatatoggleIntegration, Properties, Traits} from 'datatoggle-interface'

type MixpanelConfig = {
  project_token: string
  eu_residency: number
}

export class DatatoggleMixpanel implements DatatoggleIntegration {

  init(config: object): void {
    const mixpanelConfig: MixpanelConfig = config as MixpanelConfig
    const token: string = mixpanelConfig.project_token
    let mixpanelParams = {}
    if (mixpanelConfig.eu_residency){
      mixpanelParams = {
        api_host: "https://api-eu.mixpanel.com",
      }
    }
    mixpanel.init(token, mixpanelParams)
  }

  identify(userId: string, traits: Traits): void {
    mixpanel.identify(userId)
    mixpanel.people.set(traits)
  }

  page(category: string | null, name: string | null, properties: Properties): void {
    mixpanel.track(
      "Loaded a Page",
      {
        category: category,
        name: name,
        ...properties
      }
    )
  }

  track(event: string, properties: Properties): void {
    mixpanel.track(event, properties)
  }



}
