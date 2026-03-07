import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import App from "../../App";

describe("Integración App", () => {

    it("navega a detalle cuando haces click", () => {

        render(<App />);


        const botonCoches = screen.getByRole("button", { name: /^Coches$/i });
        fireEvent.click(botonCoches);


        const botonesDetalle = screen.getAllByRole("button", { name: /ver detalles/i });


        fireEvent.click(botonesDetalle[0]);


        expect(screen.getByText(/Marca:/i)).toBeInTheDocument();
    });

});
