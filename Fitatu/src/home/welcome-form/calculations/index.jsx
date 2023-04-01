import { doc, getDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../../firebase-config/firestore";

const Calculations = () => {
  const [recommendations, setRecommendations] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await getDoc(doc(firestore, "users", auth.currentUser.uid));
    setRecommendations(data.data().recommendations);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>{recommendations?.carbs}</p>
      <p>{recommendations?.fats}</p>
      <p>{recommendations?.factorOfMassOrReduction}</p>
      <p>{recommendations?.kcal}</p>
      <p>{recommendations?.proteins}</p>
      <button onClick={() => navigate("/home/meal")}>Finish</button>
    </div>
  );
};

export default Calculations;
