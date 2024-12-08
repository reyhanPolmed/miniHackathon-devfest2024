// import axios from "axios"
import image from "./image-ilustrasi.png";
import logo from "./logo1.jpg"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const App = () => {
  const [jenisMakanan, setJenisMakanan] = useState(""); // State untuk menyimpan input user
  const [asalDaerah, setAsalDaerah] = useState(""); // State untuk menyimpan input user
  const [text, setText] = useState([]); // State untuk hasil dari model
  const [loading, setLoading] = useState(false); // State untuk indikator loading

  const handleGenerate = async () => {
    setLoading(true); // Set loading menjadi true
    try {
      // eslint-disable-next-line no-undef
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `berikan makanan ${jenisMakanan} dari ${asalDaerah}, terakan nama dan deskripsi, buat response json pada array dengan nama makanan.`
      const result = await model.generateContent(prompt); // Gunakan prompt dari input user
      const response = await result.response;
      const generatedText = response.text();
      const cleanText = generatedText.replace(/```json|```/g, "").trim();
      const jsonResponse = JSON.parse(cleanText);
      console.log(jsonResponse);
      setText(jsonResponse.makanan);
    } catch (error) {
      console.error("Error generating content:", error);
      setText("Failed to generate content.");
    } finally {
      setLoading(false);
      console.log(text); // Set loading menjadi false setelah selesai
    }
  };
  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial" }}
      className="min-h-screen"
    >
      {/* judul */}
      <div className="flex justify-center gap-5">
      <img src={logo} alt="" className="w-[80px]"/>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold">REKOMENDASI MAKANAN LOKAL</h1>
        <span className="text-slate-800 text-sm">
          temukan makanan lokal disetiap daerah, dan rasakan kenikmatannya
        </span>
      </div>
      </div>

      <div className="flex flex-wrap box-border gap-y-10 justify-center items-center gap-x-6 mt-20">
        {/* input user */}
        <div className=" w-1/3 h-[400px] flex flex-col items-center text-slate-700 px-10 py-16 gap-5 rounded-lg">
          <h3 className="flex justify-center text-sm mb-2 font-bold" >
            Masukan Pencarian
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-semibold">Jenis Makanan : </span>
            <input
              type="text"
              className="outline outline-0 border-[#a6e4ff] border-b-2 mb-5 w-[400px] rounded-sm p-1 pl-8"
              value={jenisMakanan}
              onChange={(e) => setJenisMakanan  (e.target.value)}
              placeholder="cth: tradisional"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-bold">Nama Daerah : </span>
            <input
              type="text"
              className="outline outline-0 border-[#a6e4ff] border-b-2 mb-5 w-[400px] rounded-sm p-1 pl-8"
              value={asalDaerah}
              onChange={(e) => setAsalDaerah(e.target.value)}
              placeholder="cth: sumatera utara"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              className="py-2 bg-[#a6e4ff] w-[150px] text-white font-semibold rounded-lg text-sm cursor-pointer"
              onClick={handleGenerate}
              disabled={loading || !prompt}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {console.log("text : ", text)}
        {text.length > 0 ? (text.map((item, index) => (
            <div
              key={index}
              className="border shadow-md shadow-[#a6e4ff] border-[#a6e4ff] flex flex-col justify-between box-border rounded-xl overflow-hidden w-1/5 bg-white h-[400px]"
            >
              <img src={image} alt="image" className="w-full " />
              <div className="flex flex-col gap-4 px-2 overflow-hidden mb-4">
                <p className="font-bold">{item.Nama || item.nama}</p>
                <p className="text-sm ">{item.Deskripsi || item.deskripsi}</p>
              </div>

              <div className="flex justify-end">
              <button className="text-sm flex justify-center py-1 rounded-xl mb-3 mr-6 text-black bg-[#a6e4ff] w-[150px]">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=makanan+${jenisMakanan}+${asalDaerah}`}
                >
                  Lihat di Gmaps
                </a>
              </button>
              </div>
            </div>
          ))) : (
              <img src={logo} alt="logo" className="w-1/3" />
          )}
      </div>
    </div>
  );
};

export default App;

// berikan makanan dari sumut, terakan nama dan deskripsi, buat response json pada array dengan nama makanan.
