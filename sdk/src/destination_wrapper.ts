import {DestinationConfig} from './config'
import {DatatoggleDestination} from '../../interface'
import {WaitingDestination} from './waiting_destination'
import {Properties, Traits} from './api_data'
import $script = require('scriptjs')

class KoDestination implements DatatoggleDestination {

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

export class DestinationWrapper {
  initCalled: boolean = false
  destConfig: DestinationConfig
  destination: DatatoggleDestination = new WaitingDestination()

  constructor(destConfig: DestinationConfig) {
    this.destConfig = destConfig
  }

  init() {
    if (this.initCalled) return
    this.initCalled = true

    $script(this.destConfig.scriptUrl, async () => {
      await this.initOnScriptLoaded()
    })
  }

  private async initOnScriptLoaded(){
    // @ts-ignore
    const res = window[this.destConfig.scriptName]
    // @ts-ignore
    const dest: DatatoggleDestination = res.buildDestination() as unknown as DatatoggleDestination
    try {
      await dest.init(this.destConfig.destinationSpecificConfig);
      (this.destination as WaitingDestination).flushEvents(dest)
      this.destination = dest
    } catch (e) {
      console.warn(`Destination ${this.destConfig.name} could not be loaded bu Datatoggle`)
      this.destination = new KoDestination()
    }
  }

  identify(userId: string, traits: Traits): void {
    this.destination.identify(userId, traits)
  }

  page(name: string, category: string | null, properties: Properties): void {
    this.destination.page(name, category, properties)
  }

  track(event: string, properties: Properties): void {
    this.destination.track(event, properties)
  }

}