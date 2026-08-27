import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  value: { type: Number, required: true, min: 1, max: 5, validate: { validator: Number.isInteger, message: 'Rating must be an integer' } },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
}, { timestamps: true });
ratingSchema.index({ user: 1, store: 1 }, { unique: true }); ratingSchema.index({ store: 1 });
export default mongoose.model('Rating', ratingSchema);
