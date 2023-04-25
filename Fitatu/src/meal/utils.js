import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase-config/firestore";
import { getTodayDate } from "../utils";

export const updateMeal = async (
  product,
  grammage = 1,
  chosenMeal,
  setEaten,
  setMeals
) => {
  const currentUserDoc = doc(firestore, "users", localStorage.getItem("uid"));
  const dataBaseResponse = (await getDoc(currentUserDoc))?.data()?.[
    getTodayDate()
  ];

  await updateDoc(currentUserDoc, {
    [getTodayDate()]: {
      ...dataBaseResponse,
      [chosenMeal]: {
        products: getProductDetails(
          dataBaseResponse,
          chosenMeal,
          product,
          grammage
        ),
      },
      eaten: getEatenMealsDetails(dataBaseResponse?.eaten, product, grammage),
    },
  }).then(() => {
    setMeals((value) => ({
      ...value,
      [chosenMeal]: {
        products: getProductDetails(
          dataBaseResponse,
          chosenMeal,
          product,
          grammage
        ),
      },
    }));
    setEaten(getEatenMealsDetails(dataBaseResponse?.eaten, product, grammage));
  });
};
const getProductSpecification = (product, grammage) => {
  return {
    name: product?.name,
    kcal: Math.round(product.kcal * grammage),
    proteins: Math.round(product.proteins * grammage),
    fats: Math.round(product.fats * grammage),
    carbs: Math.round(product.carbs * grammage),
  };
};

const getEatenMealsDetails = (eatenObject, product, grammage) => {
  const { kcal, proteins, fats, carbs } = getProductSpecification(
    product,
    grammage
  );
  return {
    kcal: eatenObject ? eatenObject.kcal + kcal : kcal,
    proteins: eatenObject ? eatenObject.proteins + proteins : proteins,
    fats: eatenObject ? eatenObject.fats + fats : fats,
    carbs: eatenObject ? eatenObject.carbs + carbs : carbs,
  };
};

const getProductDetails = (dataBaseResponse, chosenMeal, product, grammage) => {
  const id = generateRandomId(Math.floor(Math.random() * 6) + 5);
  console.log(product);

  const { name, kcal, proteins, fats, carbs } = getProductSpecification(
    product,
    grammage
  );

  return dataBaseResponse?.[chosenMeal]
    ? [
        ...dataBaseResponse?.[chosenMeal].products,
        {
          id,
          name,
          kcal,
          proteins,
          fats,
          carbs,
          grammage: grammage * 100,
        },
      ]
    : [
        {
          id,
          name,
          kcal,
          proteins,
          fats,
          carbs,
          grammage: grammage * 100,
        },
      ];
};

const generateRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
export const filterElements = (products, inputText, setProducts) => {
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase()?.includes(inputText.toLowerCase())
  );
  setProducts(filteredProducts);
};

export const deleteProduct = async (
  eatenProducts,
  chosenMeal,
  foodToDelete,
  setEaten,
  setMeals
) => {
  const currentUserDoc = doc(firestore, "users", localStorage.getItem("uid"));

  const resp = (await getDoc(currentUserDoc))?.data()?.[getTodayDate()];

  const filteredProducts = eatenProducts?.filter(
    (product) => product.id !== foodToDelete.id
  );
  const eatenObject = resp?.eaten;

  const alreadyEaten = {
    kcal: eatenObject.kcal - foodToDelete.kcal,
    proteins: eatenObject.proteins - foodToDelete.proteins,
    fats: eatenObject.fats - foodToDelete.fats,
    carbs: eatenObject.carbs - foodToDelete.carbs,
  };
  await updateDoc(currentUserDoc, {
    [getTodayDate()]: {
      ...resp,
      [chosenMeal]: {
        products: filteredProducts,
      },
      eaten: alreadyEaten,
    },
  }).then(() => {
    setMeals((value) => ({
      ...value,
      [chosenMeal]: {
        products: filteredProducts,
      },
    }));
    setEaten(alreadyEaten);
  });
};
