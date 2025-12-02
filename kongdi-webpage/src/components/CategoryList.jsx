import React from "react";
// 💡 ไม่ต้อง import useForm เพราะจะรับ 'register' และ 'errors' เป็น prop

// 1. กำหนด CATEGORY ENUM (ในรูปแบบ Array)
const PRISMA_CATEGORIES_ENUM = [
  "CAFE_AND_BAKERY",
  "THAI_A_LA_CARTE",
  "STREET_FOOD_HAWKER",
  "BUFFET",
  "SHABU_SUKI_BBQ",
  "ISAN_FOOD",
  "SEAFOOD",
  "AUTHENTIC_THAI_CUISINE",
  "INTERNATIONAL_GENERAL",
  "JAPANESE",
  "KOREA",
  "VEGETARIAN_VEGAN",
  "DESSERT",
  "DRINKS",
  "FINE_DINING_LUXURY",
  "OTHER",
];

const formatForDisplay = (enumName) => {
  const withSpaces = enumName.replace(/_/g, " ").toLowerCase();

  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
};

function CategorySelect({ register, errors }) {
  const fieldName = "category";

  return (
    <div className="form-control w-full">
      <select
        className="select select-bordered w-full"
        {...register(fieldName)}
      >
        <option value="" disabled>
          pick a category
        </option>
        {PRISMA_CATEGORIES_ENUM.map((enumName) => (
          <option key={enumName} value={enumName}>
            {formatForDisplay(enumName)}
          </option>
        ))}
      </select>
      {errors.category && (
        <label className="label">
          <span className="label-text-alt text-red-500">
            {errors.category.message}
          </span>
        </label>
      )}
    </div>
  );
}

export default CategorySelect;
