import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';


class Deck extends Component {
constructor(props){
    super(props);
    this.state = {
    deck: null,
    drawn: []
}
    this.handleClick = this.handleClick.bind(this);

}

async componentDidMount(){
const url = `https://deckofcardsapi.com/api/deck/new/shuffle`;
let response = await axios.get(url);
let data = response.data;
this.setState({
    newUrl: `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/`
})

}

async handleClick(){
    try {
        let response = await axios.get(this.state.newUrl);
        let newData = response.data;
        if (!newData.success) {
            throw new Error('No cards left');
        }
        let cardInfo = newData.cards[0];
        this.setState(st => ({
            drawn: [
                ...st.drawn,
                {
                    id: cardInfo.code,
                    imageUrl: cardInfo.image,
                    name: `${cardInfo.value} of ${cardInfo.suit}`
                }
            ]
            
        }));
} catch (err) {
    alert(err);
}
}

render() {
    const cards = this.state.drawn.map(c => (
        <Card key={c.id} src={c.imageUrl} name={c.name} />
    ));
    return(
        <div className="Deck">
            <h1 className="Deck-title">♦ Card Dealer ♦</h1>
            <h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
        <button className="Deck-btn" onClick={this.handleClick}>
            Get Card!
        </button>
       <div className="Deck-cardarea">{cards}</div>
        </div>
    )
}

}


export default Deck;