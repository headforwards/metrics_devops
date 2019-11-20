import moment from 'moment'

export function getWeekforDate(date: Date): number {
    const weeknum = moment(date).isoWeek()
    return weeknum
}

export function getMondayOfSameWeek(date: Date): Date {
    const mondayOfWeek = moment(date).startOf('isoWeek').toDate()
    return mondayOfWeek
}

export function getEndofSundayOfSameWeek(date: Date): Date {
    const sundayOfWeek = moment(date).endOf('isoWeek').toDate()
    return sundayOfWeek
}

const testFunc = (a: Date): Date => {
    return new Date()
}
