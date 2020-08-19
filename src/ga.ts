import galite from 'ga-lite'

export default function ga(command: string, ...values: string[]) {
  // Disable analytics for firefox
  if (!/Firefox/.test(navigator.userAgent)) {
    galite(command, ...values)
  }
}
