import { RandElem } from '../RandomArrayUtils'
import { capitiliseEveryWord } from '../../StringUtils'

export const getRandomFirstName = () => {
  return RandElem(FirstNames)
}
export const getRandomLastName = () => {
  return RandElem(LastNames)
}
export const getRandomFullName = () => {
  return getRandomFirstName() + ' ' + getRandomLastName()
}

export const FirstNames = [
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
  'SUSAN',
  'THOMAS',
  'ALAN',
  'MARTIN',
  'MATTHEW',
  'STEVEN',
  'DAVID JOHN',
  'SARAH',
  'WILLIAM',
  'KEVIN',
  'GARY',
  'MICHAEL JOHN',
  'BRIAN',
  'JONATHAN',
  'PHILIP',
  'NEIL',
  'KAREN',
  'NICHOLAS',
  'ADAM',
  'JULIE',
  'ELIZABETH',
  'COLIN',
  'HELEN'
].map(capitiliseEveryWord)
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
