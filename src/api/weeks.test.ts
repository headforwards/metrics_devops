import * as weeks from './weeks'

test('Get the week number given a date', () => {
    const today = new Date('November 28, 2018 16:18:00')
    expect(weeks.getWeekforDate(today)).toEqual(48)
})


test('Get the week number given a Monday', () => {
    const today = new Date('November 26, 2018 16:18:00')
    expect(weeks.getWeekforDate(today)).toEqual(48)
})

test('Get the week number given a Sunday', () => {
    const today = new Date('November 25, 2018 16:18:00')
    expect(weeks.getWeekforDate(today)).toEqual(47)
})

test('Get the date of Monday of the week given a date', () => {
    const day = new Date('November 28, 2018 16:18:00')
    const monday = new Date('2018-11-26T00:00:00.000Z')
    expect(weeks.getMondayOfSameWeek(day) instanceof Date)
    expect(weeks.getMondayOfSameWeek(day).getDay()).toEqual(1)
    expect(weeks.getMondayOfSameWeek(day)).toEqual(monday)
})

test('Get the end of Sunday for the week of a given date', () => {
    const day = new Date('November 28, 2018 16:18:00')
    const sundayNight = new Date('2018-12-02T23:59:59.999Z')
    expect(weeks.getEndofSundayOfSameWeek(day) instanceof Date)
    expect(weeks.getEndofSundayOfSameWeek(day).getDay()).toEqual(0)
    expect(weeks.getEndofSundayOfSameWeek(day)).toEqual(sundayNight)
})