import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country.entity";
import { IngredientAntikvitet } from "./ingredientAntikvitet.entity";
import { Photo } from "./photo.entity";

@Index("fk_antikvitet_country_id", ["countryId"], {})
@Index("uq_antikvitet_name", ["name"], { unique: true })
@Entity()
export class Antikvitet {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "antikvitet_id",
    unsigned: true,
  })
  antikvitetId: number;

  @Column("varchar", {
    name: "name",
    unique: true,
    length: 50,
    default: () => "'0'",
  })
  name: string;

  @Column("int", { name: "country_id", unsigned: true, default: () => "'0'" })
  countryId: number;

  @Column("varchar", { name: "descripton", length: 250 })
  descripton: string;

  @Column("int", { name: "price" })
  price: number;

  @Column("int", { name: "year" })
  year: number;

  @ManyToOne(() => Country, (country) => country.antikvitets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "country_id", referencedColumnName: "countryId" }])
  country2: Country;

  @OneToMany(() => Country, (country) => country.antikvitet)
  countries: Country[];

  @OneToMany(
    () => IngredientAntikvitet,
    (ingredientAntikvitet) => ingredientAntikvitet.antikvitet
  )
  ingredientAntikvitets: IngredientAntikvitet[];

  @OneToMany(() => Photo, (photo) => photo.antikvitet)
  photos: Photo[];
}
