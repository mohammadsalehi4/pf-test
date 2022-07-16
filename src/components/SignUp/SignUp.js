import axios from 'axios'
import React from 'react'
const Address="https://pasbacktest.iran.liara.run"


const SignUp = () => {
  const sendData=()=>{
    axios.post(Address+'/signup',{
      username:document.getElementById('getusername').value,
      password:document.getElementById('getpassword').value
    })
    .then(resp=>{
      if(resp.data.success){
        alert(resp.data.code)
      }
    })
  }

  return (
    <div id='mainDiv1'>
        <div className='showBox' id='not_login'>
                <p id='title'>signup</p>
                <input type='text' className='inputbox1' id='getusername' placeholder='username...'/>
                <input type='password' className='inputbox1' id='getpassword' placeholder='password...'/>
                <button className='inputBox2' onClick={sendData}>signup</button>
        </div>
    </div>
  )
}

export default SignUp