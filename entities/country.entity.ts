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

@Index("fk_country_antikvitet_id", ["antikvitetId"], {})
@Index("uq_country_country_name", ["countryName"], { unique: true })
@Entity()
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "country_id", unsigned: true })
  countryId: number;

  @Column("varchar", { name: "country_name", unique: true, length: 50 })
  countryName: string;

  @Column("int", { name: "antikvitet_id", unsigned: true })
  antikvitetId: number;

  @OneToMany(() => Antikvitet, (antikvitet) => antikvitet.country2)
  antikvitets: Antikvitet[];

  @ManyToOne(() => Antikvitet, (antikvitet) => antikvitet.countries, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }])
  antikvitet: Antikvitet;
}
