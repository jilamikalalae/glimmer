import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      enum: ["Men", "Women"],
      require: true,
    },
    season: {
      type: String,
      enum: ["Winter", "Spring", "Summer", "Fall"],
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    sizes: {
      type: [String],
    },
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Clothes =
  mongoose.models.Clothes || mongoose.model("Clothes", clothesSchema);

export default Clothes;
