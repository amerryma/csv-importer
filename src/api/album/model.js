import mongoose, { Schema } from 'mongoose'

const albumSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: String
  },
  artist: {
    type: String
  }
}, {
  timestamps: true
})

albumSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      year: this.year,
      artist: this.artist,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Album', albumSchema)

export const schema = model.schema
export default model
