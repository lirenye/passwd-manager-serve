import mongoose from "mongoose";
declare function dbConnect(): Promise<typeof mongoose | undefined>;
export default dbConnect;
