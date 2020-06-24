import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity()
export class Administrator {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "administrator_id",
    unsigned: true,
  })
  administratorId: number;

  @Column( { type: "varchar",
     name: "username", unique: true, length: 50 })

  @Validator.IsNotEmpty()
  @Validator.IsString()
  


  username: string;

  @Column("varchar", { name: "password_hash", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;
}
