// from 30 seconds of code
export const arrayEqualsPreserveOrder = (a: any[], b: any[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

export const arrayEquals = (a: any[], b: any[]) =>
  arrayEqualsPreserveOrder(a.sort(), b.sort())
