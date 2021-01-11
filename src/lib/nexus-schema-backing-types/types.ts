/**
 * Helpers for handling the generated backing types typgen
 */
declare global {
  interface YomaBackingTypes {}
}

type GenTypesShapeKeys = 'types'

type GenTypesShape = Record<GenTypesShapeKeys, any>

export type GetYomaFutureGen<
  K extends GenTypesShapeKeys,
  Fallback = any
> = YomaBackingTypes extends infer GenTypes
  ? GenTypes extends GenTypesShape
    ? GenTypes[K]
    : Fallback
  : Fallback

export type BackingTypes = Record<string, string>
