import React from "react";
import Main from "./Routes/Main";
import Footer from "./Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {

    render() {
        return (
            <div>
                <Main></Main>
                <Footer></Footer>
            </div>
        )
    }
}
export default App;
