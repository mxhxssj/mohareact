import '@testing-library/jest-dom';
import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App.jsx";

describe("Integración App", () => {
    test("navega a detalle cuando haces click", () => {
        render(<App />);


        const botonCoches = screen.getByRole("button", { name: /^Coches$/ });

        fireEvent.click(botonCoches);


        expect(screen.getByText(/Catálogo de Coches/i)).toBeInTheDocument();
    });
});
