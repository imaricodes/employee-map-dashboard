import mongoose from "mongoose";


const testEmployeeSchema = new mongoose.Schema({
    name: string,
    nickname: string
});


const testEmployee = mongoose.model("testEmployee", testEmployeeSchema);

export default testEmployee;