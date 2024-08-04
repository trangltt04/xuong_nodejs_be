import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    // title: {
    // 	type: String,
    // 	required: true,
    // },
    // description: String,
    // products: [
    // 	{
    // 		type: mongoose.Schema.Types.ObjectId,
    // 		ref: "Product",
    // 	},
    // ],
    // isHidden: {
    // 	type: Boolean,
    // 	default: false,
    // },
    // slug: String,

    title: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "UnCategoryzed",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "UnCategoryzed",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
