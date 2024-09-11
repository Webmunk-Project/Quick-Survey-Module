/* global chrome */

if (window.generateHtml === undefined) {
  const quickSurveyLocalizedValue = function (holder) {
    const language = (window.questionKitLanguage || navigator.language || navigator.systemLanguage || navigator.userLanguage || 'en').substr(0, 2).toLowerCase()

    let value = holder[language]

    if (value === undefined) {
      value = holder.en
    }

    if (value === undefined) {
      value = JSON.stringify(holder)
    }

    return value
  }

  const fetchReadOnlyText = function (prompt) {
    let htmlCode = '<div style="margin-bottom: 8px;">'

    htmlCode += quickSurveyLocalizedValue(prompt.text)

    htmlCode += '</div>'

    return htmlCode
  }

  const fetchSingleLine = function (prompt) {
    let htmlCode = '<div style="margin-bottom: 8px;">'

    htmlCode += '<div style="padding: 4px; margin-bottom: 2px;">' + quickSurveyLocalizedValue(prompt.prompt) + '</div>'

    htmlCode += '<input type="text" name="' + prompt.key + '" style="border: thin solid #808080; border-radius: 4px; width: 100%; padding: 4px;" />'

    htmlCode += '</div>'

    return htmlCode
  }

  const fetchSelectMultiple = function (prompt) {
    let htmlCode = '<div style="margin-bottom: 8px;">'

    htmlCode += '<div style="padding: 4px; margin-bottom: 2px;">' + quickSurveyLocalizedValue(prompt.prompt) + '</div>'

    prompt.options.forEach(function (option) {
      htmlCode += '<div><input type="checkbox" name="' + prompt.key + '" value="' + option.value + '"><label style="display: inline-block; margin-left: 8px;">' + quickSurveyLocalizedValue(option.label) + '</label></div>'
    })

    htmlCode += '</div>'

    return htmlCode
  }

  const fetchSelectOne = function (prompt) {
    let htmlCode = '<div style="margin-bottom: 8px;">'

    htmlCode += '<div style="padding: 4px; margin-bottom: 2px;">' + quickSurveyLocalizedValue(prompt.prompt) + '</div>'

    prompt.options.forEach(function (option) {
      htmlCode += '<div><input type="radio" name="' + prompt.key + '" value="' + option.value + '"><label style="display: inline-block; margin-left: 8px;">' + quickSurveyLocalizedValue(option.label) + '</label></div>'
    })

    htmlCode += '</div>'

    return htmlCode
  }

  window.generateHtml = function (prompts) {
    let htmlCode = '<div id="quick_survey" style="display: none; z-index: 99999; width: 320px; background-color: white; position: fixed; top: 16px; right: 16px; padding: 8px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5); font-family: \'Tahoma\', sans-serif; font-size: 10pt; border-radius: 4px">'

    prompts.forEach(function (prompt) {
      if (prompt['prompt-type'] === 'select-multiple') {
        htmlCode += fetchSelectMultiple(prompt)
      } else if (prompt['prompt-type'] === 'select-one') {
        htmlCode += fetchSelectOne(prompt)
      } else if (prompt['prompt-type'] === 'single-line') {
        htmlCode += fetchSingleLine(prompt)
      } else if (prompt['prompt-type'] === 'read-only-text') {
        htmlCode += fetchReadOnlyText(prompt)
      }
    })

    htmlCode += '<button style="width: 100%; min-height: 44px; border: thin solid #424242; background-color: #616161; color: #EEEEEE; font-weight: bold; border-radius: 4px; margin-top: 8px; text-transform: uppercase;">Submit Responses</button>'

    htmlCode += '</div>'
    htmlCode += '<script></script>'

    return htmlCode
  }
}

window.registerModuleCallback(function (config) {
  console.log('QS')
  console.log(config)

  chrome.runtime.sendMessage({
    content: 'fetch_quick_survey',
    config: config,
    url: window.location.href
  }, function (response) {
    console.log('[Quick Survey] Received response:')
    console.log(response)
    
    if (response.survey !== undefined && response.survey !== null) {
		window.setTimeout(function () {
		  const htmlCode = window.generateHtml(response.survey)

		  console.log('[Quick Survey] HTML:')
		  console.log(htmlCode)

		  const wrapper = document.createElement('div')
		  wrapper.innerHTML = htmlCode

		  document.querySelector('body').appendChild(wrapper.firstChild)

		  const survey = document.getElementById('quick_survey')

		  survey.style.setProperty('display', 'block')
		}, 2500)
	}
  })
})
