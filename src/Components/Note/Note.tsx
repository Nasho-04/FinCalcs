import '../../index.css'
import './Note.css'


const Note = () => {
    return (
        <div className="note-container">
            <h2 className='note-titles'>Important Assumptions & Disclaimers</h2>
            <p className="note">The financial calculators provided here offer illustrative projections based on hypothetical scenarios and historical averages. <span className='bold-text'>They do not constitute financial advice.</span> Please review the assumptions below to understand how these figures were calculated.</p>
            <h3 className='note-titles'>Understanding the Graph Lines</h3>
            <p className="note">The interactive chart displays four distinct lines, all compounded monthly and plotted annually:</p>
            <ol>
                <li>
                    <h4 className='note-titles'>Total Contributed (Base Line):</h4>
                    <ul className="note">
                        <li>This is the principal amount you invested (Initial Investment + Monthly Contributions) without earning any interest.</li>
                        <li>It serves as the baseline to show how much of your final total is your own money versus how much is growth/interest.</li>
                    </ul>
                </li>
                <li>
                    <h4 className='note-titles'>Expected Growth (Primary Scenario):</h4>
                    <ul className="note">
                        <li>This projection uses the <span className="bold-text">Expected Annual Rate</span> you provided. It represents a reasonable, long-term estimate based on consistent market returns.</li>
                    </ul>
                </li>
                <li>
                    <h4 className='note-titles'>Optimistic Scenario:</h4>
                    <ul className="note">
                        <li>This projection is calculated using your Expected Annual Rate <span className="bold-text">plus 3%</span>.</li>
                        <li>It illustrates growth in a period of sustained strong market performance.</li>
                    </ul>
                </li>
                <li>
                    <h4 className='note-titles'>Pessimistic Scenario:</h4>
                    <ul className="note">
                        <li>This projection is calculated using your Expected Annual Rate <span className="bold-text">minus 3%</span>.</li>
                        <li>It illustrates growth if the market performs significantly below average, showing a stress-tested outlook.</li>
                    </ul>
                </li>
            </ol>
            <h3 className='note-titles'>Key Calculation Assumptions</h3>
            <ul className="note">
                <li><span className="bold-text">Compounding:</span> All interest is compounded <span className="bold-text">monthly</span> and contributions are added at the <span className="bold-text">start</span> of each month.</li>
                <li><span className="bold-text">Rate of Return:</span> The annual rates of return provided for the Pessimistic, Expected, and Optimistic scenarios are applied consistently every year. <span className="bold-text">Real-world market returns fluctuate significantly.</span></li>
                <li><span className="bold-text">Taxes and Inflation:</span> This calculator <span className="bold-text">does not</span> account for inflation, taxes (e.g., capital gains), or investment fees, which will reduce actual returns.</li>
            </ul>
            <p id='last-advice'>Consult a qualified financial professional before making investment decisions!</p>
        </div>
    )
}

export default Note