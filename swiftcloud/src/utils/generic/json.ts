export const parseJsonWithCatch = (input: string | null | undefined) => {
  if (!input) return input
  try {
    return JSON.parse(input.replace('“', '"').replace('”', '"'))
  } catch (e) {
    return input
  }
}
