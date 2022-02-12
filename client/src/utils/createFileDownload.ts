/**
 * Create an in-memory file to be downloaded, and return the URL to the file.
 * @param fileContents - the text content of the file.
 * @param fileType - the mime type of the file. Eg image/svg+xml
 */
export function createFileDownload(fileContents: string, fileType: string) {
  return URL.createObjectURL(new Blob([fileContents], { type: fileType }))
}

/**
 * Convert a HTML SVG to an SVG that can be saved as a standalone file.
 * @param svgString - input string of SVG. Can be the outerHtml of an SVG element.
 * @param addMargin - how many pixels of margin to add to the SVG.
 * @param xMargin - if addMargin is true, how much to add in the x direction.
 * @param yMargin - if addMargin is true, how much to add in the y direction.
 */
export function createSvgDownload(
  svgString: string,
  addMargin = false,
  xMargin = 10,
  yMargin = xMargin
): string {
  if (!svgString.startsWith('<?xml'))
    svgString = '<?xml version="1.0" encoding="UTF-8"?>' + svgString
  const matches = svgString.match(/<svg[^\/]*?>/)
  if (!matches) return ''
  const [openTag] = matches
  svgString = svgString.replace(/<svg([^\/]*?)>/g, (o) => {
    let [, attrs] = o.match(/<svg([^\/]*?)>/) ?? []
    if (!attrs.match(/xmlns/)) attrs += ' xmlns="http://www.w3.org/2000/svg"'
    let viewBox
    if ((viewBox = attrs.match(/viewBox="(\d+) (\d+) (\d+) (\d+)"/))) {
      const [x1, y1, x2, y2] = viewBox.slice(1).map((w) => parseInt(w))
      if (!attrs.match(/height/)) attrs += ` height="${y2 - y1}px"`
      if (!attrs.match(/width/)) attrs += ` width="${x2 - x1}px"`
      const m = [xMargin, yMargin]
      if (addMargin && !attrs.match(/style/))
        attrs += ` style="margin: ${m[1]}px ${m[0]}px"`
    }
    // else console.log(attrs)
    return `<svg ${attrs}>`
  })
  // console.log(svgString.slice(0, 500))
  return createFileDownload(svgString, 'image/xvg+xml')
}

export function revokeFileDownload(url) {
  URL.revokeObjectURL(url)
}
