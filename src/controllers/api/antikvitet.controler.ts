import { Antikvitet } from "../../../entities/antikvitet.entity";
import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AntikvitetService } from "../../services/antikvitet/antikvitet.service";
import { AddAntikvitetDto } from "../../dtos/antikvitet/add.antikvitet.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from '../../../config/storage.config';
import { Photo } from "../../../entities/photo.entity";
import { PhotoService } from "../../services/photo/photo.service";
import { ApiResponse } from "../../misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';

@Controller('api/antikvitet')
@Crud({
    model: { type: Antikvitet },
    params: {
        id: {
                field: 'antikvitetId',
                type: 'number',
                primary: true 
            }
    },
        query: {
            join: {
                photos: {
                    eager: true
                },
                ingredientAntikvitets: {
                    eager: true
                },
                ingredients: {
                    eager: true
                }
               
                
                

            }
        }
})
export class AntikvitetController {
    constructor(
        public service: AntikvitetService,

        public photoservice: PhotoService,

      ) {

        }
        @Post('createFull')
        createFullAntikvitet(@Body() data: AddAntikvitetDto){
            return this.service.createFullAntikvitet(data);
        }

        @Post(':id/uploadPhoto')
        @UseInterceptors(
            FileInterceptor('photo',{
               storage: diskStorage({
                    destination : StorageConfig.photos,
                    filename: (req, file, callback) => {


                        let original = file.originalname;
                        
                        let normalized = original.replace(/\s+/g, '-');
                        let now = new Date()
                        let datePart = ''
                        datePart += now.getFullYear().toString()
                        datePart += (now.getMonth() + 1).toString()
                        datePart += now.getDate().toString()

                        const randomPart: string = 
                        new Array(10).fill(0).
                        map(e => (Math.random() * 9)
                        .toFixed(0).toString()).join('');

                        let fileName = datePart + '-' + randomPart + '-' + normalized

                        fileName = fileName.toLocaleLowerCase();

                        callback(null, fileName)
                    }

                        
         

               }),
               fileFilter: (req, file , callback) => {
                    if(file.originalname.toLowerCase().match(/\.(jpg | png)$/)){
                        req.fileFilterError = 'Bad file extension!';
                        callback(null, false);
                        return;
                    }
                    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))){
                        req.fileFilterError = 'Bad file content!';
                        callback(null, false);
                        return;
                    }

                    callback(null, true);

               },
               limits:{
                   files: 1,
                   fileSize: StorageConfig.photoMaxFileSize,

               },
            })
        )
        async uploadPhoto(@Param('id') antikvitetId: number,
         @UploadedFile() photo,
         @Req() req
         ): Promise< ApiResponse | Photo> {
                if(req.fileFilterError){
                    return new ApiResponse('error', -4002, req.fileFilterError);
                }

                if(!photo){
                    return new ApiResponse('error', -4002, 'File not uploaded');
                }

                const fileTypeResult = await fileType.fromFile(photo.path);
                if(!fileTypeResult){
                    fs.unlinkSync(photo.path);
                    return new ApiResponse('error', -4002, 'Cannot detect file type!');

                }
                const realMimeType = fileTypeResult.mime;
                if(!(realMimeType.includes('jpeg') || realMimeType.includes('png'))){
                    fs.unlinkSync(photo.path);
                    return new ApiResponse('error', -4002, 'Bad file content type!');
                }


            
            
            const newPhoto: Photo = new Photo();
            newPhoto.antikvitetId = antikvitetId;
            newPhoto.imagePath = photo.filename;

            const savedPhoto = await this.photoservice.add(newPhoto);
            if(!savedPhoto){
                return new ApiResponse('error', -4001);

            }
            return savedPhoto;

        }

        @Delete(':antikvitetId/deletePhoto/:photoId')
        public async deletePhoto(
            @Param('antikvitetId') antikvitetId: number,
            @Param('photoId') photoId: number,
            ){
                const photo = await this.photoservice.findOne({
                    antikvitetId: antikvitetId,
                    photoId: photoId
                });

                if(!photo){
                    return new ApiResponse('error', -4004, 'Photo not found!');

                }
                try{

                
                fs.unlinkSync(StorageConfig.photos + photo.imagePath);

                } catch (e){
                    
                }

                const deleteResult = await this.photoservice.deleteById(photoId);

                if(deleteResult.affected === 0){
                    return new ApiResponse('error', -4004, 'Photo not found!');

                }

                return new ApiResponse('ok', 0, 'One photo deleted!');
            }

        
    }