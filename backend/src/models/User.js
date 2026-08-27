import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  address: { type: String, required: true, trim: true, maxlength: 400 },
  role: { type: String, enum: ['ADMIN', 'NORMAL_USER', 'STORE_OWNER'], default: 'NORMAL_USER', index: true }
}, { timestamps: true });
userSchema.index({ name: 1 });
export default mongoose.model('User', userSchema);
