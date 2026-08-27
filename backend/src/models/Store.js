import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  address: { type: String, required: true, trim: true, maxlength: 400 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true }
}, { timestamps: true });
storeSchema.index({ name: 1 }); storeSchema.index({ address: 1 });
export default mongoose.model('Store', storeSchema);
