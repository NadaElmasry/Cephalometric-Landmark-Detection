import mongoose from "mongoose";


const connectDB = async () => {
    return await mongoose.connect("mongodb://Tasneem:eng1256346@ac-zrkdfmo-shard-00-00.tbtnqjd.mongodb.net:27017,ac-zrkdfmo-shard-00-01.tbtnqjd.mongodb.net:27017,ac-zrkdfmo-shard-00-02.tbtnqjd.mongodb.net:27017/?ssl=true&replicaSet=atlas-tq4ti4-shard-0&authSource=admin&retryWrites=true&w=majority")
    //return await mongoose.connect("mongodb+srv://Tasneem:eng1256346@cluster0.tbtnqjd.mongodb.net/chephalometric")
    .then(res => console.log(`connected DB `))
        .catch(err => console.log(`Fail toconnected DB `,err.message))

}


export default connectDB