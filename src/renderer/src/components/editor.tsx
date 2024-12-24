import { useEffect } from 'react'
import {
  DefaultStylePanel,
  DefaultStylePanelContent,
  DefaultToolbar,
  TldrawUiMenuItem,
  track,
  useEditor,
  useRelevantStyles,
  useTools,
  TldrawUiButton
} from 'tldraw'
import 'tldraw/tldraw.css'
function Editor(): JSX.Element {
  return <CustomUi />
}

export default Editor

// [2]
const CustomUi = track(() => {
  const editor = useEditor()
  const tools = useTools()

  const styles = useRelevantStyles()
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          editor.deleteShapes(editor.getSelectedShapeIds())
          break
        }
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <>
      {/* <div className="absolute right-8 top-1/2 -translate-y-3/4">
        <DefaultStylePanel>
          <DefaultStylePanelContent styles={styles} />
        </DefaultStylePanel>
      </div> */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8">
        <DefaultToolbar>
          <TldrawUiMenuItem {...tools['select'] }  />
          <TldrawUiMenuItem {...tools['hand']} />
          <TldrawUiMenuItem {...tools['eraser']} />
          <TldrawUiMenuItem {...tools['ellipse']} label={'Procedure'} />
          <TldrawUiMenuItem {...tools['rectangle']}label={'Concept'}  />
          <TldrawUiMenuItem {...tools['hexagon']} label={"Princip"}/>
          <TldrawUiMenuItem {...tools['arrow']} />
          <TldrawUiButton
            type="tool"
            title="Trace"
            onClick={() => {
              editor.setCursor({ type: 'cross' })

              const fn = (e) => {
                const { x, y } = editor.screenToPage({ x: e.point.x, y: e.point.y })
                if (e.name == 'pointer_down') {
                  editor.createShapes([
                    {
                      type: 'geo',
                      x: x - 100,
                      y: y - 100,
                      props: {
                        geo: 'rectangle',
                        w: 200,
                        h: 200,
                        dash: 'dashed'
                      }
                    }
                  ])
                }
                setTimeout(() => editor.removeListener('event', fn), 500)
                if (e.type == 'click') editor.setCursor({ type: 'default' })
              }
              editor.addListener('event', fn)
            }}
          >
            {' '}
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V8M4 11V13M4 16V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H8M11 20H13M16 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16M20 13V11M20 8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H16M13 4H11"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </TldrawUiButton>
          <TldrawUiButton
            type="tool"
            title="Example"
            onClick={() => {
              editor.setCursor({ type: 'cross' })

              const fn = (e) => {
                const { x, y } = editor.screenToPage({ x: e.point.x, y: e.point.y })
                if (e.name == 'pointer_down') {
                  editor.createShapes([
                    {
                      type: 'geo',
                      x: x - 100,
                      y: y - 100,
                      props: {
                        geo: 'ellipse',
                        w: 200,
                        h: 200,
                        dash: 'dashed'
                      }
                    }
                  ])
                }
                setTimeout(() => editor.removeListener('event', fn), 500)
                if (e.type == 'click') editor.setCursor({ type: 'default' })
              }
              editor.addListener('event', fn)
            }}
          >
            {' '}
            <>
              {/*?xml version="1.0" encoding="utf-8"?*/}
              {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                id="icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: '.cls-1{fill:#000000;}.cls-2{fill:none;}'
                    }}
                  />
                </defs>
                <title>circle--dash</title>
                <path
                  className="cls-1"
                  d="M7.7,4.7a14.7,14.7,0,0,0-3,3.1L6.3,9A13.26,13.26,0,0,1,8.9,6.3Z"
                />
                <path
                  className="cls-1"
                  d="M4.6,12.3l-1.9-.6A12.51,12.51,0,0,0,2,16H4A11.48,11.48,0,0,1,4.6,12.3Z"
                />
                <path
                  className="cls-1"
                  d="M2.7,20.4a14.4,14.4,0,0,0,2,3.9l1.6-1.2a12.89,12.89,0,0,1-1.7-3.3Z"
                />
                <path
                  className="cls-1"
                  d="M7.8,27.3a14.4,14.4,0,0,0,3.9,2l.6-1.9A12.89,12.89,0,0,1,9,25.7Z"
                />
                <path
                  className="cls-1"
                  d="M11.7,2.7l.6,1.9A11.48,11.48,0,0,1,16,4V2A12.51,12.51,0,0,0,11.7,2.7Z"
                />
                <path
                  className="cls-1"
                  d="M24.2,27.3a15.18,15.18,0,0,0,3.1-3.1L25.7,23A11.53,11.53,0,0,1,23,25.7Z"
                />
                <path
                  className="cls-1"
                  d="M27.4,19.7l1.9.6A15.47,15.47,0,0,0,30,16H28A11.48,11.48,0,0,1,27.4,19.7Z"
                />
                <path
                  className="cls-1"
                  d="M29.2,11.6a14.4,14.4,0,0,0-2-3.9L25.6,8.9a12.89,12.89,0,0,1,1.7,3.3Z"
                />
                <path
                  className="cls-1"
                  d="M24.1,4.6a14.4,14.4,0,0,0-3.9-2l-.6,1.9a12.89,12.89,0,0,1,3.3,1.7Z"
                />
                <path
                  className="cls-1"
                  d="M20.3,29.3l-.6-1.9A11.48,11.48,0,0,1,16,28v2A21.42,21.42,0,0,0,20.3,29.3Z"
                />
                <rect
                  id="_Transparent_Rectangle_"
                  data-name="<Transparent Rectangle>"
                  className="cls-2"
                  width={32}
                  height={32}
                />
              </svg>
            </>
          </TldrawUiButton>

          <TldrawUiButton
            type="tool"
            title="Enonce"
            onClick={() => {
              editor.setCursor({ type: 'cross' })

              const fn = (e) => {
                const { x, y } = editor.screenToPage({ x: e.point.x, y: e.point.y })

                if (e.name == 'pointer_down') {
                  editor.createShapes([
                    {
                      type: 'geo',
                      x: x - 100,
                      y: y - 100,
                      props: {
                        geo: 'hexagon',
                        w: 200,
                        h: 200,
                        dash: 'dashed'
                      }
                    }
                  ])
                }
                setTimeout(() => editor.removeListener('event', fn), 500)
                if (e.type == 'click') editor.setCursor({ type: 'default' })
              }
              editor.addListener('event', fn)
            }}
          >
            {' '}
            <>
              {' '}
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="200.000000pt"
                height="200.000000pt"
                viewBox="0 0 200.000000 200.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <metadata>Created by potrace 1.16, written by Peter Selinger 2001-2019</metadata>
                <g
                  transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M455 1729 c-31 -55 -55 -102 -53 -103 18 -13 81 -46 88 -46 5 0 28
32 51 70 l41 70 84 0 84 0 0 55 0 55 -119 0 -119 0 -57 -101z"
                  />
                  <path d="M870 1775 l0 -55 130 0 130 0 0 55 0 55 -130 0 -130 0 0 -55z" />
                  <path
                    d="M1250 1775 l0 -55 85 0 84 0 37 -66 c20 -36 42 -68 49 -70 9 -4 64
21 93 42 2 1 -22 48 -53 103 l-57 101 -119 0 -119 0 0 -55z"
                  />
                  <path
                    d="M299 1458 c-23 -40 -53 -91 -65 -114 l-24 -41 49 -27 50 -27 42 73
c23 40 53 91 65 114 l24 41 -49 27 -50 27 -42 -73z"
                  />
                  <path
                    d="M1608 1503 l-48 -26 24 -41 c12 -23 42 -74 65 -114 l42 -73 49 27
c27 15 48 30 46 33 -15 27 -128 221 -129 221 -1 0 -23 -12 -49 -27z"
                  />
                  <path
                    d="M95 1106 c-30 -52 -55 -99 -55 -106 0 -19 109 -200 121 -200 5 0 28
11 50 25 l40 26 -32 57 c-18 31 -36 61 -41 67 -14 16 -9 31 33 105 23 39 40
72 38 74 -18 13 -82 46 -89 46 -5 0 -34 -42 -65 -94z"
                  />
                  <path
                    d="M1795 1179 c-16 -10 -34 -20 -39 -22 -6 -2 9 -36 32 -76 23 -40 42
-76 42 -81 0 -5 -19 -40 -41 -80 -23 -39 -40 -72 -38 -74 18 -12 82 -46 89
-46 10 0 120 183 120 200 0 21 -110 200 -123 199 -7 0 -25 -9 -42 -20z"
                  />
                  <path
                    d="M258 723 c-26 -14 -46 -29 -44 -32 2 -3 31 -54 66 -114 l62 -107 49
27 48 28 -23 40 c-80 138 -107 185 -109 185 -1 0 -23 -12 -49 -27z"
                  />
                  <path
                    d="M1649 678 c-23 -40 -52 -91 -65 -113 l-23 -40 48 -28 49 -27 62 107
c35 60 64 111 66 114 2 3 -19 18 -46 33 l-49 27 -42 -73z"
                  />
                  <path
                    d="M445 399 c-16 -10 -34 -20 -39 -22 -5 -2 17 -49 48 -105 l58 -102
119 0 119 0 0 55 0 55 -84 0 -84 0 -41 70 c-23 39 -47 70 -54 69 -7 0 -25 -9
-42 -20z"
                  />
                  <path
                    d="M1493 408 c-5 -7 -24 -39 -42 -70 l-32 -58 -85 0 -84 0 0 -55 0 -55
118 0 118 0 58 100 c32 56 57 102 55 104 -17 12 -82 46 -88 46 -5 0 -13 -6
-18 -12z"
                  />
                  <path d="M870 225 l0 -55 130 0 130 0 0 55 0 55 -130 0 -130 0 0 -55z" />
                </g>
              </svg>
            </>
          </TldrawUiButton>
        </DefaultToolbar>
      </div>
    </>
  )
})
