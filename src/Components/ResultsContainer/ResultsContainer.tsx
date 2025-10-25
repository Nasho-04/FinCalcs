import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsContainer = ({ data }: { data: { pessimistic: number, expected: number, optimistic: number, totalContribution: number, year: number }[] }) => {

    return (
        <>
                { data[1] && <ResponsiveContainer width="100%" height={400}>
                    <LineChart  data={data} margin={{ top: 0, right: 20, left: 20, bottom: 0 }} responsive={true} >

                        {/* Configure Axes */}
                        <XAxis dataKey="year" stroke="#D4D4D4" />
                        <YAxis stroke="#D4D4D4" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1A4314', border: '2px solid #FFFFFF' }} />
                        <Legend />

                        {/* Total Contribution (e.g., Gray/Black) */}
                        <Line type="monotone" dataKey="totalContribution" name="Total Contributed" stroke="#888888" strokeWidth={2} dot={false} />
                        
                        {/* Pessimistic Scenario (Red) */}
                        <Line type="monotone" dataKey="pessimistic" name="Pessimistic" stroke="#C93D3E" strokeWidth={3} dot={false} />

                        {/* Expected Scenario (Blue) */}
                        <Line type="monotone" dataKey="expected" name="Expected Growth" stroke="#64C9FF" strokeWidth={3} dot={false} />

                        {/* Optimistic Scenario (Gold) */}
                        <Line type="monotone" dataKey="optimistic" name="Optimistic" stroke="#FFD700" strokeWidth={3} dot={false} />

                    </LineChart>
                </ResponsiveContainer> }
        </>
    )
}

export default ResultsContainer