const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const CHARS_LENGTH = CHARS.length

export function randomId(size = 5) {
  let id = ''

  for (let i = 0; i < size; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS_LENGTH)]
  }

  return id
}
