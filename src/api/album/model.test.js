import { Album } from '.'

let album

beforeEach(async () => {
  album = await Album.create({ name: 'test', year: 'test', artist: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = album.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(album.id)
    expect(view.name).toBe(album.name)
    expect(view.year).toBe(album.year)
    expect(view.artist).toBe(album.artist)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = album.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(album.id)
    expect(view.name).toBe(album.name)
    expect(view.year).toBe(album.year)
    expect(view.artist).toBe(album.artist)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
