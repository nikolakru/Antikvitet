import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Antikvitet } from "./Antikvitet";
import { Ingredient } from "./Ingredient";

@Index("fk_ingredient_antikvitet_antikvitet_id", ["antikvitetId"], {})
@Index("fk_ingredient_antikvitet_ingredient_id", ["ingredientId"], {})
@Entity("ingredient_antikvitet", { schema: "antiq" })
export class IngredientAntikvitet {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ingredient_antiviktet",
    unsigned: true,
  })
  ingredientAntiviktet: number;

  @Column("int", { name: "antikvitet_id", unsigned: true })
  antikvitetId: number;

  @Column("int", { name: "ingredient_id", unsigned: true })
  ingredientId: number;

  @ManyToOne(
    () => Antikvitet,
    (antikvitet) => antikvitet.ingredientAntikvitets,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }])
  antikvitet: Antikvitet;

  @ManyToOne(
    () => Ingredient,
    (ingredient) => ingredient.ingredientAntikvitets,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }])
  ingredient: Ingredient;
}
