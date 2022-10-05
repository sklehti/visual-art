import Magnifier from "react-magnifier";
import yourImage from "../../components/images/test-image.jpg";

function MagnifierGlass() {
  return (
    <Magnifier
      id="test_kuva"
      src={yourImage}
      width={1000}
      zoomFactor={0.5}
      mgWidth={400}
      mgHeight={400}
    />
  );
}

export default MagnifierGlass;
