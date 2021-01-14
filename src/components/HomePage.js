import React from "react";
import Axios from 'axios';
class HomePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            infos: [],
            isLoaded: false,
            currentPage: 1,
            infoPerPage: 16
        };
    };

    //CONNEXION À L'API
    getInfos = () => {
        Axios.get("http://127.0.0.1:8000/books")
            //.then(response => console.log(response.data['hydra:member']))
            .then(response => this.setState({infos: response.data['hydra:member'], isLoaded: true}))
    };

    componentDidMount() {
        this.getInfos();
    };

    render() {
        const {infos} = this.state;

        return (
            <div>
                <h1>API</h1>
                <div className="container-card-film">
                    {infos.map(info => (
                        <div className="card-film zoom effect" key={info.id}>
                            <img src={info.image} alt={info.title} height="120px"/>
                            {info.title}
                            {info.description}
                            {info.language}
                            {info.nbrPages}
                            {info.dateOfPublication}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default HomePage;