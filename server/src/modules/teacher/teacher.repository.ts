import teacherModel from "./teacher.model.js";

export const TeacherRepository = {

    findById(id: string){
        return teacherModel.findById(id);
    },

    findByUser(id: string | undefined){
        return teacherModel.findOne({ user: id });
    },

    create(data: any){
        return teacherModel.create(data);
    }

}