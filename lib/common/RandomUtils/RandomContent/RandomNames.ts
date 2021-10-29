import { RandElem } from '../RandomArrayUtils'
import { capitiliseEveryWord } from '../../StringUtils'

export const getRandomFirstName = (male?: boolean) => {
  return RandElem(
    male === undefined ? FirstNames : male ? MaleFirstNames : FemaleFirstNames
  )
}
export const getRandomLastName = () => {
  return RandElem(LastNames)
}
export const getRandomFullName = (male?: boolean) => {
  return getRandomFirstName(male) + ' ' + getRandomLastName()
}

const MaleFirstNames = [
  'DAVID',
  'JOHN',
  'PAUL',
  'MICHAEL',
  'ANDREW',
  'MARK',
  'JAMES',
  'PETER',
  'ROBERT',
  'STEPHEN',
  'RICHARD',
  'CHRISTOPHER',
  'DANIEL',
  'IAN',
  'SIMON',
  'ANTHONY',
  'THOMAS',
  'ALAN',
  'MARTIN',
  'MATTHEW',
  'STEVEN',
  'DAVID JOHN',
  'WILLIAM',
  'KEVIN',
  'GARY',
  'MICHAEL JOHN',
  'BRIAN',
  'JONATHAN',
  'PHILIP',
  'NEIL',
  'NICHOLAS',
  'ADAM',
  'COLIN'
].map(capitiliseEveryWord)

const FemaleFirstNames = [
  'SUSAN',
  'SARAH',
  'KAREN',
  'JULIE',
  'ELIZABETH',
  'HELEN'
].map(capitiliseEveryWord)

export const FirstNames = MaleFirstNames.concat(FemaleFirstNames)
export const LastNames = [
  'SMITH',
  'JONES',
  'WILLIAMS',
  'BROWN',
  'TAYLOR',
  'WILSON',
  'DAVIES',
  'THOMAS',
  'JOHNSON',
  'EVANS',
  'THOMPSON',
  'ROBERTS',
  'ROBINSON',
  'WALKER',
  'WRIGHT',
  'WHITE',
  'MARTIN',
  'HARRIS',
  'LEWIS',
  'GREEN',
  'HUGHES',
  'EDWARDS',
  'HALL',
  'CLARKE',
  'JACKSON',
  'WOOD',
  'CLARK',
  'SCOTT',
  'MOORE',
  'TURNER',
  'KING',
  'COOPER',
  'HILL',
  'MORRIS',
  'WARD'
].map(capitiliseEveryWord)
