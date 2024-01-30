import { app } from "./app";
import connectDB from "./utils/db";

app.listen(8009, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});
