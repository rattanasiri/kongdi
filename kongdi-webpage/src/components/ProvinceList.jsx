import React from "react";

const PRISMA_PROVINCES_ENUM = [
  "BANGKOK",
  "KRABI",
  "KANCHANABURI",
  "KALASIN",
  "KAMPHAENG_PHET",
  "KHON_KAEN",
  "CHANTHABURI",
  "CHACHOENGSAO",
  "CHAI_NAT",
  "CHAIYAPHUM",
  "CHUMPHON",
  "CHIANG_RAI",
  "CHIANG_MAI",
  "TRANG",
  "TRAT",
  "TAK",
  "NAKHON_NAYOK",
  "NAKHON_PHANOM",
  "NAKHON_RATCHASIMA",
  "NAKHON_SI_THAMMARAT",
  "NAKHON_SAWAN",
  "NONTHABURI",
  "NARATHIWAT",
  "NAN",
  "BUNG_KAN",
  "BURI_RAM",
  "PATHUM_THANI",
  "PRACHUAP_KHIRI_KHAN",
  "PRACHIN_BURI",
  "PHRA_NAKHON_SI_AYUTTHAYA",
  "PHAYAO",
  "PHANG_NGA",
  "PHATTHALUNG",
  "PHICHIT",
  "PHITSANULOK",
  "PHETCHABURI",
  "PHETCHABUN",
  "PHRAE",
  "PHUKET",
  "MAHA_SARAKHAM",
  "MUKDAHAN",
  "MAE_HONG_SON",
  "YASOTHON",
  "YALA",
  "ROI_ET",
  "RANONG",
  "RATCHABURI",
  "RAYONG",
  "LOPBURI",
  "LAMPANG",
  "LAMPHUN",
  "LEI",
  "SISAKET",
  "SONGKHLA",
  "SATUN",
  "SAMUT_PRAKAN",
  "SAMUT_SONGKHRAM",
  "SAMUT_SAKHON",
  "SA_KAEO",
  "SING_BURI",
  "SUKHOTHAI",
  "SUPHAN_BURI",
  "SURAT_THANI",
  "SURIN",
  "NONG_KHAI",
  "NONG_BUEA_LAMPHU",
  "ANG_THONG",
  "UDON_THANI",
  "UTHAI_THANI",
  "UTTARADIT",
  "UBON_RATCHATHANI",
  "AMNAT_CHAROEN",
];

const formatForDisplayMinimal = (enumName) => {
  return enumName.replace(/_/g, " ").toLowerCase();
};

function ProvinceSelect({ register, errors }) {
  return (
    <div className="form-control w-full">
      <select
        className="select select-bordered w-full"
        {...register("province")}
      >
        <option value="" disabled>
          pick a province
        </option>
        {PRISMA_PROVINCES_ENUM.map((enumName) => (
          <option key={enumName} value={enumName}>
            {formatForDisplayMinimal(enumName)}
          </option>
        ))}
      </select>

      {errors.province && (
        <label className="label">
          <span className="label-text-alt text-red-500">
            {errors.province.message}
          </span>
        </label>
      )}
    </div>
  );
}

export default ProvinceSelect;
