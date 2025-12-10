import { TGroup } from "../../types/group/group.type.js";
import groupModel from "./group.model.js";

export const GroupRepository = {

    create(data: TGroup){
        return groupModel.create(data);
    }

}