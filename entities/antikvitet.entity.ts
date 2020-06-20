import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Country } from "./country.entity";
import { IngredientAntikvitet } from "./ingredientAntikvitet.entity";
import { Photo } from "./photo.entity";
import { Ingredient } from "./ingredient.entity";
import * as Validator from 'class-validator';
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
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 50)
  name: string;

  @Column("int", { name: "country_id", unsigned: true, default: () => "'0'" })
  countryId: number;

  @Column("varchar", { name: "descripton", length: 250 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 250)
  descripton: string;

  @Column("int", { name: "price" })

  @Validator.IsNotEmpty()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
  })
  @Validator.IsPositive()
  price: number;

  @Column("int", { name: "year" })

  @Validator.IsNotEmpty()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false
  })
  @Validator.IsPositive()
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

  @ManyToMany(type => Ingredient, ingredient => ingredient.antikvitets)
  @JoinTable({
    name: "ingredient_antikvitet",
    joinColumn: { name: "antikvitet_id", referencedColumnName: "antikvitetId"},
    inverseJoinColumn: { name: "ingredient_id", referencedColumnName: "ingredientId"}
  })
  ingredients: Ingredient[];

  @OneToMany(() => Photo, (photo) => photo.antikvitet)
  photos: Photo[];
}
