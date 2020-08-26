import styled from 'styled-components';

export const Container = styled.div`
  width: 17.5rem;
  height: 23.5rem;
  display: flex;
  flex-direction: column;

  > img {
    height: 73%;
    width: 100%;
    object-fit: cover;
    margin-bottom: 0.875rem;
  }
  > strong {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  > span {
    margin-bottom: 0.813rem;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  margin: 0 1rem 0.187rem 0.312rem;

  > img:first-child {
    margin-right: 1rem;
  }

  > img {
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  max-width: 60vw;

  > img {
    position: absolute;
    top: 1.3rem;
    right: 1.3rem;
    cursor: pointer;
  }

  > h1 {
    margin-bottom: 1.5rem;
  }

  @media (min-width: 700px) {
    > h1 {
      margin-right: 22.8rem;
    }
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: 2.06rem;

  > button:first-child {
    margin-bottom: 1rem;
  }
  @media (min-width: 700px) {
    flex-direction: row;
    padding-left: 11.5rem;
    > button:first-child {
      margin-bottom: 0;
      margin-right: 1.5rem;
    }
  }
`;

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const Space = styled.div`
  margin-bottom: 1rem;
`;
