import {Properties as DestProperties, Traits as DestTraits} from 'datatoggle-interface'
import {Properties, Traits} from './api_data'
import {ConfigReply, DestinationConfig, GlobalConfig} from './config'
import {DestinationWrapper} from './destination_wrapper'


class Datatoggle {

  destinations: DestinationWrapper[] = []

  init(apiKey: string){

    if (!apiKey){
      throw new Error("apiKey should not be null")
    }

    this._init(apiKey).then(r => "Datatoggle init completed")
  }

  private async _init(apiKey: string): Promise<void> {

    const response: Response = await fetch(`https://config.datatoggle.workers.dev/${apiKey}`)
    if(response.ok){
      const reply: ConfigReply = await response.json()
      let config: GlobalConfig = reply.config as GlobalConfig
      this.destinations = config.destinations.map((dc: DestinationConfig) => new DestinationWrapper(dc))
      this.destinations.forEach(d => d.init())
    } else {
      throw new Error(`error loading datatoggle config: '${response.statusText}'`)
    }
  }

  identify(userId: string, traits?: Traits): void {
    const destTraits = traits || {} as DestTraits
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.identify(userId, destTraits)
    })
  }

  track(event: string, properties?: Properties): void {
    const destProps = properties || {} as DestProperties
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.track(event, destProps)
    })
  }

  page(name: string, category?: string, properties?: Properties): void {
    const destProps = properties || {} as DestProperties
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.page(name, category || null, destProps)
    })
  }

}

const datatoggle: Datatoggle = new Datatoggle()
export default datatoggle
