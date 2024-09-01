import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState<String>("");

  const captionRef = useRef<null | HTMLDivElement>(null);

  const scrollToCaptions = () => {
    if (captionRef.current !== null) {
      captionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Buat 3 caption media sosial yang menarik attention dan memiliki engagement tinggi, pakai hashtag, dan WAJIB DIBERI LABEL "1.", "2.", dan "3.". Hanya kembalikan 3 caption ini, tidak ada yang lain. Pastikan setiap caption 200-1000 karakter, memiliki call to action yang kuat, dan gunakan konteks ini juga: ${caption}${
    caption.slice(-1) === "." ? "" : "."
  }. Pastikan kamu membuat dalam bahasa indonesia yang menarik bagi anak muda`;

  const generateCaption = async (e: any) => {
    e.preventDefault();
    setGeneratedCaptions("");
    setLoading(true);
    try {
      if (caption === "") {
        toast.error("Silahkan masukkan deskripsi kontenmu.", {
          style: {
            background: "#ff5d5d",
            color: "#fff",
          },
          icon: "❌",
        });
        setLoading(false);
        return;
      }
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await res.json();
      setGeneratedCaptions(data.captions);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error("Gagal membuat caption", {
        style: {
          background: "#ff5d5d",
          color: "#fff",
        },
        icon: "❌",
      });
    } finally {
      scrollToCaptions();
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Caption AI Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-16">
        <h1 className="text-2xl sm:text-3xl mt-3 max-w-[708px] font-bold text-slate-900">
          Buat caption menarik <br />
          dengan copywriting yang memikat 🎯
        </h1>
        <div className="mt-7"></div>

        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">Deskripsi singkat konten </p>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"misal: Foto liburan di Bali"}
          />

          {!loading && (
            <button
              className="bg-green-600 rounded-lg text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-green-600 w-full"
              onClick={(e) => generateCaption(e)}
            >
              Buat captionmu &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-green-600 rounded-lg text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-green-600 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedCaptions && (
            <>
              <div>
                <h2
                  className="sm:text-3xl text-2xl font-bold text-slate-900 mx-auto"
                  ref={captionRef}
                >
                  Caption yang dihasilkan
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedCaptions
                  .substring(generatedCaptions.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedCaption) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedCaption);
                          toast("Caption berhasil disalin", {
                            style: {
                              background: "#78ffa0",
                              color: "#333",
                            },
                            icon: "📋",
                          });
                        }}
                        key={generatedCaption}
                      >
                        <p>{generatedCaption}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
