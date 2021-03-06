const {app, globalShortcut} = require('electron')
const clipboardy = require('clipboardy')
const notifier = require('node-notifier')
const path = require('path')

const KEY_COMBINATION = 'CommandOrControl+shift+c'

app.on('ready', () => {

  const icon = path.join(__dirname, 'icon.jpg')

  notifier.notify({
    title: 'Clipboard clearer',
    message: `I'm running in the background. Press ${KEY_COMBINATION} to clear your clipboard.`,
    icon,
    sound: false,
    wait: false,
  })

  const ret = globalShortcut.register(KEY_COMBINATION, () => {
    console.log(`${new Date().toLocaleString()} > Clearing ran with our key combination (${KEY_COMBINATION})`)
    clipboardy.writeSync('')
    notifier.notify({
      title: 'Clipboard clearer',
      message: `Clipboard cleared`,
      icon,
      sound: false,
      wait: false,
    })
  })

  if (!ret) {
    console.log('Registration of our key combination failed :(')
  }
})
