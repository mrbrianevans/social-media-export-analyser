import { RandElem } from './RandomArrayUtils'
import { sampleUserAgents } from './RandomContent/RandomUserAgents'

export const getRandomUserAgent = () => RandElem(sampleUserAgents)
