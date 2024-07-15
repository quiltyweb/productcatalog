import CategoryGrid from "../components/category-grid";

import db, { Category } from "./db";

async function fetchData(): Promise<Category[]> {
  return db.category.findMany();
}

export default async function HomePage() {
  const categories = await fetchData();

  return (
    <main className="mx-16">
      <h2 className="py-8 text-2xl text-center font-bold">
        Nuestros Productos
      </h2>
      <div className="pb-8">
        <CategoryGrid categories={categories} />
      </div>
    </main>
  );
}
