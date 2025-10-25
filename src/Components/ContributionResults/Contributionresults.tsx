import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../index.css'

const ContributionResults = ({ data }: { data: { expectedContribution: number, path: { year: number, balance: number, totalContribution: number }[]} }) => {

    return (
        <>
                
                { data.path[1] && 
                <>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data.path} margin={{ top: 5, right: 100, left: 90, bottom: 5 }}>

                        {/* Configure Axes */}
                        <XAxis dataKey="year" stroke="#D4D4D4" />
                        <YAxis stroke="#D4D4D4" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1A4314', border: '2px solid #FFFFFF' }} />
                        <Legend />

                        {/* Total Contribution (e.g., Gray/Black) */}
                        <Line type="monotone" dataKey="totalContribution" name="Total Contributed" stroke="#888888" strokeWidth={2} dot={false} />

                        {/* Expected Scenario (Blue) */}
                        <Line type="monotone" dataKey="balance" name="Expected Growth" stroke="#64C9FF" strokeWidth={3} dot={false} />

                    </LineChart>
                </ResponsiveContainer>
                </> 
                }
        </>
    )
}

export default ContributionResults