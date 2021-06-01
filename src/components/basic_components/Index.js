import React from 'react'
import { BrowserRouter} from 'react-router-dom';

// Basic components
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function Index() {
    return (
        <div>
            <BrowserRouter>
                {/* Basic Components of website */}
                    <Header/>
                    <Content/>
                    <Footer/>
                {/* Basic Components of website */}
            </BrowserRouter>
        </div>
    )
}

export default Index
