import CategoryGrid from "../components/category-grid";

async function fetchData() {
  return [
    { id: 1, name: "Guantes" },
    { id: 2, name: "Zapatos" },
  ];
}

export default async function HomePage() {
  const categories = await fetchData();

  return (
    <div className="mx-16">
      <h2 className="py-8 text-2xl text-center font-bold">
        Nuestros Productos
      </h2>
      <div className="pb-8">
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
