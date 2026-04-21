export function stringToArray(str: string, delimiter: string = '|'): string[] {
  return str.split(delimiter).map(item => item.trim());
}