/* eslint-disable react/prop-types */

import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonayLayout = ({ pins }) => (
  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {pins?.map((pin) => (
      <Pin key={pin._id} pin={pin} className="w-max" />
    ))}
  </Masonry>
);

export default MasonayLayout;
