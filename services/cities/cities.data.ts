import { eq } from "drizzle-orm";
import { db } from "..";
import { cities, City, NewCity } from "../schemas/cities.schema";

export async function getCities() {
  const cityList = await db.select().from(cities);
  return cityList;
}

export async function getCityById(id: number) {
  const city = await db.select().from(cities).where(eq(cities.id, id));
  return city;
}

export async function createCity(city: NewCity) {
  const newCity = await db.insert(cities).values(city).returning();
  return newCity;
}

export async function updateCity(city: City) {
  const updatedCity = await db
    .update(cities)
    .set(city)
    .where(eq(cities.id, city.id))
    .returning();
  return updatedCity;
}

export async function deleteCity(id: number) {
  const deletedCity = await db
    .delete(cities)
    .where(eq(cities.id, id))
    .returning();
  return deletedCity;
}
