/* global registerCustomModule, registerMessageHandler */

const fetchSurvey = function (request, sender, sendResponse) {
  if (request.content === 'fetch_quick_survey') {
    const config = request.config['quick-survey']
    const pageUrl = "" + request.url
    
    console.log('URL: ')
    console.log(pageUrl)
    
    if (config !== undefined && config.enabled === true) {
		const requireUrls = config['require-urls']

		console.log('requireUrls: ')
		console.log(requireUrls)
		
		for (const pattern in Object.keys(requireUrls)) {
			console.log('TEST: ' + pageUrl + ' =~ ' + pattern)

			if (true || pageUrl.match(pattern)) {
			   console.log('[Quick Survey] "' + pattern + '" matches "' + pageUrl + '".')
	   
			   // TODO - scheduling
	   
			   // TODO - cookies 
	
				sendResponse({
					survey: requireUrls[pattern].survey
				})
			}
		}
    }

    sendResponse({})
  }
}

registerCustomModule(function (config) {
  console.log('[Quick Survey] Initialized.')

  registerMessageHandler('fetch_quick_survey', fetchSurvey)
})
