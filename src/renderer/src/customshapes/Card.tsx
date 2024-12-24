import { DefaultColorStyle, RecordProps, T } from 'tldraw'
import { ICardShape } from '../types/card-shape-types'

import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'
import { BaseBoxShapeTool, TLClickEventInfo } from 'tldraw'

import {
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  TLComponents,
  TLUiOverrides,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools
} from 'tldraw'

import { useState } from 'react'
import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLResizeInfo,
	getDefaultColorTheme,
	resizeBox,
} from 'tldraw'


// props

// Validation for our custom card shape's props, using one of tldraw's default styles
const cardShapeProps: RecordProps<ICardShape> = {
  w: T.number,
  h: T.number,
  color: DefaultColorStyle
}

// migrations


const versions = createShapePropsMigrationIds(
  // this must match the shape type in the shape definition
  'card',
  {
    AddSomeProperty: 1
  }
)

// Migrations for the custom card shape (optional but very helpful)
const cardShapeMigrations = createShapePropsMigrationSequence({
  sequence: [
    {
      id: versions.AddSomeProperty,
      up(props) {
        // it is safe to mutate the props object here
        props.someProperty = 'some value'
      },
      down(props) {
        delete props.someProperty
      }
    }
  ]
})

// tools
export class CardShapeTool extends BaseBoxShapeTool {
  static override id = 'card'
  static override initial = 'idle'
  override shapeType = 'card'

  override onDoubleClick(_info: TLClickEventInfo) {
    // you can handle events in handlers like this one;
    // check the BaseBoxShapeTool source as an example
  }
}



// utils

export class CardShapeUtil extends ShapeUtil<ICardShape> {
	static override type = 'card' as const
	// [1]
	static override props = cardShapeProps
	// [2]
	static override migrations = cardShapeMigrations

	// [3]
	override isAspectRatioLocked(_shape: ICardShape) {
		return false
	}
	override canResize(_shape: ICardShape) {
		return true
	}

	// [4]
	getDefaultProps(): ICardShape['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
		}
	}

	// [5]
	getGeometry(shape: ICardShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	// [6]
	component(shape: ICardShape) {
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })

		//[a]
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [count, setCount] = useState(0)

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: theme[shape.props.color].semi,
					color: theme[shape.props.color].solid,
				}}
			>
				<h2>Clicks: {count}</h2>
				<button
					// [b]
					onClick={() => setCount((count) => count + 1)}
					onPointerDown={(e) => e.stopPropagation()}
				>
					{bounds.w.toFixed()}x{bounds.h.toFixed()}
				</button>
			</HTMLContainer>
		)
	}

	// [7]
	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	// [8]
	override onResize(shape: ICardShape, info: TLResizeInfo<ICardShape>) {
		return resizeBox(shape, info)
	}
}