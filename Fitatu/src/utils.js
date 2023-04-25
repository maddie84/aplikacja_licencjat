export const getTodayDate = (daysBeforeToday = 0) => {
  const today = new Date();
  const dd = String(today.getDate() - daysBeforeToday).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return dd + "-" + mm + "-" + yyyy;
};

export const getTranslations = (cases) => {
  switch (cases) {
    case "Twój Profil":
      return "twojProfil";
    case "Kalkulator":
      return "kalkulator";
    case "Historia":
      return "historia";
    case "proteins":
      return "Białko";
    case "kcal":
      return "Kcal";
    case "fats":
      return "Tłuszcze";
    case "carbs":
      return "Węglowodany";
    case "breakfast":
      return "Śniadanie";
    case "secondBreakfast":
      return "Drugie śniadanie ";
    case "dinner":
      return "Obiad";
    case "beforeSupper":
      return "Podwieczorek";
    case "supper":
      return "Kolacja";
    case "register":
      return "Rejestracja";
    case "login":
      return "Logowanie";
    case "password":
      return "Hasło";
    case "confirm password":
      return "Potwierdź hasło";
    case "submit":
      return "Zatwierdź";
    case "name":
      return "Nazwa";
    case "grammage":
      return "Gramatura";
    case "product name":
      return "Wyszukaj produkt";
    case "recommendations":
      return "Rekomendacje";
    case "factor":
      return "Współczynnik masy lub redukcji";
  }
};
