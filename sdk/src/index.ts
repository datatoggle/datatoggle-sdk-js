import {Properties as DestProperties, Traits as DestTraits} from '@datatoggle/destination-interface'
import {Properties, Traits} from './api_data'
import {ConfigReply, DestinationConfig, GlobalConfig} from './config'
import {DestinationWrapper} from './destination_wrapper'
import {Options} from './options'


interface Datatoggle {

  init(apiKey: string, options?: Options): void
  identify(userId?: string, traits?: Traits): void
  track(event: string, properties?: Properties): void
  page(name?: string, properties?: Properties): void
  page(category: string, name: string, propertiesWithCat?: Properties): void
}

class DatatoggleImpl implements Datatoggle {

  private initCalled: boolean = false
  private destinations: DestinationWrapper[] = []
  private options: Options = new Options()

  init(apiKey: string, options?: Options){
    this.options = options || this.options
    if (!apiKey){
      throw new Error("apiKey should not be null")
    }
    if (this.initCalled){
      if (this.options.debug) {
        console.debug('[Datatoggle] init already called')
      }
      return
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
      console.debug(`[Datatoggle] identify '${userId}'`)
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

  page(
    categoryOrName?: string,
    nameOrProperties?: Properties | string,
    propertiesIfCat?: Properties): void {

    let category: string | null
    let name: string | null
    let properties: Properties | null

    if (!nameOrProperties){
      // if second param is null, it's properties because name is mandatory when category is set
      category = null
      name = categoryOrName || null
      properties = null
    } else if (typeof nameOrProperties === "string"){
      category = categoryOrName as string
      name = nameOrProperties
      properties = propertiesIfCat || null
    } else { // nameOrProperties is Properties
      category = null
      name = categoryOrName || null
      properties = nameOrProperties
    }

    if (this.options.debug){
      console.debug(`[Datatoggle] page '${name}'`)
    }
    const destProps = properties || {} as DestProperties
    this.destinations.forEach( (destination: DestinationWrapper) => {
      destination.page(category, name || null, destProps)
    })
  }


}


const datatoggle: Datatoggle = new DatatoggleImpl()
export default datatoggle
export {Options}
