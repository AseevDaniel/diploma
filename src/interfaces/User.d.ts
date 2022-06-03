type email = string
type password = string
type name = string
type phone = string
type address = string
type uid = string

export interface User {
    email: email
    password: password
}

export interface UserWithData {
    email: email
    uid: uid
    name?: name
    phone?: phone
    address?: address
}
