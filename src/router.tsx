import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'
import MainScreen from './Components/MainScreen/MainScreen'
import SavingsCalc from './Components/SavingsCalc/SavingsCalc'
import AgeCalc from './Components/AgeCalc/AgeCalc'
import ContributionCalc from './Components/ContributionCalc/ContributionCalc'
import SavedScenarios from './Components/SavedScenarios/SavedScenarios'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<MainScreen />}></Route>
                    <Route path='/savingscalc' element={<SavingsCalc />}></Route>
                    <Route path='/agecalc' element={<AgeCalc />}></Route>
                    <Route path='/contributioncalc' element={<ContributionCalc />}></Route>
                    <Route path='/savedscenarios' element={<SavedScenarios />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router