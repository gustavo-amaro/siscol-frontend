import styled from 'styled-components';

export const Container = styled.nav`
    padding: 34px;
    
    .navbar-brand{
        color: ${props => props.theme.colors.text};
    }

    .container-fluid{
        padding: 0;
    }
    a{
        padding: 0;
    }
    .nav-center{
        left: 50%; 
        transform: translateX(-50%);
        position: absolute;
        font-size: 1.6em;
    }

    .user{
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        a{
            margin-right: 13px;
            color: ${props => props.theme.colors.text};
            text-decoration: none;
        }
    }
    .dropdown-item{
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.text};
    }
`;
