import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MotoCard from "../../componentes/MotoCard";

describe("MotoCard", () => {

    it("renderiza correctamente la información de la moto", () => {

        const moto = {
            nombre: "Yamaha R1",
            marca: "Yamaha",
            potencia: "200 CV",
            velocidad: "299 km/h",
            img: "/r1.jpg"
        };

        render(
            <BrowserRouter>
                <MotoCard moto={moto} />
            </BrowserRouter>
        );


        expect(screen.getByText("Yamaha R1")).toBeInTheDocument();
        expect(screen.getByText("Yamaha")).toBeInTheDocument();
        expect(screen.getByText("200 CV")).toBeInTheDocument();
        expect(screen.getByText("299 km/h")).toBeInTheDocument();


        const imagen = screen.getByRole("img");
        expect(imagen).toHaveAttribute("src", "/r1.jpg");
    });

});