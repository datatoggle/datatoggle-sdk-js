import {Properties as DestProperties, Traits as DestTraits} from '@datatoggle/destination-interface'
import {Properties, Traits} from './api_data'
import {ConfigReply, DestinationConfig, GlobalConfig} from './config'
import {DestinationWrapper} from './destination_wrapper'
import {Options} from './options'


class Datatoggle {

  private initCalled: boolean = false
  private destinations: DestinationWrapper[] = []
  private options: Options = new Options()

  init(apiKey: string, options?: Options){
    this.options = options || this.options
    if (!apiKey){
      throw new Error("apiKey should not be null")
    }
    if (this.initCalled){
      this.initCalled = true
      if (this.options.debug) {
        console.debug('[Datatoggle] init already called')
        return
      }
    }
    this._init(apiKey).then(() => "Datatoggle init completed")
  }

  private async _init(apiKey: string): Promise<void> {

    const response: Response = await fetch(`https://config.datatoggle.workers.dev/${apiKey}`)
    if(response.ok){
      const reply: ConfigReply = await response.json()
      let config: GlobalConfig = reply.config as GlobalConfig
      this.destinations = config.destinations.map((dc: DestinationConfig) => new DestinationWrapper(dc))
      this.destinations.forEach(d => d.init(this.options.debug))
    } else {
      throw new Error(`error loading datatoggle config: '${response.statusText}'`)
    }
  }

  identify(userId?: string, traits?: Traits): void {
    if (!userId && !traits){
      throw new Error(`either userId or traits should be set`)
    }
    if (this.options.debug){
      console.debug(`[Datatoggle] identify '${userId}/${traits}'`)
    }
    const destTraits = traits || {} as DestTraits
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.identify(userId || null, destTraits)
    })
  }

  track(event: string, properties?: Properties): void {
    if (this.options.debug){
      console.debug(`[Datatoggle] track '${event}'`)
    }
    const destProps = properties || {} as DestProperties
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.track(event, destProps)
    })
  }

  page(categoryOrName?: string, name?: string, properties?: Properties): void {
    let category: string | null
    if (categoryOrName && !name){
      name = categoryOrName
      category = null
    } else {
      category = categoryOrName || null
    }
    if (this.options.debug){
      console.debug(`[Datatoggle] page '${category}/${name}'`)
    }
    const destProps = properties || {} as DestProperties
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.page(category, name || null, destProps)
    })
  }

}

const datatoggle: Datatoggle = new Datatoggle()
export default datatoggle
export {Options}
