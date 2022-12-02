import styled from "styled-components";
import Spinner from "./Spinner";

const Container = styled.div<{
  height: string;
  width: string;
  absolute: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.absolute ? "absolute" : "static")};
`;

interface SpinningLoaderInterface {
  height?: string;
  width?: string;
  absolute?: boolean;
}

const SpinningLoader: React.FC<SpinningLoaderInterface> = ({
  height = "100vh",
  width = "100vw",
  absolute = false,
}) => {
  return (
    <Container absolute={absolute} height={height} width={width}>
      <Spinner />
    </Container>
  );
};

export default SpinningLoader;
