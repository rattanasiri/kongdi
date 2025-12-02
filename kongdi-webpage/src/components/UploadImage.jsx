function UploadImage({ file, setFile }) {
  // console.log("file UploadImage", file);
  const hdlFileChange = (e) => {
    setFile(e.target.files);
  };

  const removePic = (e) => {
    e.stopPropagation();
    document.getElementById("input-file").value = "";
    setFile(null);
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <label
        htmlFor="input-file"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Post Image
      </label>
      <div
        className="min-h-48 relative border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer overflow-hidden"
        onClick={() => document.getElementById("input-file").click()}
      >
        <input
          type="file"
          id="input-file"
          className="hidden"
          onChange={hdlFileChange}
          accept="image/*"
        />
        {file ? (
          <div className="relative w-full h-full">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />

            <button
              type="button"
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
              onClick={removePic}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 p-4">
            <p className="text-sm">Click to upload image</p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
