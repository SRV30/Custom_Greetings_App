import GreetingCard from "./components/GreetingCard";
import { templates } from "./data/templates";

function App() {

  const userName = "Sahil";

  const profileImage =
    "https://i.pravatar.cc/300";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <GreetingCard
        template={templates[0]}
        userName={userName}
        profileImage={profileImage}
      />

    </div>
  );
}

export default App;