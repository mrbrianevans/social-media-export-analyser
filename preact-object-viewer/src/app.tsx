import { ObjectViewer } from './components/ObjectViewer'
import { useState } from 'preact/compat'
import { h } from 'preact'

export function App() {
  const [data, setData] = useState<any>({ todo: 'Enter some data' })
  const [error, setError] = useState<string | null>(null)
  const handleChange = (newData: string) => {
    try {
      const parsedData = JSON.parse(newData)
      setData(parsedData)
      setError(null)
    } catch (e) {
      if (e instanceof SyntaxError) setError('Invalid json')
    }
  }
  return (
    <>
      <h1>Object viewer prototype</h1>
      <textarea
        style={{ width: '50%' }}
        value={JSON.stringify(data)}
        onInput={(v) => handleChange(v.currentTarget.value)}
      />
      <p style={{ color: 'crimson' }}>{error}</p>
      <ObjectViewer data={data} />
    </>
  )
}
