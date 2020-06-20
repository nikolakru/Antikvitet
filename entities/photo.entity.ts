import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Antikvitet } from "./antikvitet.entity";
import * as Validator from 'class-validator';
@Index("fk_photo_antikvitet_id", ["antikvitetId"], {})
@Index("uq_image_path", ["imagePath"], { unique: true })
@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { name: "antikvitet_id", unsigned: true })
  antikvitetId: number;

  @Column("varchar", { name: "image_path", unique: true, length: 250 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1, 250)
  imagePath: string;

  @ManyToOne(() => Antikvitet, (antikvitet) => antikvitet.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }])
  antikvitet: Antikvitet;
}
