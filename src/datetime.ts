export const isLeapYear = (year: number) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)

const ticksPerMillisecond = 1
const ticksPerSecond = ticksPerMillisecond * 1000
const ticksPerMinute = ticksPerSecond * 60
const ticksPerHour = ticksPerMinute * 60
const ticksPerDay = ticksPerHour * 24

const daysPerYear = 365
const daysPer4Years = daysPerYear * 4 + 1
const daysPer100Years = daysPer4Years * 25 - 1
const daysPer400Years = daysPer100Years * 4 + 1

const monthsPerYear = 12

const daysToMonth365 = [
  0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365,
]
const daysToMonth366 = [
  0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366,
]

const daysInMonth = (year: number, month: number) => {
  const days = isLeapYear(year) ? daysToMonth366 : daysToMonth365
  return days[month] - days[month - 1]
}

const dateToTicks = (year: number, month: number, day: number) => {
  const days = isLeapYear(year) ? daysToMonth366 : daysToMonth365
  const y = year - 1
  const n =
    y * daysPerYear + y / 4 - y / 100 + y / 400 + days[month - 1] + day - 1
  return n * ticksPerDay
}

class Datetime {
  constructor(private readonly ticks: number) {}

  addMilliseconds(milliseconds: number) {
    return this.add(milliseconds * ticksPerMillisecond)
  }

  addSeconds(seconds: number) {
    return this.add(seconds * ticksPerSecond)
  }

  addMinutes(minutes: number) {
    return this.add(minutes * ticksPerMinute)
  }

  addHours(hours: number) {
    return this.add(hours * ticksPerHour)
  }

  addDays(days: number) {
    return this.add(days * ticksPerDay)
  }

  addMonths(months: number) {
    let [y, m, d] = this.getYMD()
    let i = m + months - 1
    if (i >= 0) {
      m = (i % monthsPerYear) + 1
      y += Math.floor(i / monthsPerYear)
    } else {
      m = monthsPerYear + ((i + 1) % monthsPerYear)
      y += (i - monthsPerYear + 1) / monthsPerYear
    }

    const days = daysInMonth(y, m)
    if (days > d) d = days

    return new Datetime(dateToTicks(y, m, d) + (this.ticks % ticksPerDay))
  }

  addYears(years: number) {
    return this.addMonths(years * monthsPerYear)
  }

  private add(ticks: number) {
    return new Datetime(ticks)
  }

  private getYMD(): [number, number, number] {
    let days = Math.floor(this.ticks / ticksPerDay)
    const y400 = Math.floor(days / daysPer400Years)
    days -= y400 * daysPer400Years
    let y100 = Math.floor(days / daysPer100Years)
    if (y100 == 4) y100 = 3
    days -= y100 * daysPer100Years
    const y4 = Math.floor(days / daysPer4Years)
    days -= y4 * daysPer4Years
    let y1 = Math.floor(days / daysPerYear)
    if (y1 == 4) y1 = 3
    days -= y1 * daysPerYear
    const year = y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1
    const d = isLeapYear(year) ? daysToMonth366 : daysToMonth365
    // 先除以32，大概定位下
    let month = (days >> 5) + 1
    while (days >= d[month]) month++
    const day = days - d[month - 1] + 1
    return [year, month, day]
  }
}
