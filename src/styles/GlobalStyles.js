import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --accent-color: #e74c3c;
    --background-color: #f8f9fa;
    --text-color: #333333;
    --light-gray: #e0e0e0;
    --medium-gray: #9e9e9e;
    --dark-gray: #616161;
    --white: #ffffff;
    --black: #000000;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: var(--transition);
  }

  a:hover {
    color: var(--secondary-color);
  }

  button {
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: var(--white);
    padding: 10px 20px;
    border-radius: var(--border-radius);
    transition: var(--transition);
    font-weight: 600;
  }

  button:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section {
    padding: 60px 0;
  }

  .card {
    background-color: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
    transition: var(--transition);
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .btn-primary {
    background-color: var(--primary-color);
  }

  .btn-secondary {
    background-color: var(--secondary-color);
  }

  .btn-accent {
    background-color: var(--accent-color);
  }

  .text-center {
    text-align: center;
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    .section {
      padding: 40px 0;
    }
    
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;
