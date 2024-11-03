import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { client } from "../Client";
import { feedQuery, searchQuery } from "../Utility/Data";
import { useParams } from "react-router-dom";
import MasonayLayout from "./MasonayLayout";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const [pins, setPins] = useState();
  console.log(pins);
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message={`We are adding  ideas to your feed!`} />;
  }
  return <div>{pins && <MasonayLayout pins={pins} />}</div>;
};

export default Feed;
