const secondsPerMinute = 60
const minutesPerHour = 60
const hoursPerDay = 24

const millisPerSecond = 1000
const millisPerMinute = millisPerSecond * secondsPerMinute
const millisPerHour = millisPerMinute * minutesPerHour
const millisPerDay = millisPerHour * hoursPerDay

const ticksPerMillisecond = 1
const ticksPerSecond = ticksPerMillisecond * millisPerSecond
const ticksPerMinute = ticksPerSecond * secondsPerMinute
const ticksPerHour = ticksPerMinute * minutesPerHour
const ticksPerDay = ticksPerHour * hoursPerDay

class DateTime {
  private readonly data: number

  constructor(ticks: number) {
    this.data = ticks
  }

  addTicks(value: number) {
    return this.add(value, 1)
  }

  addMilliseconds(value: number) {
    return this.add(value, ticksPerMillisecond)
  }

  addSeconds(value: number) {
    return this.add(value, ticksPerSecond)
  }

  addMinutes(value: number) {
    return this.add(value, ticksPerMinute)
  }

  addHours(value: number) {
    return this.add(value, ticksPerHour)
  }

  addDays(value: number) {
    return this.add(value, ticksPerDay)
  }

  addMonths(value: number) {
    const [y, m, d] = this.getYMD()
  }

  private add(value: number, scale: number): DateTime {
    return new DateTime(value * scale)
  }

  private getYMD(): [number, number, number] {
    const date = new Date(this.data / ticksPerMillisecond)
    return [date.getFullYear(), date.getMonth(), date.getDate()]
  }
}
