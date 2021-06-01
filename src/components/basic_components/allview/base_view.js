import React from 'react'

import Footer from '../Footer';
import Header from '../Header';

// import addictional component

function BaseView(view_content) {
    const main_content = () => {
        return (
            view_content
        )
    }

    const full_page = () => {
        return (
            <div>
                <Header />
                {main_content()}
                <Footer />
            </div>
        )
    }

    return (
        full_page()
    )
}

export default BaseView
