function toString(str) {
  if (str === null || str === undefined) { return '' }
  return String(str)
}

export function dasherize(str) {
  return toString(str).trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase()
}

export function titleCase(str) {
  return toString(str).replace(/\b\w/g, l => l.toUpperCase())
}

export function plural(num, singular, plural) {
  return (num === 1 || num === '1') ? singular : plural
}

export function concat(left, right, sep) {
  if (!sep) { sep = ' ' }
  const a = toString(left).trim()
  const b = toString(right).trim()
  if (a && b) { return `${a}${sep}${b}` }
  if (a) { return a }
  if (b) { return b }
  return ''
}

export function firstLastName(first, last) {
  return concat(first, last)
}

export function lastFirstName(last, first) {
  return concat(last, first, ', ')
}

export function isBlank(str) {
  return toString(str).trim().length === 0
}

export function isBlankOrZero(str) {
  const s = toString(str).trim()
  return s.length === 0 || s === '0'
}

export function notBlank(str) {
  return !isBlank(str)
}

export function padLeft(str, padChar, len) {
  if (!str || !padChar || !len) { return '' }
  if (str.length >= len) { return str }
  const pad = Array(len + 1).join(padChar)
  return pad.substring(str.length) + str
}
