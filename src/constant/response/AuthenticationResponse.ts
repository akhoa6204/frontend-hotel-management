import type { UserShortResponse } from "./UserShortResponse"

export type AuthenticationResponse = { 
    authenticated: boolean
    token: string
    user: UserShortResponse
}
