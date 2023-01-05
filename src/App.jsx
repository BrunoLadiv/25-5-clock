class Timer extends React.Component{
  render(){
    return(
      <div>
        <div className="timer">
          <h3 id="timer-label">{this.props.timerLabel}</h3>
          <p id="time-left">{this.props.currentTime > 9 ? this.props.currentTime: "0" + this.props.currentTime}:{this.props.minute > 9 ? this.props.minute: "0" + this.props.minute}</p>
        </div>
        <div className="controll">
          <i class="far fa-pause-circle" id="start_stop" onClick={this.props.statStop}></i>
          <i class="fas fa-redo" id="reset" onClick={this.props.reset}></i>
        </div>
      </div>
    )
  }
}

const SessionLength = (props) =>{
  return(
    <div className="sessionLength">
          <h3 id="session-label">Session Length</h3>
      <div className="d-flex justify-content-center align-items-center">
        <i class="fas fa-arrow-down" id="session-decrement" onClick={props.updateCount}></i>
        <p className="countSession" id="session-length">{props.sessionCount}</p>
        <i class="fas fa-arrow-up" id="session-increment" onClick={props.updateCount}></i>
      </div>
    </div>
  )
}

const BreakLength = (props) =>{
  return(
    <div className="breakLength">
          <h3 id="break-label">Break Length</h3>
      <div className="d-flex justify-content-center align-items-center">
        <i class="fas fa-arrow-down" id="break-decrement" onClick={props.updateCount}></i>
        <p className="countBreak" id="break-length">{props.breakCount}</p>
        <i class="fas fa-arrow-up" id="break-increment" onClick={props.updateCount}></i>
      </div>
    </div>
  )
}

class BreakAndSessionLength extends React.Component{
  render(){
    return(
      <div className="breakAndSessionLength d-flex">
        <BreakLength breakCount={this.props.breakCount} updateCount={this.props.updateCount}/>
        <SessionLength sessionCount={this.props.sessionCount} updateCount={this.props.updateCount}/>
      </div>
    )
  }
}

class Container extends React.Component{
  constructor(props){
    super(props);
    this.state={
      breakCount: 5,
      sessionCount: 25,
      running: false,
      currentTime: 25,
      minute: 0,
      stop: true,
      intorval: '',
      timerLabel: 'Session'
    }
    this.updateCount = this.updateCount.bind(this);
    this.StatStop = this.StatStop.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  reset(){
    clearInterval(this.state.intorval);
    
    this.setState({
      sessionCount: 25,
      currentTime: 25,
      minute: 0,
      stop: true,
      breakCount: 5,
      timerLabel: 'Session',
      running: false
    })
    
    document.querySelector('.timer').style.color = "#264653";
    document.querySelector('.timer').style.border = "5px solid #264653";
    document.getElementById('beep').currentTime = 0;
    document.getElementById('beep').pause();
    clearTimeout(5);
  }
  
  StatStop(){
    const interval = (title) =>{
      this.state.intorval = setInterval(()=>{
        if(this.state.minute == 0){
          this.setState({
              minute: 59,
              currentTime: this.state.currentTime - 1,
              timerLabel: title
           });
          document.querySelector('.timer').style.color = "#2a850e";
          document.querySelector('.timer').style.border = "5px solid #2a850e";
        }else{
          this.setState({
              minute: this.state.minute - 1
           })
        }
      
        if(this.state.minute == 0 && this.state.currentTime == 0 ){
          document.querySelector('.timer').style.color = "#ba0c0c";
          document.querySelector('.timer').style.border = "5px solid #ba0c0c";
          clearInterval(this.state.intorval);
          document.getElementById('beep').play();
          let timeOut = setTimeout(()=>{
            this.setState({
            currentTime: this.state.timerLabel ===  'Session' ? this.state.breakCount : this.state.sessionCount,
            displaySession: this.state.timerLabel ===  'Session' ? false : true,
            timerLabel: this.state.timerLabel ===  'Session' ? 'Break' : 'Session'
          })
            interval(this.state.timerLabel);
            document.querySelector('.timer').style.color = "#2a850e";
            document.querySelector('.timer').style.border = "5px solid #2a850e";
          }, 1000)
        }
      }, 1000)
    }
    if(this.state.stop === true){
        this.setState({
        stop: false,
        running: true  
      })
      interval(this.state.timerLabel);
    }else{
      this.setState({
          stop: true
      })
      clearInterval(this.state.intorval);
      document.getElementById('beep').currentTime = 0;
      document.getElementById('beep').pause();
    }
    
  }
  
  updateCount(e){
    let id = e.target.id;
    if(!this.state.running){
      switch(id){
      case "break-decrement":
        this.state.breakCount === 1 ? this.setState({
          breakCount: 1
        }) : 
        this.setState({
          breakCount: this.state.breakCount - 1
        });
        break;
      case "break-increment":
        this.state.breakCount === 60 ? this.setState({
          breakCount: 60
        }) : 
        this.setState({
          breakCount: this.state.breakCount + 1
        });
        break;
       case "session-decrement":
        this.state.sessionCount === 1 ? this.setState({
          sessionCount: 1,
          currentTime: 1
        }) : 
        this.setState({
          sessionCount: this.state.sessionCount - 1,
          currentTime: this.state.sessionCount - 1
        });
        break;
      case "session-increment":
        this.state.sessionCount === 60 ? this.setState({
          sessionCount: 60,
          currentTime: 60
        }) : 
        this.setState({
          sessionCount: this.state.sessionCount + 1,
          currentTime: this.state.sessionCount + 1
        });
        break;
      default:
        this.setState({
          breakCount: 5,
          sessionCount: 25,
          currentTime: 25,
          breakTime: 25
        });
    }
    }
  }
  
  render(){
    return(
      <div>
        <h1> 25 + 5 Clock</h1>
        <BreakAndSessionLength breakCount={this.state.breakCount} sessionCount={this.state.sessionCount} updateCount={this.updateCount}/>
        <Timer currentTime={this.state.currentTime} statStop={this.StatStop} minute={this.state.minute} timerLabel={this.state.timerLabel} reset={this.reset}/>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    )
  }
}

export default Timer