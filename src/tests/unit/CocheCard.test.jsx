import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import CocheCard from "../../componentes/CocheCard";

describe("CocheCard", () => {
    it("renderiza el nombre del coche", () => {
        const coche = {
            nombre: "BMW M4",
            marca: "BMW",
            potencia: "510 CV",
            velocidad: "290 km/h",
            img: "/bmw.jpg"
        };

        render(
            <CocheCard
                coche={coche}
                setPage={() => {}}
                setCocheSeleccionado={() => {}}
            />
        );

        expect(screen.getByText("BMW M4")).toBeInTheDocument();
    });
});
