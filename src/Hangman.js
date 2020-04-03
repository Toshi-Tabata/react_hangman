import React from "react";
import "./Hangman.css"
import gameStart from "./img/0.png"
import h1 from "./img/1.png"
import h2 from "./img/2.png"
import h3 from "./img/3.png"
import h4 from "./img/4.png"
import h5 from "./img/5.png"
import h6 from "./img/6.png"
import h7 from "./img/7.png"
import h8 from "./img/8.png"
import h9 from "./img/9.png"
import gameOver from "./img/11.png"


export default class Hangman extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: [" "],  // maybe this should be a set to prevent repeats?
            hangmanWord: "hello world",
            value: "",
            didFinish: false,
            didWin: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static defaultProps = {
        maxGuesses: 10,
        hangmanState: [gameStart, h1, h2, h3, h4, h5, h6, h7, h8, h9, gameOver]
    };


    handleChange = (event) => {
        if (this.state.didFinish) return;
        this.setState({value: event.target.value});
    };

    hasLetter(letter) {
        if (this.state.didFinish) return;
        return this.state.guessed.includes(letter);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.didFinish) return;

        let guessedLetter = this.state.value[0];
        if (this.hasLetter(guessedLetter)) {
            alert("You have already guessed this");  // TODO: better handler - send message in chat
            this.setState({value: ""});
            return;
        }
        this.setState({
                guessed: this.state.guessed.concat(guessedLetter),
                mistake: this.state.hangmanWord.includes(guessedLetter) ? this.state.mistake : this.state.mistake + 1,
                value: "",
            }
        );
    };

    wordState() {
        if (this.state.didFinish) return;
        let letters = this.state.hangmanWord.split("");
        letters = letters.map(letter => this.hasLetter(letter) ? letter : " _ ");
        return letters.join("")
    }


    resetGame = () => {
        this.setState({
                mistake: 0,
                guessed: [" "],  // maybe this should be a set to prevent repeats?
                hangmanWord: "hello world",
                value: "",
                didFinish: false,
            }
        );
    };

    render() {

        if (this.state.hangmanWord === this.wordState() && !this.state.didWin) {
            this.setState({didWin: true});
            this.setState({didFinish: true});
        }
        if (this.state.mistake >= this.props.maxGuesses && !this.state.didFinish) {
            this.setState({didFinish: true})
        }
        let isWinner = "";
        if (this.state.didWin) {
            isWinner = "You Win!";
        }

        return (
            <div>

                <div>Guesses: {this.state.mistake}/{this.props.maxGuesses}</div>
                <div>{isWinner}</div>
                <img src={this.props.hangmanState[this.state.mistake]}/>
                <div>Letters Guessed: {this.state.guessed}</div>

                <div> {this.wordState()} </div>


                {/*Handle input for this app*/}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Guess:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.state.didFinish ?
                    <button onClick={this.resetGame}>Play again?</button> :
                    null
                }

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                Answer:
                <div id={"solution"}>
                    hello world
                </div>

            </div>
        )
    }

}







