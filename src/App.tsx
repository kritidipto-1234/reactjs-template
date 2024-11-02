import './App.css'
import ShowcaseRangepicker from './features/ShowcaseRangePicker';

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <>
      <h2>Valid Configurations</h2>
      
      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: true,
          maxRange: 10,
          startEndSameAllowed: false
        }}
        initialStartDate={new Date(2024, 2, 1)}
        initialEndDate={new Date(2024, 2, 5)}
      />

      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: false,
          // maxRange: 10,
          startEndSameAllowed: true
        }}
        initialStartDate={new Date(2025, 2, 1)}
        initialEndDate={new Date(2025, 2, 5)}
      />

      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: true,
          maxRange: 410,
          startEndSameAllowed: false,
          maxDateInFuture: new Date(2025, 6, 1)
        }}
        initialStartDate={new Date(2024, 2, 1)}
        initialEndDate={new Date(2024, 2, 5)}
      />

      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: true,
          maxRange: 5,
          startEndSameAllowed: false
        }}
        initialStartDate={new Date(2024, 2, 1)}
        initialEndDate={new Date(2024, 2, 5)}
      />



      <h2>Invalid Configurations</h2>




      {/* Breaking pastDateAllowed rule */}
      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: false,
          maxRange: 7
        }}
        initialStartDate={new Date(2023, 0, 1)} // Past date
        initialEndDate={new Date(2023, 0, 5)}   // Past date
      />

      {/* Breaking startEndSameAllowed rule */}
      <ShowcaseRangepicker 
        config={{
          startEndSameAllowed: false,
          pastDateAllowed: true
        }}
        initialStartDate={new Date(2024, 2, 15)}
        initialEndDate={new Date(2024, 2, 15)}  // Same as start date
      />

      {/* Breaking maxDateInFuture rule */}
      <ShowcaseRangepicker 
        config={{
          maxDateInFuture: new Date(2023, 6, 1),
          pastDateAllowed: true
        }}
        initialStartDate={new Date(2024, 5, 1)}
        initialEndDate={new Date(2024, 8, 1)}   // Beyond maxDateInFuture
      />

      {/* Breaking multiple rules */}
      <ShowcaseRangepicker 
        config={{
          pastDateAllowed: false,
          maxRange: 3,
          startEndSameAllowed: false,
          maxDateInFuture: new Date(2024, 6, 1)
        }}
        initialStartDate={new Date(2023, 0, 1)}  // Past date
        initialEndDate={new Date(2024, 8, 1)}    // Beyond maxDateInFuture and maxRange
      />
    </>
  )
}

export default App;
