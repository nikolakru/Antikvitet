import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Antikvitet } from "./antikvitet.entity";
import * as Validator from 'class-validator';

@Index("uq_country_country_name", ["countryName"], { unique: true })
@Entity()
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "country_id", unsigned: true })
  countryId: number;

  @Column("varchar", { name: "country_name", unique: true, length: 50 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(5, 50)
  countryName: string;

  
  @OneToMany(() => Antikvitet, (antikvitet) => antikvitet.country2)
  antikvitets: Antikvitet[];

  @ManyToOne(() => Antikvitet, (antikvitet) => antikvitet.countries, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }])
  antikvitet: Antikvitet;
}
