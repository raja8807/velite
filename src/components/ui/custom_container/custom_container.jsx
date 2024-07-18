const { Container } = require("react-bootstrap");

const CustomContainer = ({ children, ...props }) => {
  return (
    <Container
      style={{
        // backgroundColor:'red'
        height: "100%",
      }}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
