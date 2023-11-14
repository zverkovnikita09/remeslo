import { useNavigate } from "react-router-dom";
import { Button } from "src/shared/ui/Button/Button"

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button
        onClick={ () => navigate(-1)}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.07 6.84668L4 12.9167L10.07 18.9867" stroke="#122533" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12.9166H4.17004" stroke="#122533" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Назад
    </Button>
    )
}