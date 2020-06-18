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
                        callback(new Error('Bad file extensions!'), false);
                        return;
                    }
                    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))){
                        callback(new Error('Bad file content!'), false);
                        return;
                    }

                    callback(null, true);

               },
               limits:{
                   files: 1,
                   fieldSize: StorageConfig.photoMaxFileSize,

               },
            })
        )
        async uploadPhoto(@Param('id') antikvitetId: number, @UploadedFile() photo): Promise< ApiResponse | Photo> {
            let imagePath = photo.filename;
            
            const newPhoto: Photo = new Photo();
            newPhoto.antikvitetId = antikvitetId;
            newPhoto.imagePath = photo.filename;

            const savedPhoto = await this.photoservice.add(newPhoto);
            if(!savedPhoto){
                return new ApiResponse('error', -4001);

            }
            return savedPhoto;

        }
    }