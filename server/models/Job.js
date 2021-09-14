import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    rate: { type: Number, require: true },
    hours: { type: Number, require: true },
    description: { type: String, require: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

JobSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
