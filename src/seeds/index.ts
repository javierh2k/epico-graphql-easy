import { getRepository } from "typeorm";

import { Recipe } from "../modules/rate/recipe.entity";
import { Rate } from "../modules/rate/rate.entity";
import { User } from "../modules/rate/user.entity";

export async function seedDatabase() {
  const recipeRepository = getRepository(Recipe);
  const ratingsRepository = getRepository(Rate);
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: "test@github.com",
    nickname: "19majkel94",
    password: "s3cr3tp4ssw0rd",
  });
  await userRepository.save(defaultUser);

  const [recipe1, recipe2] = recipeRepository.create([
    {
      title: "Recipe 1",
      description: "Desc 1",
      author: defaultUser,
    },
    {
      title: "Recipe 2",
      author: defaultUser,
    },
  ]);
  await recipeRepository.save([recipe1, recipe2]);

  const ratings = ratingsRepository.create([
    { value: 2, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },
    { value: 5, user: defaultUser, recipe: recipe1 },
    { value: 3, user: defaultUser, recipe: recipe1 },
    { value: 4, user: defaultUser, recipe: recipe1 },

    { value: 2, user: defaultUser, recipe: recipe2 },
    { value: 4, user: defaultUser, recipe: recipe2 },
  ]);
  await ratingsRepository.save(ratings);

  return {
    defaultUser,
  };
}
