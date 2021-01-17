import {createGlobalStyle} from 'styled-components'


export default createGlobalStyle`
:root{
    --primary: #2c77f2;
    --primary-dark: #163d7d;
    --secondary: #ffcc29;
    --danger: #d32121;
    --success: #27B54B;
  }
.App {
  position: absolute;
  display: flex;
  min-height: 100%;
  width: 100%;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: rgb(230, 230, 230);
  }
  .main-content {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .primary {
    background: linear-gradient(to right, var(--primary), var(--primary-dark))!important;
  }
  .primary-dark {
    background-color: var(--primary-dark);
  }
  .border-teal {
    border-color: #009688;
    color: #009688;
  }
  .border-purple {
    border-color: #9c27b0;
    color: #9c27b0;
  }
  .border-primary {
    border-color: var(--primary);
    color: var(----primary);
  }
  .border-blue {
    border-color: #0892c9;
    color: #0892c9;
  }
  .border-radius{
    border-radius: 10px;
  }
}

`;