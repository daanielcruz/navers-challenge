import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 2rem;

  > strong {
    font-size: 1.8rem;
    font-weight: bold;
  }

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 9rem;
    height: 2.5rem;
    background: var(--color-primary);
    color: var(--color-text-in-button);
    font-weight: bold;
    font-size: 0.875rem;
    cursor: pointer;
    transition: opacity 1s;
    &:hover {
      opacity: 0.9;
    }
  }

  @media (min-width: 700px) {
    > strong {
      font-size: 2.5rem;
      font-weight: bold;
    }

    > a {
      width: 14rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 2rem;
`;

export const CardsItem = styled.div`
  display: flex;
  padding: 1rem;
`;
