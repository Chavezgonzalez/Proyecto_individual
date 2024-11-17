import { model, Schema } from "mongoose";

interface IActivities{
    tittle: string,
    dateEnd: Date,
    description: string,
    Status: "Active"| "Pending",
    idUser: Schema.Types.ObjectId | string
}

const ActivitiSchema = new Schema<IActivities>({
    tittle: {
        type: String,
        required: true
    },
    dateEnd:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true,
        enum:["Active", "Pending"]
    },
    idUser:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    }
},{timestamps:true});

export const ActivitiModel = model<IActivities>('Activities', ActivitiSchema)