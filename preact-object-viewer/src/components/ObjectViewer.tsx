import { createElement, FunctionalComponent, h } from 'preact'
import { useMemo } from 'preact/compat'
import {
  objectDepth,
  objectOrArrayDepth,
  objectSize
} from '../../../lib/common/ArrayUtils'
import { longDate, longDateTime } from '../../../lib/common/DateUtils'
import JSX = createElement.JSX
import { sentenceCase } from 'sentence-case'

export const ObjectViewer: FunctionalComponent<{
  data: Record<string | number, any>
}> = (input) => {
  const depth = useMemo(() => objectOrArrayDepth(input.data), [input.data])
  const size = useMemo(() => objectSize(input.data), [input.data])
  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <span>Object depth: {depth}</span>
        <span>Object size: {size}</span>
        <span>
          Top level array: {input.data instanceof Array ? 'true' : 'false'}
        </span>
      </div>
      <hr />
      <h3>Rendered data:</h3>
      <div>{render(null, input.data)}</div>
      <hr />
      <h3>Raw data</h3>
      <pre
        style={{
          textAlign: 'left',
          margin: '0 auto',
          padding: '1rem',
          background: '#0001',
          width: '50%'
        }}
      >
        {JSON.stringify(input.data, null, 2)}
      </pre>
    </div>
  )
}
export type JsonPrimitive = string | number | null | boolean

type JsonRecord =
  | {
      [key in string | number]?:
        | JsonPrimitive
        | JsonPrimitive[]
        | JsonRecord
        | JsonRecord[]
    }
  | JsonPrimitive
  | undefined

const render = (
  key: string | number | null,
  val: JsonRecord | JsonRecord[],
  level = 0
): JSX.Element => {
  const depth = objectDepth(val)
  if (depth === 0) {
    return (
      <div>
        {/*{typeof key === 'string' && (*/}
        {/*  <HeaderLabel text={key} level={level} inline={true} />*/}
        {/*)}*/}
        {isNaN(Number(key)) && typeof key === 'string' && (
          <b>{sentenceCase(key)}</b>
        )}{' '}
        {renderPrimitive(val as JsonPrimitive)}
      </div>
    )
  } else if (depth === 1) {
    // this block is optional, it just adds bullet points at the last level
    return (
      <div>
        {isNaN(Number(key)) && typeof key === 'string' && (
          <HeaderLabel text={key} level={level} inline={objectSize(val) < 3} />
        )}
        {renderSingleDepthObject(val as Record<string | number, JsonPrimitive>)}
      </div>
    )
  } else {
    return (
      <div
        style={{
          marginTop: '1rem',
          backgroundColor: '#fff4'
        }}
      >
        {isNaN(Number(key)) && typeof key === 'string' && (
          <HeaderLabel text={key} level={level} inline={objectSize(val) < 3} />
        )}
        <div
          style={{
            marginLeft: '1rem',
            paddingLeft: '0.5rem',
            borderLeft: '2px solid currentColor'
          }}
        >
          {Object.entries(val ?? {}).map(([k, v]) => render(k, v, level + 1))}
        </div>
      </div>
    )
  }
}

const HeaderLabel: FunctionalComponent<{
  text: string
  level: number
  inline?: boolean
}> = ({ text, level, inline }) => {
  const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'i', 'span']
  return createElement(headers[level] ?? 'b', {
    children: sentenceCase(text),
    style: { display: inline ? 'inline-block' : 'block', margin: 'auto 1rem' }
  })
}

// depth one
const renderSingleDepthObject = (
  val: Record<string | number, JsonPrimitive>
) => {
  const WrapperList: FunctionalComponent = ({ children }) =>
    val instanceof Array ? <ol>{children}</ol> : <ul>{children}</ul>
  return (
    <WrapperList>
      {Object.entries(val).map(([key, value]) => (
        <li>
          <b> {!(val instanceof Array) && sentenceCase(key)}</b>{' '}
          {renderPrimitive(value)}
        </li>
      ))}
    </WrapperList>
  )
}

// depth zero
const renderPrimitive = (val: any): JSX.Element => {
  switch (typeof val) {
    case 'boolean':
      return val ? <span>yes</span> : <span>no</span>
    case 'number':
      const currentYear = new Date().getFullYear()
      if (
        val > new Date(currentYear - 20, 0).getTime() &&
        val < new Date(currentYear + 1, 0).getTime()
      )
        return <span>{longDate(new Date(val))}</span>
      return <span>Int[{val}]</span>
    case 'string':
      if (String(val).match(/\d{2}:\d{2}:\d{2}/))
        return <span>{longDateTime(new Date(val))}</span>
      if (String(val).match(/\d{4}-\d{2}-\d{2}/))
        return <span>{longDate(new Date(val))}</span>
      if (String(val).match(/^https:/)) return <a href={val}>{val}</a>
      if (String(val).match(/^[^@]+@[^,]+\..{2,6}$/))
        return <a href={'mailto:' + val}>{val}</a>
      return val.length > 150 ? <p>{val}</p> : <span>{val}</span>
    case 'undefined':
      return <span>undefined</span>
    case 'object':
      if (val === null) return <span>null</span>
      if (val instanceof Array && val.length === 0) return <span>empty</span>
      if (Object.keys(val).length === 0 && val.constructor === Object)
        return <span>empty obj</span>
      else if ((val as unknown as Date) instanceof Date)
        return <span>{longDate(val as unknown as Date)}</span>
      return (
        <b>non-null object with depth zero: {JSON.stringify(val, null, 2)}</b>
      )
    default:
      console.error('uncategorised value type: ', typeof val, val)
      return (
        <b>
          uncategorised value type: {typeof val} <p>{String(val)}</p>
        </b>
      )
  }
}
