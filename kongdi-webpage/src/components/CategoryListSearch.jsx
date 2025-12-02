import React from "react";

// ค่อยกลับมาทำต่อตอน search
function CategoryListSearch() {
  return (
    <div>
      <div>
        <select className="select">
          <option disabled selected>
            Pick a Category
          </option>
          <option>Jp</option>
          <option>krr</option>
          <option>th</option>
        </select>
      </div>
    </div>
  );
}

export default CategoryListSearch;
