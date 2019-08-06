import React, { Component } from 'react'

class UsefulLinks extends Component {
    render() {
        return (
            <div className="container">
                <h3>Useful Links:</h3>
                <h5>General</h5>
                <p>Webmail: <a href="https://mail.iitp.ac.in">mail.iitp.ac.in</a></p>
                <p>Intranet: <a href="https://172.16.1.6">172.16.1.6</a></p>
                <p>Registration and Result: <a href="https://172.16.1.230">172.16.1.230</a></p>
                <br/>
                <h5>Library</h5>
                <p>Library Catalogue: <a href="https://172.16.52.134:8380">172.16.52.134:8380</a></p>
                <p>Library eResources: <a href="https://library.iitp.ac.in">library.iitp.ac.in</a></p>
                <p>Previous year question papers: <a href="https://172.16.52.180">172.16.52.180</a></p>
                <p>Late fee payment: <a href="https://onlinesbi.com">onlinesbi.com</a></p>
                <br/>
                <h5>Miscellaneous</h5>
                <p>Institutional Repo: <a href="https://idr.iitp.ac.in">idr.iitp.ac.in</a></p>
                <p>International Relations Website: <a href="https://172.16.1.4">172.16.1.4</a></p>
            </div>
        )
    }
}

export default UsefulLinks;