import type { Category } from "@/app/db";

import { render, screen } from "@testing-library/react";

import CategoryGrid from "./category-grid";

describe("CategoryGrid", () => {
  describe("when there are no categories", () => {
    const categories: Category[] = [];

    test("should render empty state", () => {
      render(<CategoryGrid categories={categories} />);

      screen.getByText("No hay categorias");
    });
  });

  describe("when there are categories", () => {
    const categories = [
      {
        id: BigInt(1),
        name: "Soldador",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: BigInt(2),
        name: "Zapatos",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    test("should render categories", () => {
      render(<CategoryGrid categories={categories} />);

      screen.getByRole("heading", { name: "categoría Soldador" });
      screen.getByRole("heading", { name: "categoría Zapatos" });
    });
  });
});
