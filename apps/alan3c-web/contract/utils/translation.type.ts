export type NormalizeTranslations<T> = {
  [K in keyof T]: K extends 'translations'
    ? T[K] extends Array<infer U>
      ? U // Flatten translations array
      : T[K]
    : T[K] extends Array<infer U>
      ? NormalizeTranslations<U>[] // Recursively apply to arrays
      : T[K] extends object
        ? NormalizeTranslations<T[K]> // Recursively apply to nested objects
        : T[K]; // Otherwise, keep the type as is
}
