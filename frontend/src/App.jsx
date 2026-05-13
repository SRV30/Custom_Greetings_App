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
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="max-w-7xl mx-auto flex gap-10 items-start">
        <div className="w-[350px] bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Customize Card</h2>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Your Name</label>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Greeting Message</label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Bottom Quote</label>

            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
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

        <GreetingCard
          template={selectedTemplate}
          userName={userName}
          profileImage={profileImage}
          message={message}
          quote={quote}
        />
      </div>
    </div>
  );
}

export default App;
