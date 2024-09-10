import type { Category } from "../../app/db";

import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <ul className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.length === 0 ? (
        <li>No hay categorias</li>
      ) : (
        categories.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link
                className="block no-underline text-primary-400 hover:translate-y-0.5 transition-all"
                href={`/categoria/${id}`}
              >
                <Card>
                  <CardBody className="mr-auto ml-auto flex items-center">
                    <Image
                      alt=""
                      aria-hidden={true}
                      className="bg-white object-contain h-40 opacity-5 transition-all"
                      src={`https://product-catalog.sfo2.cdn.digitaloceanspaces.com/categories/${name.toLowerCase()}.jpg`}
                    />
                  </CardBody>
                  <CardHeader className="justify-center">
                    <h2 aria-label={`categoría ${name}`} className="font-bold">
                      {name}
                    </h2>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })
      )}
    </ul>
  );
}
