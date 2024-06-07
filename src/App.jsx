
import Navbar from "./components/Navbar/Navbar"; 
import Photo  from "./components/Photo/Photo"
import './App.css'
import Cover from "./components/Cover/Cover";

function App() {
  return (
<>
    <div className="App">
     <Cover/>
    </div>
    
   
      <Navbar />
    
     <Photo />

    </>
  );
}

export default App;
