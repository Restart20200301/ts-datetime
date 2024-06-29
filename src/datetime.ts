const ticksPerMillisecond = 1
const ticksPerSecond = ticksPerMillisecond * 1000
const ticksPerMinute = ticksPerSecond * 60
const ticksPerHour = ticksPerMinute * 60
const ticksPerDay = ticksPerHour * 24

const daysPerYear = 365
const daysPer4Years = daysPerYear * 4 + 1
const daysPer100Years = daysPer4Years * 25 - 1
const daysPer400Years = daysPer100Years * 4 + 1

class Datetime {
  constructor(private readonly ticks: number) {}

  addMilliseconds(value: number) {
    return this.add(value * ticksPerMillisecond)
  }

  addSeconds(value: number) {
    return this.add(value * ticksPerSecond)
  }

  addMinutes(value: number) {
    return this.add(value * ticksPerMinute)
  }

  addHours(value: number) {
    return this.add(value * ticksPerHour)
  }

  addDays(value: number) {
    return this.add(value * ticksPerDay)
  }

  addMonths(value: number) {}

  addYears(value: number) {}

  private add(ticks: number) {
    return new Datetime(ticks)
  }
}
