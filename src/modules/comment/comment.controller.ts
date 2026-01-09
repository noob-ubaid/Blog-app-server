import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async(req:Request,res : Response) =>{
    try {
       const result = await commentService.createComment() 
       res.status(201).json({
        success : true,
        message : "Comment created",
        data : result
       })
    } catch (error:any) {
        res.status(404).json({
            success : false,
            message : error.message
        })
    }
}
export const commentController = {
    createComment
}