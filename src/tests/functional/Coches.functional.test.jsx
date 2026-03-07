import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom'; // <--- OBLIGATORIO para usar toBeInTheDocument
import Coches from "../../page/coches";

describe("Funcionalidad búsqueda", () => {

    it("filtra coches por búsqueda", () => {

        render(
            <Coches
                setPage={() => { }}
                setCocheSeleccionado={() => { }}
            />
        );

        // 1. Localizamos el input por su placeholder
        const input = screen.getByPlaceholderText(/buscar modelo\.\.\./i);

        // 2. Simulamos que el usuario escribe "BMW"
        fireEvent.change(input, { target: { value: "BMW" } });

        // 3. Verificamos que el BMW sigue ahí
        expect(screen.getByText(/BMW M4/i)).toBeInTheDocument();

        // 4. (OPCIONAL pero recomendado) Verificamos que otros han desaparecido
        // Usamos queryByText porque getByText daría error al no encontrarlo
        const audi = screen.queryByText(/Audi R8/i);
        expect(audi).not.toBeInTheDocument();
    });

});