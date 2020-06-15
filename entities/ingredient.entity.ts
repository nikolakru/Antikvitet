import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IngredientAntikvitet } from "./ingredientAntikvitet.entity";
import { Antikvitet } from "./antikvitet.entity";

@Index("uq_ingredient_name", ["name"], { unique: true })
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_id",
    unsigned: true,
  })
  ingredientId: number;

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;

  @OneToMany(
    () => IngredientAntikvitet,
    (ingredientAntikvitet) => ingredientAntikvitet.ingredient
  )
  ingredientAntikvitets: IngredientAntikvitet[];

  @ManyToMany(type => Antikvitet, antikvitet => antikvitet.ingredients)
  @JoinTable({
    name: "ingredient_antikvitet",
    joinColumn: { name: "ingredient_id", referencedColumnName: "ingredientId"},
    inverseJoinColumn: { name: "antikvitet_id", referencedColumnName: "antikvitetId"}
  })
  antikvitets: Antikvitet[];
}
