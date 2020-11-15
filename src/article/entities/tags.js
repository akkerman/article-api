export default function makeTags (input) {
  if (Array.isArray(input)) { return input }
  if (typeof input === 'string') { return input.split(', ') }

  return []
}
