import {DatatoggleDestination, Properties, Traits} from 'datatoggle-interface'

type SegmentConfig = {
  write_key: string
}

export function buildDestination() : DatatoggleDestination {
  return new DatatoggleSegment()
}

class DatatoggleSegment implements DatatoggleDestination {

  init(config: object): Promise<void> {
    const segmentConfig: SegmentConfig = config as SegmentConfig
    const writeKey: string = segmentConfig.write_key;
    // from
    (function(){
      // Create a queue, but don't obliterate an existing one!
      // @ts-ignore https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/
      var analytics = window.analytics = window.analytics || [];
      // If the real analytics.js is already on the page return.
      // @ts-ignore
      if (analytics.initialize) return;
      // If the snippet was invoked already show an error.
      // @ts-ignore
      if (analytics.invoked) {
        if (window.console && console.error) {
          console.error('Segment snippet included twice.');
        }
        return;
      }
      // Invoked flag, to make sure the snippet
      // is never invoked twice.
      // @ts-ignore
      analytics.invoked = true;
      // A list of the methods in Analytics.js to stub.
      // @ts-ignore
      analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on',
        'addSourceMiddleware',
        'addIntegrationMiddleware',
        'setAnonymousId',
        'addDestinationMiddleware'
      ];
      // Define a factory to create stubs. These are placeholders
      // for methods in Analytics.js so that you never have to wait
      // for it to load to actually record data. The `method` is
      // stored as the first argument, so we can replay the data.
      // @ts-ignore
      analytics.factory = function(method){
        return function(){
          var args = Array.prototype.slice.call(arguments);
          args.unshift(method);
          // @ts-ignore
          analytics.push(args);
          return analytics;
        };
      };
      // For each of our methods, generate a queueing stub.
      // @ts-ignore
      for (var i = 0; i < analytics.methods.length; i++) {
        // @ts-ignore
        var key = analytics.methods[i];
        // @ts-ignore
        analytics[key] = analytics.factory(key);
      }
      // Define a method to load Analytics.js from our CDN,
      // and that will be sure to only ever load it once.
      // @ts-ignore
      analytics.load = function(key, options){
        // Create an async script element based on your key.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.segment.com/analytics.js/v1/'
          + key + '/analytics.min.js';
        // Insert our script next to the first script element.
        var first = document.getElementsByTagName('script')[0];
        // @ts-ignore
        first.parentNode.insertBefore(script, first);
        // @ts-ignore
        analytics._loadOptions = options;
      };
      // @ts-ignore
      analytics._writeKey = writeKey
      // Add a version to keep track of what's in the wild.
      // @ts-ignore
      analytics.SNIPPET_VERSION = '4.13.2';
      // Load Analytics.js with your key, which will automatically
      // load the tools you've enabled for your account. Boosh!
      analytics.load(writeKey);
      // Make the first page call to load the integrations. If
      // you'd like to manually name or tag the page, edit or
      // move this call however you'd like.
      analytics.page();
    })();
    return Promise.resolve()
  }

  identify(userId: string, traits: Traits): void {
    analytics.identify(userId, traits)
  }

  page(name: string, category: string | null, properties: Properties): void {
    analytics.page(category || undefined, name, properties)
  }

  track(event: string, properties: Properties): void {
    analytics.track(event, properties)
  }



}
