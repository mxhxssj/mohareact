import "./footer.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            © {year} MotorHub — Proyecto React
        </footer>
    );
}
