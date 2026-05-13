import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import GreetingCard from "./components/GreetingCard";
import { templates } from "./data/templates";

function App() {
  const [userName, setUserName] = useState("Sahil");

  const [message, setMessage] = useState("Happy Anniversary");

  const [quote, setQuote] = useState("Wishing you happiness, love and success");

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const cardRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleTemplateSelect = (template) => {
    if (template.premium) {
      setShowPremiumModal(true);
    } else {
      setSelectedTemplate(template);
    }
  };

  const downloadCard = async () => {
    const canvas = await html2canvas(cardRef.current);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;

    link.download = "greeting-card.png";

    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start">
        <div className="w-full max-w-150 bg-white p-5 md:p-10 rounded-3xl shadow-xl">
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

          <div className="grid grid-cols-3 gap-4 mt-6">
            {templates.map((template) => (
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

          <div className="mt-6">
            <label className="block mb-2 font-medium text-lg md:text-2xl">
              Upload Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
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

        <div className="w-full flex justify-center">
          <div
            ref={cardRef}
            className="
              scale-[0.75]
              sm:scale-[0.85]
              md:scale-100
              origin-top
            "
          >
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

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
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
