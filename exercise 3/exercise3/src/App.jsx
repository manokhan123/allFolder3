import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogStats from "./components/BlogStats";

function App() {
  return (
    <div>
      <Header />

      <main className="container">
        <BlogStats />

        <BlogList />
      </main>
    </div>
  );
}

export default App;
