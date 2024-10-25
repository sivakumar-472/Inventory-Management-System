const mongoose = require("mongoose");

exports.connectDB = async () => {
  const uri =
    "mongodb+srv://siva:tss3Z8IultclVrd5@ims.21zm8.mongodb.net/inventory?retryWrites=true&w=majority&appName=IMS";

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
