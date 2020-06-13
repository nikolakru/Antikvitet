import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Antikvitet } from "./Antikvitet";

@Index("fk_photo_antikvitet_id", ["antikvitetId"], {})
@Index("uq_image_path", ["imagePath"], { unique: true })
@Entity("photo", { schema: "antiq" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("int", { name: "antikvitet_id", unsigned: true })
  antikvitetId: number;

  @Column("varchar", { name: "image_path", unique: true, length: 250 })
  imagePath: string;

  @ManyToOne(() => Antikvitet, (antikvitet) => antikvitet.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }])
  antikvitet: Antikvitet;
}
