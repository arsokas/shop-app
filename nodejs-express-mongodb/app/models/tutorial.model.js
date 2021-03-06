module.exports = (mongoose) => {
  const Tutorial = mongoose.model(
    "tutorial",
    mongoose.Schema(
      {
        name: String,
        description: String,
        price: Number,
        img: String,
        quantity: Number,
      },
      { timestamps: true }
    )
  );

  return Tutorial;
};
