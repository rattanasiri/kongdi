import React from "react";

//ทำ value = enum แล้วค่อย แก้
// ค่อยกลับมาทำต่อตอน search
function ProvinceListSearch() {
  return (
    <div>
      <select class="select">
        <option disabled selected>
          Pick a Province
        </option>
        <option>Bangkok</option>
        <option>Thai</option>
        <option>Velvet</option>
      </select>
    </div>
  );
}

export default ProvinceListSearch;
