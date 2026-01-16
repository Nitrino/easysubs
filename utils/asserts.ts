/**
 * This function narrows the type of the value and returns it.
 *
 * @param value The value to check.
 * @param message An optional custom error message.
 */
export function assertIsDefinedAndReturn<T>(
  value: T,
  message: string | (() => string) = "Assertion Error: value is null or undefined",
): NonNullable<T> {
  if (value === undefined || value === null) {
    const errorMessage = typeof message === "function" ? message() : message;
    throw new Error(errorMessage);
  }

  return value;
}

/**
 * This function is a type guard that narrows the type of the value.
 *
 * @param value The value to check.
 * @param message An optional custom error message.
 */
export function assertIsDefined<T>(
  value: T,
  message: string | (() => string) = "Assertion Error: value is null or undefined",
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    const errorMessage = typeof message === "function" ? message() : message;
    throw new Error(errorMessage);
  }
}
