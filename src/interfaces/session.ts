type sessionDate = string
type sessionPhone = string

export interface Session {
    name: string
    phone: sessionPhone
    startDate: sessionDate
    endDate: sessionDate
}