export default function Log({turnData}) {
    return <ol id="log">
        {turnData.map((turn, index) => (
            <li key={index} className={ index == 0 ? "highlighted" : "" }>
                {turn.player} selected the square at ({turn.square.row}, {turn.square.col})
            </li>
        ))}
    </ol>
}