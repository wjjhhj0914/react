export type Timeout = ReturnType<typeof setTimeout> | number | undefined

export type Status = 'idle' | 'pending' | 'resolved' | 'rejected'

export interface State<Type> {
  status: Status
  error: null | Error
  data: null | Type
}
