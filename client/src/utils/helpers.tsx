export const sortByTitle = (a: any, b:any) => {
  const nameA = a.title.toUpperCase()
  const nameB = b.title.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}