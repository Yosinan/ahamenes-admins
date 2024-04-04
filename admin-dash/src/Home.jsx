import React from 'react'


const Home = () => {
    return (
        <div className="container">
            <h2 className="mt-5">Ahamenes Club Website - Admin Dashboard</h2>
            <p>Click on the links below to add a new member or view the team.</p>

            <ul className="list-group">
                <li className="list-group-item"><a href="/add">Add a new member</a></li>
                <li className="list-group-item"><a href="/teams">View the team</a></li>
            </ul>
        </div>
    )
}

export default Home