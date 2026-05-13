import { useState } from "react";
import GreetingCard from "./components/GreetingCard";
import { templates } from "./data/templates";

function App() {
  const [userName, setUserName] = useState("Sahil");

  const [message, setMessage] = useState("Happy Anniversary");

  const [quote, setQuote] = useState("Wishing you happiness, love and success");

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300");

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
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
                onClick={() => setSelectedTemplate(template)}
                className={`
                  aspect-4/5
                  w-full
                  object-fit
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
        </div>

        <div className="w-full flex justify-center overflow-x-auto">
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
  );
}

export default App;
