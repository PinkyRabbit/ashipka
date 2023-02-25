import { Link } from "react-router-dom";
import styled from "styled-components";

const ListWrapper = styled.ul`
    list-style-type: disclosure-closed;
    padding: 20px;
    font-size: 1.3em;
`;

export const Home = () => {
    return (
        <ListWrapper className="text-primary">
            <li>
                <Link to="/doprobiv">Допробив</Link>
            </li>
        </ListWrapper>
    );
};