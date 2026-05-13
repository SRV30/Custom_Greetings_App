import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";

import GreetingCard from "./components/GreetingCard";

import AuthPage from "./pages/AuthPage";

import { templates } from "./data/templates";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("Happy Anniversary");

  const [quote, setQuote] = useState("Wishing you happiness, love and success");

  const [profileImage, setProfileImage] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const cardRef = useRef();

  const categories = ["All", "Birthday", "Anniversary", "Festival"];

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);

      setUserName(user.name);

      setProfileImage(`${import.meta.env.VITE_API_URL}${user.profileImage}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };

  const handleTemplateSelect = (template) => {
    if (template.premium) {
      setShowPremiumModal(true);
    } else {
      setSelectedTemplate(template);
    }
  };

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  const downloadCard = async () => {
    const canvas = await html2canvas(cardRef.current);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;

    link.download = "greeting-card.png";

    link.click();
  };

  if (!isLoggedIn) {
    return <AuthPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div
      className="min-h-screen px-4 py-6 md:p-10"
      style={{
        backgroundColor: "#e5e7eb",
      }}
    >
      <div className="max-w-400 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Greetings App</h1>

            <p className="text-gray-600 mt-1">
              Create personalized greeting cards
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-14 items-start justify-center">
          <div className="w-full max-w-130 lg:sticky lg:top-10">
            <div className="bg-white rounded-4xl shadow-2xl p-5 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Customize Card
              </h2>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-lg md:text-2xl">
                  Your Name
                </label>

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-lg md:text-2xl">
                  Greeting Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-lg md:text-2xl">
                  Bottom Quote
                </label>

                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                        px-5
                        py-2
                        rounded-full
                        font-medium
                        transition

                        ${
                          selectedCategory === category
                            ? "bg-black text-white"
                            : "bg-gray-200 text-black"
                        }
                      `}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {filteredTemplates.map((template) => (
                  <img
                    key={template.id}
                    src={template.image}
                    alt=""
                    onClick={() => handleTemplateSelect(template)}
                    className={`
                        aspect-4/5
                        w-full
                        object-cover
                        rounded-2xl
                        cursor-pointer
                        border-4
                        transition

                        ${
                          selectedTemplate.id === template.id
                            ? "border-black scale-105"
                            : "border-transparent"
                        }
                      `}
                  />
                ))}
              </div>

              <button
                onClick={downloadCard}
                className="
                  w-full
                  mt-8
                  bg-black
                  text-white
                  py-4
                  rounded-2xl
                  text-lg
                  font-semibold
                  transition
                  hover:bg-gray-800
                "
              >
                Download Card
              </button>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Live Preview
            </h2>

            <div
              className="
                bg-white
                rounded-[40px]
                shadow-2xl
                p-3
                md:p-6
                overflow-hidden
              "
            >
              <div ref={cardRef}>
                <GreetingCard
                  template={selectedTemplate}
                  userName={userName}
                  profileImage={profileImage}
                  message={message}
                  quote={quote}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPremiumModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="bg-white w-full max-w-100 rounded-3xl p-8 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-3">Premium Template</h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              This template is available for premium users only.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-300 font-medium"
              >
                Cancel
              </button>

              <button className="flex-1 py-3 rounded-2xl bg-black text-white font-medium">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
