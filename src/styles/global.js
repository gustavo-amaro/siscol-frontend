import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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

  .secondary{
    background: var(--secondary);
    color: #fff;
  }

.App {
  position: absolute;
  display: flex;
  min-height: 100%;
  width: 100%;
  color: #4a4a4a;
  .text-color{
    color: #4a4a4a;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: var(--backcolor);
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
  .success{
    background-color: var(--success);
    color: white;
  }
  .warning{
    background-color: var(--warning);
    color: #fff;
  }
  .border-secondary {
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
  .backcolor{
    background: var(--backcolor);
  }
  .pagination li.active {
    background-color: var(--primary);
  }

  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .pagination{
    padding-bottom: 5px;
  }
}

`;
