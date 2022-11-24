import * as React from 'react'

function formatTime(time) {
  const date = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export default function ControlPanel(props) {
  const {
    startTime,
    endTime,
    onChangeTime,
    allDays,
    runs,
    onChangeAllDays,
    selectedTime,
    onChangeRuns,
  } = props
  const day = 24 * 60 * 60 * 1000
  const days = Math.round((endTime - startTime) / day)
  const selectedDay = Math.round((selectedTime - startTime) / day)

  const onSelectDay = (evt) => {
    const daysToAdd = evt.target.value
    // add selected days to start time to calculate new time
    const newTime = startTime + daysToAdd * day
    onChangeTime(newTime)
  }

  return (
    <div className="control-panel">
      <h3>Heatmap</h3>
      <p>
        Map showing activities from <b>{formatTime(startTime)}</b> to{' '}
        <b>{formatTime(endTime)}</b>.
      </p>
      <hr />
      <div className="input">
        <div>
          <label>All Days</label>
          <input
            type="checkbox"
            name="allday"
            checked={allDays}
            onChange={(evt) => onChangeAllDays(evt.target.checked)}
          />
        </div>
        <div>
          <label>Runs</label>
          <input
            type="checkbox"
            name="runs"
            checked={runs}
            onChange={(evt) => onChangeRuns(evt.target.checked)}
          />
        </div>
        <div>
          <label>Rides</label>
          <input
            type="checkbox"
            name="rides"
            checked={true}
            onChange={(evt) => ''}
          />
        </div>
        <div>
          <label>Hikes</label>
          <input
            type="checkbox"
            name="hikes"
            checked={true}
            onChange={(evt) => ''}
          />
        </div>
        <div>
          <label>Walks</label>
          <input
            type="checkbox"
            name="walks"
            checked={true}
            onChange={(evt) => ''}
          />
        </div>
      </div>
      <div className={`input ${allDays ? 'disabled' : ''}`}>
        <label>Each Day: {formatTime(selectedTime)}</label>
        <input
          type="range"
          disabled={allDays}
          min={1}
          max={days}
          value={selectedDay}
          step={1}
          onChange={onSelectDay}
        />
      </div>
    </div>
  )
}
