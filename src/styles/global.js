import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body{
  font-family: Ubuntu, sans-serif;
  color: ${(props) => props.theme.colors.text}
}
:root{
    --primary: #2c77f2;
    --primary-dark: #163d7d;
    --secondary: #5b90eb;
    --secondary-light: #a4bfed;
    --danger: #d32121;
    --success: #27B54B;
    --warning: #f4b400;
    --backcolor: #dde3ed;
  }
.btn{
  height: 50px;
  border-radius: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary{
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  &:hover{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:active{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:disabled{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
}

.form-control{
  border-radius: 10px;
  height: 50px;
  font-size: 18px;
}

.input-group-text{
  border-radius: 10px 0 0 10px;
  width: 50px;
  display: flex;
  justify-content: center;
}

.secondary{
  background-color: ${(props) => props.theme.colors.text};
}

.alert{
  border-radius: 10px;
}

.dropdown-menu{
  border-radius: 10px;
}
.bg-light{
  background-color: ${props => props.theme.colors.background};
}

.logo-bottom{
  width: 153px;
  height: 80px;
  bottom: 0;
  left: -25px;
  position: absolute;
}
`;
