import React from "react";

import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                JE SUIS SUR LA PAGE HOME
                <Button color="danger">Danger!</Button>
            </div>
        );
    }
}