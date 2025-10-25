import { Link } from 'react-router-dom'
import './MainScreen.css'
import "../../index.css"

const MainScreen = () => {

    return (
        <section id='main-section'>
            <article className='card'>
                <Link className='card-title' to={'/savingscalc'}>
                    <h2>Savings Calculator</h2>
                </Link>
                <div className='divider'></div>
                <p className='card-p'><span className='bold-text'>Visualize your future money.</span> See your total balance year-by-year across three market scenarios using monthly compounding.</p>
            </article>
            <article className='card'>
                <Link className='card-title' to={'/agecalc'}>
                    <h2>Period Calculator</h2>
                </Link>
                <div className='divider'></div>
                <p className='card-p'><span className='bold-text'>Find your timeline.</span> Determine the exact number of years it will take to reach your goal based on your current contributions and expected returns.</p>
            </article>
            <article className='card'>
                <Link className='card-title' to={'/contributioncalc'}>
                    <h2>Contribution Calculator</h2>
                </Link>
                <div className='divider'></div>
                <p className='card-p'><span className='bold-text'>Hit your target.</span> Instantly calculate the required monthly contribution to reach your savings goal at the expected rate.</p>
            </article>
        </section>
    )
}

export default MainScreen