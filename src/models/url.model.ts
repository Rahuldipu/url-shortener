import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  userId: mongoose.Schema.Types.ObjectId;
  visits: number;
  expiryDate?: Date;
  createdAt: Date;
}

const UrlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  visits: { type: Number, default: 0 },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUrl>("Url", UrlSchema);
