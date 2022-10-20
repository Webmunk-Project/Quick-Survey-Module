/* global registerCustomExtension, registerMessageHandler */

const fetchSurvey = function (request, sender, sendResponse) {
  if (request.content === 'fetch_quick_survey') {
    const payload = [{
      key: 'test-multiple',
      prompt: {
        en: 'Which numbers below do you like?'
      },
      'prompt-type': 'select-multiple',
      options: [{
        label: {
          en: '1'
        },
        value: '1'
      }, {
        label: {
          en: '2'
        },
        value: '2'
      }, {
        label: {
          en: '3'
        },
        value: '3'
      }, {
        label: {
          en: '4'
        },
        value: '4'
      }, {
        label: {
          en: '5'
        },
        value: '5'
      }]
    }, {
      key: 'test-single',
      prompt: {
        en: 'Which color below is your favorite?'
      },
      'prompt-type': 'select-one',
      options: [{
        label: {
          en: 'red'
        },
        value: 'red'
      }, {
        label: {
          en: 'blue'
        },
        value: 'blue'
      }, {
        label: {
          en: 'green'
        },
        value: 'green'
      }]
    }, {
      key: 'test-line',
      prompt: {
        en: 'Type your favorite word below.'
      },
      'prompt-type': 'single-line'
    }, {
      key: 'test-line',
      text: {
        en: 'This is read-only text. Nothing to do here.'
      },
      'prompt-type': 'read-only-text'
    }]

    sendResponse(payload)

    return true
  }

  return false
}

registerCustomExtension(function (config) {
  console.log('[Quick Survey] Initialized.')

  registerMessageHandler('fetch_quick_survey', fetchSurvey)
})
