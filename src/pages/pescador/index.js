import React, { useEffect, useState } from 'react';
import './styles.scss';

export default function Pescador(props) {
    const [page, setPage] = useState(1);
    useEffect(()=>{
        let p = props.match.params.page;
       if(p){
           setPage(p);
       }
       console.log(p);
    }, []);
  return (
    <div className="container-fluid">
        <h2>Pescador</h2>

        <div className="row">

        </div>
        <div className="card animate">
            <div className="card-head">

            </div>
            <table className="striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                </tr>
                <tr>
                    <td>Alan</td>
                    <td>Jellybean</td>
                    <td>$3.76</td>
                </tr>
                <tr>
                    <td>Jonathan</td>
                    <td>Lollipop</td>
                    <td>$7.00</td>
                </tr>
                </tbody>
            </table>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
  );
}
