import {DestinationConfig} from './config'
import {DatatoggleDestination} from '../../interface'
import {WaitingDestination} from './waiting_destination'
import {Properties, Traits} from './api_data'
import {KoDestination} from './ko_destination'
import $script = require('scriptjs')

export class DestinationWrapper {
  debug: boolean = false
  destConfig: DestinationConfig
  destination: DatatoggleDestination = new WaitingDestination()

  constructor(destConfig: DestinationConfig) {
    this.destConfig = destConfig
  }

  init(debug: boolean) {
    this.debug = debug

    $script(this.destConfig.scriptUrl, async () => {
      await this.initOnScriptLoaded()
    })
  }

  private logError(exception: any, call: string, event: string | null): void {
    console.warn(`[Datatoggle] '${call}(${event})' failed for destination '${this.destConfig.name}'.
    Exception: '${exception}'
    `)
  }

  private async initOnScriptLoaded(){
    try {
      // @ts-ignore
      const res = window[this.destConfig.scriptName]
      // @ts-ignore
      const dest: DatatoggleDestination = res.buildDestination() as unknown as DatatoggleDestination
      await dest.init(this.destConfig.destinationSpecificConfig);
      if (this.debug){
        console.debug(`[Datatoggle] Destination ${this.destConfig.name} initialized`)
      }
      (this.destination as WaitingDestination).flushEvents(dest)
      this.destination = dest
    } catch (e) {
      this.logError(e,'init',null);
      this.destination = new KoDestination()
    }
  }

  identify(userId: string | null, traits: Traits): void {
    try {
      this.destination.identify(userId, traits)
    } catch (e) {
      this.logError(e,'identify',userId);
    }

  }

  page(category: string | null, name: string | null, properties: Properties): void {
    try {
      this.destination.page(category, name, properties)
    } catch (e) {
      this.logError(e,'page',name||category);
    }
  }

  track(event: string, properties: Properties): void {
    try {
      this.destination.track(event, properties)
    } catch (e) {
      this.logError(e,'track',event);
    }
  }

}
