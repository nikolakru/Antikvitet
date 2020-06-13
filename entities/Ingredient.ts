import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IngredientAntikvitet } from "./IngredientAntikvitet";

@Index("uq_ingredient_name", ["name"], { unique: true })
@Entity("ingredient", { schema: "antiq" })
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
}
