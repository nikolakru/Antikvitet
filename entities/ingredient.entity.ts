import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IngredientAntikvitet } from "./ingredientAntikvitet.entity";

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
}
